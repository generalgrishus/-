from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class RegistrationTestCase(APITestCase):
    url = '/api/reg'

    def post(self, payload, url=None):
        if url is None:
            url = self.url

        return self.client.post(url, payload, format='json')

    def test_my_function(self):
        payload = {
            'username' : 'sony',
            'email' : 'sony@email.com',
            'password1' : 'abcd',
            'password2' : 'abcd'
        }
        response = self.post(payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)