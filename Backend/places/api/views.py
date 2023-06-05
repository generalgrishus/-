from places.models import Place
from .serializers import PlaceSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
class PlaceListView(APIView):
    def post(self, request, format=None):
        serializer = PlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        places = Place.objects.filter(creator=request.user.id)
        serializer = PlaceSerializer(places, many=True)
        return Response(serializer.data)