from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.PlaceAPIView.as_view(), name="add_place"),
]