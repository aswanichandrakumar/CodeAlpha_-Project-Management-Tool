from rest_framework import viewsets, permissions # type: ignore
from rest_framework.response import Response # type: ignore
from django.contrib.auth.models import User # type: ignore
from .models import Project, Task, Comment, Notification
from .serializers import ProjectSerializer, TaskSerializer, CommentSerializer, NotificationSerializer

# Project ViewSet
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        project = serializer.save()
        project.members.add(self.request.user)  # Add creator as a member

# Task ViewSet
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        task = serializer.save()
        # Notify project members about the new task
        for member in task.project.members.all():
            if member != self.request.user:
                Notification.objects.create(user=member, message=f"New task '{task.title}' added.")

# Comment ViewSet
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        comment = serializer.save(author=self.request.user)
        # Notify the task assignee
        if comment.task.assigned_to and comment.task.assigned_to != self.request.user:
            Notification.objects.create(user=comment.task.assigned_to, message=f"New comment on task '{comment.task.title}'.")

# Notification ViewSet
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
