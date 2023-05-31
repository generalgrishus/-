from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import login

from users.forms import RegistrationUserForm

import json

@api_view(['POST'])
def create_user(request):
    form = RegistrationUserForm(request.data)
    print(request.data)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return Response(json.dumps({
    'success': True,
    'errors': None,
}))
    else:
        print(form.errors)
        return Response(json.dumps({
    'success': False,
    'errors': dict(form.errors.items()),
}))