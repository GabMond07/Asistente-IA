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
    user_message = models.TextField(default="")
    assistant_seggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat on {self.created_at} By {self.user.username}"

class Analitycs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField(default="")
    assistant_seggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat on {self.created_at} By {self.user.username}"

class DebtPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField(default="")
    assistant_seggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat on {self.created_at} By {self.user.username}"

class Finance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)  # Saldo actual
    total_income = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True, blank=True)     # Total ingresos
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True, blank=True)   # Total gastos
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True, blank=True)           # Presupuesto	
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
        ('Cuenta Bancaria', 'cuenta bancaria'),
        ('Inversión', 'inversión'),
        ('Activo Fijo', 'activo fijo'),
        ('Otro', 'otro'),
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
        ('Deuda a Corto Plazo', 'deuda a corto plazo'),
        ('Deuda a Largo Plazo', 'deuda a largo plazo'),
        ('Responsibilidad', 'responsabilidad'),
        ('Pasivo', 'pasivo'),
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