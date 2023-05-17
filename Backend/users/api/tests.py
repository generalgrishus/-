from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.exceptions import APIException

from django.urls import reverse


class RegistrationTestCase(APITestCase):
    def test_my_function(self):
        payload = {
            'username' : 'sony',
            'email' : 'sony@email.com',
            'password1' : 'abcdefgfgfgffgff',
            'password2' : 'abcdefgfgfgffgff'
        }
        response = self.client.post(reverse('register'), payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)