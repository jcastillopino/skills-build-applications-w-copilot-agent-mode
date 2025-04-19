from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout

class UserViewSet(ViewSet):
    def list(self, request):
        users = User.objects.all()
        user_data = [{"username": user.username, "email": user.email} for user in users]
        return Response(user_data)

class TeamViewSet(ViewSet):
    def list(self, request):
        teams = Team.objects.all()
        team_data = [{"name": team.name, "members": [member.username for member in team.members]} for team in teams]
        return Response(team_data)

class ActivityViewSet(ViewSet):
    def list(self, request):
        activities = Activity.objects.all()
        activity_data = [{"user": activity.user.username, "type": activity.activity_type, "duration": activity.duration_seconds} for activity in activities]
        return Response(activity_data)

class LeaderboardViewSet(ViewSet):
    def list(self, request):
        leaderboard = Leaderboard.objects.all()
        leaderboard_data = [{"user": entry.user.username, "score": entry.score} for entry in leaderboard]
        return Response(leaderboard_data)

class WorkoutViewSet(ViewSet):
    def list(self, request):
        workouts = Workout.objects.all()
        workout_data = [{"name": workout.name, "description": workout.description} for workout in workouts]
        return Response(workout_data)
