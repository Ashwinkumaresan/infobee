from django.urls import path
from .views import ProfileView

urlpatterns = [
    path('student/profile/', ProfileView.as_view(), name='student-profile'),
]
