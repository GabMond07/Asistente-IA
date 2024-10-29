from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(FinancialPlan)
admin.site.register(ChatHistory)
admin.site.register(DailySuggestion)
admin.site.register(Finance)

