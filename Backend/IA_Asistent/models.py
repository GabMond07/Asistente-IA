from django.db import models
from django.contrib.auth.models import User

class FinancialPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    content = models.JSONField()  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ChatHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField()
    assistant_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat on {self.created_at} by {self.user.username}"


class DailySuggestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField() 
    relevance = models.CharField(
        max_length=10,
        choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Suggestion for {self.user.username} - {self.relevance}"


class Finance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2)  # Saldo actual
    total_income = models.DecimalField(max_digits=10, decimal_places=2)     # Total ingresos
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2)   # Total gastos
    budget = models.DecimalField(max_digits=10, decimal_places=2)           # Presupuesto	
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Finance data for {self.user.username}"
