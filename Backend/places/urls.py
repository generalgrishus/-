from django.urls import path
from .views import PlaceView

urlpatterns = [
    path('', PlaceView.as_view(place_name="Abcdef")),
]