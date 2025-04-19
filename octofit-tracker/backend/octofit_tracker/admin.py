from django.contrib import admin
from .models import Activity

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_type', 'user', 'duration')  # Update to match the updated Activity model
