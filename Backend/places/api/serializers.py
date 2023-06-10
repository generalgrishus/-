from uuid import UUID
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from places.models import Place, Note
class PlaceSerializer(ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Place
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['id'] = UUID(ret['id']).hex
        return ret
        
class PlaceWithoutLonLatSerializer(PlaceSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'description', 'creator', 'is_visited']

class NoteSerializer(ModelSerializer):
    place = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Note
        fields = '__all__'

    def validate(self, data):
        if Place.objects.get(id=self.context['view'].kwargs.get('pk')).creator != self.context['request'].user:
            raise serializers.ValidationError("Этот пользователь не авторизован.")
        return data

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['place'] = ret['place'].hex
        return ret