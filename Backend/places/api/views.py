from .serializers import PlaceSerializer, PlaceWithoutLonLatSerializer, NoteSerializer

from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from places.models import Note

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

class NoteViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    lookup_field = 'pk'
    lookup_value_regex = '[0-9a-f]{32}'
    
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        return Note.objects.filter(place__creator=self.request.user)