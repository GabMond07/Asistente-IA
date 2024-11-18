from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  

class FinancialPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialPlan
        fields = '__all__'

class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = '__all__'

class DailySuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySuggestion
        fields = '__all__'

class FinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finance 
        fields = '__all__'

class SurveyResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = '__all__'

class FinancialAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialAsset
        fields = ['id', 'name', 'type', 'value', 'category', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FinancialLiabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialLiability
        fields = ['id', 'name', 'type', 'amount', 'due_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']