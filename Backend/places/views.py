from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

class PlaceView(View):
    place_name = "Default name"
    
    def get(self, request):
        return HttpResponse(self.place_name)