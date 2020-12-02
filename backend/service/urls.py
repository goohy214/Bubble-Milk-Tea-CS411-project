from django.urls import path
from .views import *

urlpatterns = [
     path('profile', get_user_profile_by_name),
     path('profile/add', insert_user_profile_by_name),
     path('profile/edit',edit_user_profile),
     path('profile/delete', delete_user_profile_by_name),
     path('user/delete', delete_user_by_name),
     path('user/like', insert_userlike),
     path('ingredient/add', insert_ingredient),
     path('ingredient/get', get_all_ingredient),
     path('ingredient/fav', get_ingredient_with_username),
     path('ingredient/check', check_calorie),
     path('recipe/add', insert_recipe),
     path('get_ingredient_with_calorie', get_ingredient_with_calorie),
     path('recipe/show', show_recipe),
     path('list_ingredient', list_ingredient),
     path('list_ingredient_username', list_ingredient_username)
]

