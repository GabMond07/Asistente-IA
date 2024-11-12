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
        respuesta_texto = obtener_respuesta_chatgpt(pregunta)
        
        # Guardar en ChatHistory para consultas futuras
        ChatHistory.objects.create(user=usuario, user_message=pregunta, assistant_response=respuesta_texto)
        
        return Response({"respuesta": respuesta_texto}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)