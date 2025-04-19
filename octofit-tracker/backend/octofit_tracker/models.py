from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, IntField

class User(Document):
    username = StringField(max_length=100, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(max_length=100, required=True)

class Team(Document):
    name = StringField(max_length=100, unique=True, required=True)
    members = ListField(ReferenceField(User))

class Activity(Document):
    user = ReferenceField(User, required=True)
    activity_type = StringField(max_length=100, required=True)
    duration_seconds = IntField(required=True)  # Store duration in seconds

class Leaderboard(Document):
    user = ReferenceField(User, required=True)
    score = IntField(required=True)

class Workout(Document):
    name = StringField(max_length=100, required=True)
    description = StringField()
