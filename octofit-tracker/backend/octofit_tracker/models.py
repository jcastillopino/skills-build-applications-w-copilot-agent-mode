from django.db import models
from djongo import models as djongo_models

class User(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username

class Team(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    members = djongo_models.ArrayReferenceField(
        to=User,
        on_delete=models.CASCADE,
        blank=True
    )
    
    def __str__(self):
        return self.name

class Activity(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration_seconds = models.IntegerField()  # Store duration in seconds
    
    def __str__(self):
        return f"{self.user.username}'s {self.activity_type} activity"

class Leaderboard(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    
    def __str__(self):
        return f"{self.user.username}'s score: {self.score}"

class Workout(models.Model):
    _id = djongo_models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
