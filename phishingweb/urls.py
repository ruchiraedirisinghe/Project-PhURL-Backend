from django.urls import path
from . import views

urlpatterns = [
    path('phishingweb/predict/', views.predict, name='predict'),
]