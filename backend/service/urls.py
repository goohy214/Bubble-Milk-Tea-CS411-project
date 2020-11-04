from django.urls import path
from .views import *

urlpatterns = [
    path('profile', get_user_profile_by_name),
     path('profile/add', insert_user_profile_by_name)
]
