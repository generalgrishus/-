import uuid
from django.db import models
from django.contrib.auth.models import User

class Place(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, blank=True)
    lon = models.DecimalField("longitude", max_digits=9, decimal_places=6)
    lat = models.DecimalField("latitude", max_digits=9, decimal_places=6)
    description = models.TextField(blank=True)
    #image =
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    is_visited = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Note(models.Model):
    place = models.OneToOneField(
        Place,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    emo_text = models.TextField("emotion_text", blank=True)
    is_liked = models.BooleanField(default=False)
    visit_date = models.DateField()

    def __str__(self):
        return "Note for the %s" % self.place.name