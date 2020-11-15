from django.db import connection
from django.db import Error
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import permissions


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_user_profile_by_name(request):
    username = request.data['username']

    with connection.cursor() as cursor:
        cursor.execute("select * from user_profile where username = %s", [username])
        row = cursor.fetchone()
        columns = [col[0] for col in cursor.description]
        if row:
            return Response([
                dict(zip(columns, row))
            ])
        else:
            return Response({"error": "user id not found"})


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def insert_user_profile_by_name(request):
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into user_profile (username, birthdate, gender, height, weight, dieting_status) values (%s, null, null, null, null, null)",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def edit_user_profile(request):
    user_gender=request.data['gender']
    username = request.data['username']
    user_birthday = request.data['birthdate']
    user_height=request.data['height']
    user_weight=request.data['weight']
    user_dieting=request.data['dieting_status']
    with connection.cursor() as cursor:
        cursor.execute("UPDATE user_profile SET gender=%s , birthdate=%s, height=%s,weight=%s,dieting_status=%s  where username = %s ", [user_gender,user_birthday,user_height,user_weight,user_dieting,username])
        cursor.execute("select * from user_profile where user_id = %s", [user_id])
        row = cursor.fetchone()
        columns = [col[0] for col in cursor.description]
        if row:
            return Response([
                dict(zip(columns, row))
            ])
        else:
            return Response({"error": "user cannot edit"})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def delete_user_profile_by_name(request):
    username = request.data['username']
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "delete from user_profile where username  = %s", [username])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def delete_user_by_name(request):
    username = request.data['username']
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "delete from auth_user where username  = %s", [username])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def insert_ingredient(request):
    name = request.data['name']
    calorie = request.data['calorie']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into ingredient (name, calorie) values (%s, %s)",
                [name, calorie])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})
