from places.models import Place
from .serializers import PlaceSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

class PlaceViewSet(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    lookup_field = 'pk'
    lookup_value_regex = '[0-9a-f]{32}'
    
    def get_queryset(self):
        return self.request.user.place_set.all()