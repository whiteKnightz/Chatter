# Generated by Django 4.0.1 on 2022-04-17 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.TextField(max_length=15, unique=True),
        ),
    ]
