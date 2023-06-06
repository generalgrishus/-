from .serializers import PlaceSerializer, PlaceWithoutLonLatSerializer

from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class PlaceViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PlaceSerializer
    lookup_field = 'pk'
    lookup_value_regex = '[0-9a-f]{32}'
    
    def get_queryset(self):
        return self.request.user.place_set.all()

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'PUT':
            serializer_class = PlaceWithoutLonLatSerializer
        return serializer_class