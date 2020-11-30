from djongo import models


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    quantity = models.IntegerField()

    class Meta:
        abstract = True


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ArrayField(
        model_container=Ingredient)
    objects = models.DjongoManager()
