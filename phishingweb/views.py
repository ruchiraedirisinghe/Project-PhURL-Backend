from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

# import your prediction function and other required modules here
from .phurl_backend import get_prediction_from_url
from .serializers import UrlPredictionSerializer

@api_view(['POST'])
def predict(request):
    serializer = UrlPredictionSerializer(data=request.data)
    if serializer.is_valid():
        url = serializer.validated_data['url']

        # Check if url starts with https://
        if url.startswith('https://'):
            # Remove https:// from url
            url = url.replace('https://', '')

        result, prob = get_prediction_from_url(url)
        response_data = {
            'result': result,
            'probability': prob
        }
        return Response(response_data)
    else:
        return Response(serializer.errors, status=400)