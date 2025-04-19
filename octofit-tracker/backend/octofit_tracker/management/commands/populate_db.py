from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        db.user.drop()
        db.team.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workout.drop()

        # Clear existing data (Django ORM)
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users
        users = [
            User(_id=ObjectId(), username='thundergod', email='thundergod@mhigh.edu', password='thundergodpassword'),
            User(_id=ObjectId(), username='metalgeek', email='metalgeek@mhigh.edu', password='metalgeekpassword'),
            User(_id=ObjectId(), username='zerocool', email='zerocool@mhigh.edu', password='zerocoolpassword'),
            User(_id=ObjectId(), username='crashoverride', email='crashoverride@hmhigh.edu', password='crashoverridepassword'),
            User(_id=ObjectId(), username='sleeptoken', email='sleeptoken@mhigh.edu', password='sleeptokenpassword'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        blue_team = Team(_id=ObjectId(), name='Blue Team')
        blue_team.save()
        
        gold_team = Team(_id=ObjectId(), name='Gold Team')
        gold_team.save()
        
        # Add members to teams - with djongo we need to save first then add members
        for user in users:
            blue_team.members.add(user)
            if user.username in ['thundergod', 'zerocool']:
                gold_team.members.add(user)

        # Create activities
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration_seconds=int(timedelta(hours=1).total_seconds())),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration_seconds=int(timedelta(hours=2).total_seconds())),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration_seconds=int(timedelta(hours=1, minutes=30).total_seconds())),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration_seconds=int(timedelta(minutes=30).total_seconds())),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration_seconds=int(timedelta(hours=1, minutes=15).total_seconds())),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
            Leaderboard(_id=ObjectId(), user=users[3], score=85),
            Leaderboard(_id=ObjectId(), user=users[4], score=80),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event'),
            Workout(_id=ObjectId(), name='Crossfit', description='Training for a crossfit competition'),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon'),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength'),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
