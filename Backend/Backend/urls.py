"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from IA_Asistent import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Login/', views.login),
    path('Register/', views.register),
    path('Logout/', views.logout),
    path('survey/', views.save_survey_responses),
    path('api/consulta-chatgpt/', views.consulta_chatgpt, name='consulta_chatgpt'),
    path('api/get-recommendations/', views.get_recommendations, name='get_recommendations'),
    path('api/get-analitics/', views.get_analitics, name='get_analitics'),
    path('api/get-debt-payment/', views.get_debt_payment, name='get_debt_payment'),

    #Total Activos - Pasivos
    path('update-current-balance/', views.update_current_balance, name='update_current_balance'),

    #activos
    path('list-assets/', views.list_assets, name='list_assets'),
    path('save-financial-asset/', views.save_financial_asset, name='save_financial_asset'),
    path('asset/<int:pk>/', views.retrieve_asset, name='retrieve_asset'),
    path('asset/<int:pk>/update/', views.update_asset, name='update_asset'),
    path('asset/<int:pk>/delete/', views.delete_asset, name='delete_asset'),
    
    # Pasivos
    path('liabilities/', views.list_liabilities, name='list_liabilities'),
    path('liabilities/create/', views.create_liability, name='create_liability'),
    path('liabilities/<int:pk>/',views.retrieve_liability, name='retrieve_liability'),
    path('liabilities/<int:pk>/update/', views.update_liability, name='update_liability'),
    path('liabilities/<int:pk>/delete/', views.delete_liability, name='delete_liability'),
]
