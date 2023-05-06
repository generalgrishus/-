from django.urls import path
from .views import PlaceView

urlpatterns = [
    path("place/", PlaceView.as_view())
]