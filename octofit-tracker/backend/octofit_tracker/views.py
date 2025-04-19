from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

@api_view(['GET'])
def api_root(request, format=None):
    base_url = 'https://solid-xylophone-p7w6xq49r5c5rr-8000.app.github.dev/'
    if request.get_host() == 'localhost:8000':
        base_url = 'http://localhost:8000/'

    return Response({
        'users': base_url + 'api-root/users/',
        'teams': base_url + 'api-root/teams/',
        'activities': base_url + 'api-root/activities/',
        'leaderboard': base_url + 'api-root/leaderboard/',
        'workouts': base_url + 'api-root/workouts/',
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
