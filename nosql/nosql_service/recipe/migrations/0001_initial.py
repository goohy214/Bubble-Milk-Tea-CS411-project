# Generated by Django 3.0.5 on 2020-11-30 00:51

from django.db import migrations, models
import djongo.models.fields
import recipe.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('ingredients', djongo.models.fields.ArrayField(model_container=recipe.models.Ingredient)),
            ],
        ),
    ]
