from django.urls import path
from .views import (
    CustomUserListView,
    CustomUserSummaryView,
    CustomUserDetailView,
    SkillsListView,
    SkillDetailView,
    EducationListView,
    EducationDetailView,
    ProjectListView,
    ProjectDetailView,
    ExperienceListView,
    ExperienceDetailView,
    AchievementListView,
    AchievementDetailView,
)

app_name = 'myapi'

urlpatterns = [
    path("users/", CustomUserListView.as_view(), name="user-list-create"),
    path("users/<str:username>/summary/", CustomUserSummaryView.as_view(), name="user-detail"),
    path("users/<str:username>/details/", CustomUserDetailView.as_view(), name="user-detail-full"),

    path("users/<str:username>/skills/", SkillsListView.as_view(), name="skill-list"),
    path("users/<str:username>/skills/<int:pk>/", SkillDetailView.as_view(), name="skill-detail"),

    path("users/<str:username>/education/", EducationListView.as_view(), name="education-list"),
    path("users/<str:username>/education/<int:pk>/", EducationDetailView.as_view(), name="education-detail"),

    path("users/<str:username>/projects/", ProjectListView.as_view(), name="project-list"),
    path("users/<str:username>/projects/<int:pk>/", ProjectDetailView.as_view(), name="project-detail"),

    path("users/<str:username>/experience/", ExperienceListView.as_view(), name="experience-list"),
    path("users/<str:username>/experience/<int:pk>/", ExperienceDetailView.as_view(), name="experience-detail"),

    path("users/<str:username>/achievements/", AchievementListView.as_view(), name="achievement-list"),
    path("users/<str:username>/achievements/<int:pk>/", AchievementDetailView.as_view(), name="achievement-detail"),
]
