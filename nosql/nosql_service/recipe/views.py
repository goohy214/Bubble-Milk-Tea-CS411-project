from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import permissions
from .models import Recipe


# Create your views here.

# {
#     "name": "recipe name",
#     "ingredients": [
#        {
#           "name": "ingredient name",
#           "quantity": 100
#        }
#     ]
# }
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def add_recipe(request):
    name = request.data['name']
    ingredients = request.data['ingredients']
    entry = Recipe()
    entry.name = name
    t = []
    for i in ingredients:
        t.append({
            'name': i['name'],
            'quantity': i['quantity']
        })
    entry.ingredients = t
    entry.save()
    return Response([])


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_ingredients_by_name(request):
    name = request.data['name']
    ret = Recipe.objects.filter(name=name)
    data = []
    for r in ret:
        data.append(r.ingredients)
    return Response(data)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def list_recipe(request):
    data = []
    all_recipes = Recipe.objects.all()
    for r in all_recipes:
        data.append({
            'name': r.name,
            'ingredients': r.ingredients
        })
    return Response(data)
