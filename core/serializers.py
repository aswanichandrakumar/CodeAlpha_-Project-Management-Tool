from rest_framework import serializers # type: ignore
from django.contrib.auth.models import User # type: ignore
from .models import Project, Task, Comment, Notification

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Project Serializer
class ProjectSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)  # Nested user details

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'members']

# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())  # Reference project by ID
    assigned_to = UserSerializer(read_only=True)  # Read-only user details

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'project', 'assigned_to', 'status', 'due_date', 'created_at', 'updated_at']

# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())  # Reference task by ID
    author = UserSerializer(read_only=True)  # Read-only user details

    class Meta:
        model = Comment
        fields = ['id', 'task', 'author', 'content', 'created_at']

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at']
