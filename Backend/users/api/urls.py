from django.urls import path
from . import views

urlpatterns = [
    path('reg/',  views.RegisterView.as_view(), name="register"),
    path('auth/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name="logout"),
]