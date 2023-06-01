from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import login

from users.forms import RegistrationUserForm

import json

def json_response(isSuccess, errors):
    return Response(json.dumps({
    'success': isSuccess,
    'errors': errors,
}))

@api_view(['POST'])
def create_user(request):
    form = RegistrationUserForm(request.data)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return json_response(True, None)
    return json_response(False, dict(form.errors.items()))