from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import login, authenticate

from users.forms import RegistrationUserForm
from django.contrib.auth.forms import AuthenticationForm

import json

def json_response(isSuccess, errors):
    return Response(json.dumps({
    'success': isSuccess,
    'errors': errors,
}, indent=2, ensure_ascii=False))

@api_view(['POST'])
def create_user(request):
    form = RegistrationUserForm(request.data)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return json_response(True, None)
    return json_response(False, dict(form.errors.items()))

@api_view(['POST'])
def login_user(request):
    form = AuthenticationForm(request, request.data)
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return json_response(True, None)
    return json_response(False, dict(form.errors.items()))