"""
URL configuration for App project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from academy.views import CustomTokenObtainPairView
from academy.views import (
    ProfileView, StudentStatsView, 
    ResearchPaperListCreateView, ResearchPaperDetailView,
    ToggleSavePaperView, ToggleCitePaperView,
    AuthorPublicProfileView,
    CurrentUserRoleView, StaffProfileView, StaffStudentProfileView,
    StaffStudentStatsView, ExportStudentDataView,
    ResearchPaperStatusUpdateView,
    RequestProfileUpdateView,
    ForgotPasswordView, VerifyOTPView, ResetPasswordView,
    GalleryEventListView,
    EligibleHackathonStudentsView, HackathonRegisterView, AvailableScenariosView,
    StudentHackathonDetailsView, RegisteredHackathonTeamsView
)
urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT Auth
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('api/auth/verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('api/auth/reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    # Academy Profile
    path('api/user/me/', CurrentUserRoleView.as_view(), name='current-user-role'),
    path('api/student/profile/', ProfileView.as_view(), name='student-profile'),
    path('api/staff/profile/', StaffProfileView.as_view(), name='staff-profile'),
    path('api/staff/student/<str:roll_no>/', StaffStudentProfileView.as_view(), name='staff-student-profile'),
    path('api/staff/student/<str:roll_no>/stats/', StaffStudentStatsView.as_view(), name='staff-student-stats'),
    path('api/staff/export/', ExportStudentDataView.as_view(), name='staff-export'),
    path('api/student/profile/stats/', StudentStatsView.as_view(), name='student-stats'),
    path('api/student/request-update/', RequestProfileUpdateView.as_view(), name='student-request-update'),
    # Research
    path('api/research/', ResearchPaperListCreateView.as_view(), name='research-list-create'),
    path('api/research/<int:pk>/', ResearchPaperDetailView.as_view(), name='research-detail'),
    path('api/research/<int:pk>/status/', ResearchPaperStatusUpdateView.as_view(), name='update-paper-status'),
    path('api/research/<int:pk>/save/', ToggleSavePaperView.as_view(), name='research-save'),
    path('api/research/<int:pk>/cite/', ToggleCitePaperView.as_view(), name='research-cite'),
    path('api/research/author/<str:roll_no>/', AuthorPublicProfileView.as_view(), name='research-author-profile'),
    # Gallery
    path('api/gallery/', GalleryEventListView.as_view(), name='gallery-list'),
    # Hackathon
    path('api/hackathon/eligible-students/', EligibleHackathonStudentsView.as_view(), name='hackathon-eligible-students'),
    path('api/hackathon/register/', HackathonRegisterView.as_view(), name='hackathon-register'),
    path('api/hackathon/available-scenarios/', AvailableScenariosView.as_view(), name='hackathon-available-scenarios'),
    path('api/hackathon/my-team/', StudentHackathonDetailsView.as_view(), name='hackathon-my-team'),
    path('api/hackathon/registered-teams/', RegisteredHackathonTeamsView.as_view(), name='hackathon-registered-teams'),
]

from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path
from django.views.static import serve

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

