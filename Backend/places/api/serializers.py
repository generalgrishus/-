from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from places.models import Place, Note
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

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    def validate(self, data):
        print(Place.objects.get(id=data['place'].id).creator)
        print(self.context['request'].user)
        if Place.objects.get(id=data['place'].id).creator != self.context['request'].user:
            raise serializers.ValidationError("Этот пользователь не авторизован.")
        return data