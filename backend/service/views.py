from django.db import connection
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import permissions


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_user_profile_by_id(request):
    user_id = request.data['user_id']

    with connection.cursor() as cursor:
        cursor.execute("select * from user_profile where user_id = %s", [user_id])
        row = cursor.fetchone()
        columns = [col[0] for col in cursor.description]
        if row:
            return Response([
                dict(zip(columns, row))
            ])
        else:
            return Response({"error": "user id not found"})

@api_view(['GET'])
def get_current_user(request):
    serializer = GetFullUserSerializer(request.user)
    return Response(serializer.data)
