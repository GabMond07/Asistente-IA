from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User

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

