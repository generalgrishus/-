from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from places.models import Place
class PlaceSerializer(ModelSerializer):
    id = serializers.UUIDField(format='hex', required=False)
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Place
        fields = '__all__'
        
class PlaceWithoutLonLatSerializer(ModelSerializer):
    id = serializers.UUIDField(format='hex', required=False)
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Place
        fields = ['id', 'name', 'description', 'creator', 'is_visited']