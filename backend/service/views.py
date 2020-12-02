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


# @api_view(['POST'])
# @permission_classes((permissions.AllowAny,))
# def insert_user_profile_by_name(request):
#     username = request.data['username']

#     with connection.cursor() as cursor:
#         try:
#             cursor.execute(
#                 "insert into user_profile (username, birthdate, gender, height, weight, dieting_status) values (%s, null, null, null, null, null)",
#                 [username])
#         except Error as error:
#             return Response({'status': error.args[1]})
#         return Response({'status': 'succeed'})


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def insert_user_profile_by_name(request):
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into user_profile (username, age, gender, height, weight, dieting_status) values (%s, null, null, null, null, null)",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into calBalance (username, consumed_calorie, cap) values (%s, 0, 1500)",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
    return Response({'status': 'succeed'})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def insert_userlike(request):
    ingredient = request.data['ingredient']
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into user_like (username, ingredient) values (%s, %s)",
                [username, ingredient])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def edit_user_profile(request):
    user_gender = request.data['gender']
    username = request.data['username']
    user_age = request.data['age']
    user_height = request.data['height']
    user_weight = request.data['weight']
    user_dieting = request.data['dieting_status']
    with connection.cursor() as cursor:
        cursor.execute(
            "UPDATE user_profile SET gender=%s , age=%s, height=%s,weight=%s,dieting_status=%s  where username = %s ",
            [user_gender, user_age, user_height, user_weight, user_dieting, username])
        cursor.execute("select * from user_profile where username = %s", [username])
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

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_all_ingredient(request):

    with connection.cursor() as cursor:
        cursor.execute("select * from ingredient ")
        all_data = dictfetchall(cursor)
        return Response([
            all_data
        ])


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_ingredient_with_username(request):
    username = request.data['username']
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select ingredient.name, ingredient.calorie from user_like join ingredient on user_like.ingredient = ingredient.name where username = %s",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
        all_data = dictfetchall(cursor)
        return Response([
            all_data
        ])

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def check_calorie(request):
    username = request.data['username']
    consumedCal = request.data['consumedCal']

    with connection.cursor() as cursor:
        try:
            cursor.callproc("CheckCalorie", [username, consumedCal])
        except Error as error:
            return Response({'status':error.args[1]})
        all_data = cursor.fetchall()
        return Response([
            all_data
        ])


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def insert_recipe(request):
    recipe_name = request.data['recipe_name']
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "insert into recipe (username, recipe_name) values (%s, %s)",
                [username, recipe_name])
        except Error as error:
            return Response({'status': error.args[1]})
        return Response({'status': 'succeed'})
    
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_ingredient_with_calorie(request):
    cal = request.data['calorie']
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select ingredient.name, calorie from user_like join ingredient on user_like.ingredient = ingredient.name where username = %s and ingredient.calorie < %s",
                [username, cal])
        except Error as error:
            return Response({'status': error.args[1]})
        all_data = dictfetchall(cursor)
        return Response([
            all_data
        ])

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def show_recipe(request):
    username = request.data['username']

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select recipe_name from recipe where username = %s",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
        all_data = dictfetchall(cursor)
        return Response([
            all_data
        ])

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def list_ingredient(request):
    target = int(request.data['target'])
    cal_range = request.data['range']
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select name, calorie from ingredient ")
        except Error as error:
            return Response({'status': error.args[1]})
        all_data = cursor.fetchall()
        res = get_recomm_ingredient(all_data, target, cal_range)
        return Response(
            res
        )


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def list_ingredient_username(request):
    target = int(request.data['target'])
    cal_range = request.data['range']
    username = request.data['username']
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select name, calorie from ingredient ")
        except Error as error:
            return Response({'status': error.args[1]})
        all_data = cursor.fetchall()
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "select ingredient from user_like where username = %s",
                [username])
        except Error as error:
            return Response({'status': error.args[1]})
        favourite = cursor.fetchall()

    res = get_recomm_ingredient_user(all_data, target, cal_range, favourite)
    return Response(
        res
    )

def get_recomm_ingredient_user(all_data, target, cal_range, s):
    calories = []
    calorie_dict = {}
    ans = []
    id = 1
    for data in all_data:
        calorie = data[1]
        if calorie < 100:
            continue
        calories.append(calorie)
        calorie_dict[data[1]] = data[0]

    recom = combinationSum2(calories, target, cal_range)
    for r in recom:
        temp = []
        flag = 0
        for i in r:
            if (calorie_dict[i],) in s:
                flag = 1
            temp.append(calorie_dict[i])
        if flag == 1:
            ans.append(temp)

    return ans



def get_recomm_ingredient(all_data, target, cal_range):
    calories = []
    calorie_dict = {}
    ans = []
    for data in all_data:
        calorie = data[1]
        if calorie < 100:
            continue
        calories.append(calorie)
        calorie_dict[data[1]] = data[0]

    recom = combinationSum2(calories, target, cal_range)
    for r in recom:
        temp = []
        for i in r:
            temp.append(calorie_dict[i])
        ans.append(temp)

    print(ans)
    return ans


def combinationSum2(candidates, target, cal_range):
    ret = []
    dfs(sorted(candidates), target, 0, [], ret, cal_range)
    return ret


def dfs(nums, target, idx, path, ret, cal_range):
    if len(ret) > 20:
        return
    if target - cal_range <= 0:
        if target + cal_range >= 0:
            ret.append(path)
        return
    for i in range(idx, len(nums)):
        if i > idx and nums[i] == nums[i - 1]:
            continue
        dfs(nums, target - nums[i], i + 1, path + [nums[i]], ret, cal_range)