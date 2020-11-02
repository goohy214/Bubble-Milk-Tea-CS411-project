from rest_framework import serializers as sz
from .models import *
from django.contrib.auth.models import User

class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','is_superuser','email')