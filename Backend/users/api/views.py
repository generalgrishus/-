from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return

from django.contrib.auth import login, authenticate, logout

from users.forms import RegistrationUserForm
from django.contrib.auth.forms import AuthenticationForm

import json

def json_response(isSuccess, errors):
    return Response(json.dumps({
    'success': isSuccess,
    'errors': errors,
}, indent=2, ensure_ascii=False))

class RegisterView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        form = RegistrationUserForm(request.data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return json_response(True, None)
        return json_response(False, dict(form.errors.items()))
class LoginView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        form = AuthenticationForm(request, request.data)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return json_response(True, None)
        return json_response(False, dict(form.errors.items()))

class LogoutView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)   
    def post(self, request, format=None):
        logout(request)
        return Response()