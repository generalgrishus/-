from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.PlaceListView.as_view(), name="add_place"),
    path('get/', views.PlaceListView.as_view(), name="get_places")
]