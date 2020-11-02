from django.urls import path
from .views import *

urlpatterns = [
    path('profile',get_user_profile_by_id),
]
