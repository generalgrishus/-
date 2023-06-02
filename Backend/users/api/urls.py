from django.urls import path
from . import views

urlpatterns = [
    path('reg/',  views.create_user, name="register"),
    path('auth/', views.login_user, name="login"),
]