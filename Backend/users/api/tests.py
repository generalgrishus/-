from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class MyTestCase(APITestCase):
    url = '/url'

    def post(self, payload, url=None):
        """
        Helper to send an HTTP post.

        @param (dict) payload: request body

        @returns: response
        """
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