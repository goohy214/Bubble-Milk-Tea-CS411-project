from django.urls import path
from .views import *

urlpatterns = [
     path('profile', get_user_profile_by_name),
     path('profile/add', insert_user_profile_by_name),
     path('profile/edit',edit_user_profile),
     path('profile/delete', delete_user_profile_by_name),
     path('user/delete', delete_user_by_name),
     path('ingredient/add', insert_ingredient),
     path('ingredient/get', get_all_ingredient)
]

