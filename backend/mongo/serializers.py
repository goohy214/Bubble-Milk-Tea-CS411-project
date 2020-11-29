from rest_framework import serializers 
from mongo.models import Mongo
 
 
class MongoSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Mongo
        fields = ('id',
                  'title',
                  'description',
                  'published')