from django.urls import path, include # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from .views import ProjectViewSet, TaskViewSet, CommentViewSet, NotificationViewSet

# Set up API routes using Django REST Framework's router
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'notifications', NotificationViewSet, basename='notification')

# URL Patterns
urlpatterns = [
    path('api/', include(router.urls)),  # API endpoints
]
