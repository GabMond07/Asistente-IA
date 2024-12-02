from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.http import JsonResponse
from .service import obtener_respuesta_chatgpt
User = get_user_model()

# Login
@api_view(['POST'])
def login(request):
  print(request.data)
  user = get_object_or_404(User, email=request.data['email'])
  if not user.check_password(request.data['password']):
    return Response({'message': 'wrong password'}, status=status.HTTP_400_BAD_REQUEST)
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer (instance=user)
  return Response({'token': token.key, 'user': serializer.data }, status=status.HTTP_200_OK)

# Register
@api_view(['POST'])
def register(request):
  username = request.data.get('username')
  email = request.data.get('email')
  
  if User.objects.filter(username=username).exists():
    return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
  
  if User.objects.filter(email=email).exists():
    return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
  
  serializer = UserSerializer(data=request.data)
  
  if serializer.is_valid():
    serializer.save()
    
    user = User.objects.get(username=username)
    user.set_password(request.data['password'])
    user.save()
    
    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
  
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logout
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
  request.user.auth_token.delete()
  return Response({'message': 'logged out'}, status=status.HTTP_200_OK)

#Guarda respuestas de la encuesta
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_survey_responses(request):
    user = request.user
    data = request.data

    # Guarda las respuestas en tu modelo
    survey_response, created = SurveyResponse.objects.update_or_create(
        user=user,
        defaults={'responses': data['responses']}  # Guardamos las respuestas como JSON
    )

    # Actualiza el estado de la encuesta
    user.survey_completed = True
    user.save()  

    if created:
        return Response({'message': 'Respuestas guardadas correctamente', 'survey_complete': True}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Respuestas actualizadas correctamente', 'survey_complete': True}, status=status.HTTP_200_OK)

#Consulta ChatGPT
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulta_chatgpt(request):
    usuario = request.user
    pregunta = request.data.get("pregunta")

    if not pregunta:
        return Response({"error": "Debe enviar una pregunta"}, status=400)

    # Verificar si ya existe una respuesta en ChatHistory para la misma pregunta del usuario
    respuesta_existente = ChatHistory.objects.filter(user=usuario, user_message=pregunta).first()

    if respuesta_existente:
        return Response({"respuesta": respuesta_existente.assistant_response}, status=200)

    # Si no está en la base de datos, consulta a la API
    try:
        respuesta_texto = obtener_respuesta_chatgpt(pregunta).replace("\\n", "\n")
        respuesta_texto = respuesta_texto.replace("**", "")

        # Guardar en ChatHistory para consultas futuras
        ChatHistory.objects.create(user=usuario, user_message=pregunta, assistant_response=respuesta_texto)
        
        return Response({"respuesta": respuesta_texto}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
#Guarda en caché los activos financieros del usuario para el rendimiento
from django.core.cache import cache

#Activos Financieros listado
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_assets(request):

    # Usar una clave única basada en el usuario
    cache_key = f"assets_user_{request.user.id}"
    cached_assets = cache.get(cache_key)

    if cached_assets:
        # Si los datos están en caché, devolverlos directamente
        return Response(cached_assets, status=status.HTTP_200_OK)

    assets = FinancialAsset.objects.filter(user=request.user)
    serializer = FinancialAssetSerializer(assets, many=True)
    serialized_data = serializer.data

    cache.set(cache_key, serialized_data, timeout=60*60)
    print(cache._cache.keys())
    return Response(serialized_data, status=status.HTTP_200_OK)

#crear activo
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_financial_asset(request):
    user = request.user
    data = request.data

    asset, created = FinancialAsset.objects.update_or_create(
        user=user,
        name=data.get('name'),
        defaults={
            'type': data.get('type'),
            'value': data.get('value'),
            'category': data.get('category', None)  # Opcional, por si no se incluye
        }
    )

    if created:
        return Response({'message': 'Activo guardado correctamente', 'asset_id': asset.id}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Activo actualizado correctamente', 'asset_id': asset.id}, status=status.HTTP_200_OK)

#Obtener activo por ID
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_asset(request, pk):
    try:
        asset = FinancialAsset.objects.get(pk=pk, user=request.user)
    except FinancialAsset.DoesNotExist:
        return Response({"error": "Asset not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FinancialAssetSerializer(asset)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Modificar activo
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_asset(request, pk):
    try:
        asset = FinancialAsset.objects.get(pk=pk, user=request.user)
    except FinancialAsset.DoesNotExist:
        return Response({"error": "Asset not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    serializer = FinancialAssetSerializer(asset, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Eliminar activo
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_asset(request, pk):
    try:
        asset = FinancialAsset.objects.get(pk=pk, user=request.user)
    except FinancialAsset.DoesNotExist:
        return Response({"error": "Asset not found"}, status=status.HTTP_404_NOT_FOUND)

    asset.delete()
    return Response({"message": "Asset deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

#------------------------------------------------------------------------------------------------------------
# Views para los pasivos
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_liabilities(request):
    """Listar todos los pasivos del usuario autenticado."""
    liabilities = FinancialLiability.objects.filter(user=request.user)
    serializer = FinancialLiabilitySerializer(liabilities, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_liability(request):
    user = request.user
    data = request.data

    # Guarda o actualiza el activo financiero en el modelo
    asset, created = FinancialLiability.objects.update_or_create(
        user=user,
        name=data.get('name'),
        defaults={
            'type': data.get('type'),
            'amount': data.get('amount'),
            'due_date': data.get('due_date', None)  # Opcional, por si no se incluye
        }
    )

    if created:
        return Response({'message': 'Pasivo guardado correctamente', 'asset_id': asset.id}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Pasivo actualizado correctamente', 'asset_id': asset.id}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_liability(request, pk):
    """Obtener los detalles de un pasivo específico por su ID."""
    try:
        liability = FinancialLiability.objects.get(pk=pk, user=request.user)
    except FinancialLiability.DoesNotExist:
        return Response({"error": "Liability not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FinancialLiabilitySerializer(liability)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_liability(request, pk):
    """Actualizar un pasivo financiero existente."""
    try:
        liability = FinancialLiability.objects.get(pk=pk, user=request.user)
    except FinancialLiability.DoesNotExist:
        return Response({"error": "Liability not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    serializer = FinancialLiabilitySerializer(liability, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_liability(request, pk):
    """Eliminar un pasivo financiero."""
    try:
        liability = FinancialLiability.objects.get(pk=pk, user=request.user)
    except FinancialLiability.DoesNotExist:
        return Response({"error": "Liability not found"}, status=status.HTTP_404_NOT_FOUND)

    liability.delete()
    return Response({"message": "Liability deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

#------------------------------------------------------------------------------
#views para actualizar el capital total
from django.db.models import Sum

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_current_balance(request):
    user = request.user  # Obtener el usuario autenticado
    
    # Sumar los valores de los activos y pasivos del usuario
    total_assets = FinancialAsset.objects.filter(user=user).aggregate(Sum('value'))['value__sum'] or 0
    total_liabilities = FinancialLiability.objects.filter(user=user).aggregate(Sum('amount'))['amount__sum'] or 0

    # Calcular el balance actual
    current_balance = total_assets - total_liabilities

    # Obtener o crear el registro de Finance
    finance, created = Finance.objects.get_or_create(user=user)

    # Asegurarse de asignar siempre un valor a current_balance
    finance.current_balance = current_balance
    finance.save()

    return Response({
        'message': 'Current balance updated successfully.',
        'current_balance': float(finance.current_balance),
        'total_assets': float(total_assets),
        'total_liabilities': float(total_liabilities),
    })

# ------------------------------------------------------------------------------------------------------------
#Recomendaciones Chatgpt
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    user = request.user

    try:
        # Obtener datos del usuario
        finance = Finance.objects.get(user=user)
        assets = FinancialAsset.objects.filter(user=user)
        liabilities = FinancialLiability.objects.filter(user=user)

        total_assets = sum(asset.value for asset in assets)
        total_liabilities = sum(liability.amount for liability in liabilities)
        current_balance = finance.current_balance

                # Verificar si el balance actual es 0
        if current_balance == 0:
            return Response({
                "message": "Aún no has ingresado tus activos y pasivos. ¡Añádelos para obtener recomendaciones personalizadas!",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion": "Añade tus activos y pasivos para obtener recomendaciones personalizadas.",
            })
        '''
        # Buscar el último registro en la base de datos para este usuario
        last_suggestion = DailySuggestion.objects.filter(user=user).order_by('-created_at').first()

        # Verificar si ya existe un registro con el mismo current_balance
        if finance.current_balance == current_balance:
            return Response({
                "message": "Datos previamente generados.",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion": last_suggestion.assistant_seggestion,
            })
        '''
        # Preparar datos para enviar a OpenAI
        prompt = f"""
        El usuario tiene un Capital Neto de {current_balance}, su total de activos están valorados en {total_assets} mientras
        que su total de pasivos son {total_liabilities}. Por favor, proporciona recomendaciones de inversiones
        financieras personalizadas que podrían ayudar al usuario a mejorar su situación financiera toma en cuenta que el usuario tiene un balance actual de {current_balance}. en menos de 250 palabras.
        """

        assistant_suggestion = obtener_respuesta_chatgpt(prompt).replace("\\n", "\n")
        assistant_suggestion = assistant_suggestion.replace("**", "")

        # Guardar en la base de datos
        daily_suggestion = DailySuggestion.objects.create(
            user=user,
            user_message=prompt,
            assistant_seggestion=assistant_suggestion
        )

        # Responder al cliente
        return Response({
            "message": "Recomendaciones generadas con éxito",
            "current_balance": current_balance,
            "total_assets": total_assets,
            "total_liabilities": total_liabilities,
            "assistant_suggestion": assistant_suggestion,
        })

    except Finance.DoesNotExist:
        return Response({"error": "No se encontraron datos financieros para este usuario."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

#------------------------------------------------------------------------------------------------------------
# Vista para analiticas de Riesgo
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_analitics(request):
    user = request.user

    try:
        # Obtener datos del usuario
        finance = Finance.objects.get(user=user)
        assets = FinancialAsset.objects.filter(user=user)
        liabilities = FinancialLiability.objects.filter(user=user)

        total_assets = sum(asset.value for asset in assets)
        total_liabilities = sum(liability.amount for liability in liabilities)
        current_balance = finance.current_balance

                # Verificar si el balance actual es 0
        if current_balance == 0:
            return Response({
                "message": "Aún no has ingresado tus activos y pasivos. ¡Añádelos para obtener recomendaciones personalizadas!",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion_anal": "Te daré recomendaciones personalizadas cuando tengas tus activos y pasivos ingresados!.",
            })

        '''
        # Buscar el último registro en la base de datos para este usuario
        last_suggestion = Analitycs.objects.filter(user=user).order_by('-created_at').first()

        # Verificar si ya existe un registro con el mismo current_balance
        if last_suggestion and finance.current_balance == current_balance:
            return Response({
                "message": "Datos previamente generados.",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion_anal": last_suggestion.assistant_seggestion,
            })
        '''
        # Preparar datos para enviar a OpenAI
        prompt = f"""
        Tengo un Capital Neto de {current_balance}, total de mis activos están valorados en {total_assets} mientras
        que mi total de pasivos son {total_liabilities}.
        Porfavor, Proporciona mi perfil de riego, solo dime si es (Bajo, moderado o alto ) y sugiere una recomendacion personalizada.
        no incluyas la fórmula para calcular el riego. con 200 palabras.
        """

        assistant_suggestion_anal = obtener_respuesta_chatgpt(prompt).replace("\\n", "\n")
        assistant_suggestion_anal = assistant_suggestion_anal.replace("**", "")

        # Guardar en la base de datos
        daily_suggestion = Analitycs.objects.create(
            user=user,
            user_message=prompt,
            assistant_seggestion=assistant_suggestion_anal
        )

        # Responder al cliente
        return Response({
            "message": "Recomendaciones generadas con éxito",
            "current_balance": current_balance,
            "total_assets": total_assets,
            "total_liabilities": total_liabilities,
            "assistant_suggestion_anal": assistant_suggestion_anal,
        })

    except Finance.DoesNotExist:
        return Response({"error": "No se encontraron datos financieros para este usuario."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

#------------------------------------------------------------------------------------------------------------
# Vista para recomendaciones de Pago de deuda
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_debt_payment(request):
    user = request.user

    try:
        # Obtener datos del usuario
        finance = Finance.objects.get(user=user)
        assets = FinancialAsset.objects.filter(user=user)
        liabilities = FinancialLiability.objects.filter(user=user)

        total_assets = sum(asset.value for asset in assets)
        total_liabilities = sum(liability.amount for liability in liabilities)
        name_liabilities = [liability.name for liability in liabilities]
        current_balance = finance.current_balance

                # Verificar si el balance actual es 0
        if current_balance == 0:
            return Response({
                "message": "Aún no has ingresado tus activos y pasivos. ¡Añádelos para obtener recomendaciones personalizadas!",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion_debt": "Te daré recomendaciones personalizadas cuando tenga tus datos ingresados!.",
            })

        '''
        # Buscar el último registro en la base de datos para este usuario
        last_suggestion = DebtPayment.objects.filter(user=user).order_by('-created_at').first()

        # Verificar si ya existe un registro con el mismo current_balance
        if last_suggestion and finance.current_balance == current_balance:
            return Response({
                "message": "Datos previamente generados.",
                "current_balance": current_balance,
                "total_assets": total_assets,
                "total_liabilities": total_liabilities,
                "assistant_suggestion_debt": last_suggestion.assistant_seggestion,
            })
        '''
        # Preparar datos para enviar a OpenAI
        prompt = f"""
        Tengo un Capital Neto de {current_balance}, total de mis activos son {total_assets} mientras
        que mi total de pasivos son {total_liabilities}.
        considera que tengo {name_liabilities} que debo pagar.
        Porfavor, Proporciona una recomendacion personalizada sobre como pagar las deudas, en menos de 250 palabras.
        """

        assistant_suggestion_debt = obtener_respuesta_chatgpt(prompt).replace("\\n", "\n")
        assistant_suggestion_debt = assistant_suggestion_debt.replace("**", "")

        # Guardar en la base de datos
        daily_suggestion = DebtPayment.objects.create(
            user=user,
            user_message=prompt,
            assistant_seggestion=assistant_suggestion_debt
        )

        # Responder al cliente
        return Response({
            "message": "Recomendaciones generadas con éxito",
            "current_balance": current_balance,
            "total_assets": total_assets,
            "total_liabilities": total_liabilities,
            "assistant_suggestion_debt": assistant_suggestion_debt,
        })

    except Finance.DoesNotExist:
        return Response({"error": "No se encontraron datos financieros para este usuario."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
