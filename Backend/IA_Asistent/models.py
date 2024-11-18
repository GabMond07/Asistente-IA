from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    survey_completed = models.BooleanField(default=False)

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
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Saldo actual
    total_income = models.DecimalField(max_digits=10, decimal_places=2)     # Total ingresos
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2)   # Total gastos
    budget = models.DecimalField(max_digits=10, decimal_places=2)           # Presupuesto	
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Finance data for {self.user.username}"


class SurveyResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    responses = models.JSONField()  # Aquí se guardarán las respuestas en formato JSON
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Respuestas de {self.user.username}"

class FinancialAsset(models.Model):
    TYPE_CHOICES = [
        ('bank_account', 'Bank Account'),
        ('investment', 'Investment'),
        ('fixed_asset', 'Fixed Asset'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relación con el usuario
    name = models.CharField(max_length=100)                  # Nombre del activo
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)  # Tipo de activo
    value = models.DecimalField(max_digits=15, decimal_places=2)  # Valor actual del activo
    category = models.CharField(max_length=50, blank=True, null=True)  # Categoría (opcional)
    created_at = models.DateTimeField(auto_now_add=True)      # Fecha de creación
    updated_at = models.DateTimeField(auto_now=True)          # Fecha de última actualización

    def __str__(self):
        return f"{self.name} ({self.type}) - {self.user.username}"


class FinancialLiability(models.Model):
    TYPE_CHOICES = [
        ('short_term_debt', 'Short Term Debt'),
        ('long_term_debt', 'Long Term Debt'),
        ('liability', 'Liability'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relación con el usuario
    name = models.CharField(max_length=100)                  # Nombre del pasivo
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)  # Tipo de pasivo
    amount = models.DecimalField(max_digits=15, decimal_places=2) # Monto del pasivo
    due_date = models.DateField(blank=True, null=True)             # Fecha de vencimiento (opcional)
    created_at = models.DateTimeField(auto_now_add=True)      # Fecha de creación
    updated_at = models.DateTimeField(auto_now=True)          # Fecha de última actualización

    def __str__(self):
        return f"{self.name} ({self.type}) - {self.user.username}"