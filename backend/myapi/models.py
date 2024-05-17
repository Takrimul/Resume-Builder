from django.contrib.auth.models import AbstractUser, User
from django.db import models


class UserProfile(User):
    picture = models.ImageField(upload_to="images/", blank=True)
    age = models.IntegerField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    about_me = models.TextField(blank=True)


class Skill(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="skills")
    skill = models.CharField(max_length=100)
    percentage = models.IntegerField(default=100)


class Education(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="education")
    degree = models.CharField(max_length=100)
    institute = models.CharField(max_length=100)
    year = models.IntegerField()


class Project(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="projects")
    project_name = models.CharField(max_length=100)
    project_description = models.TextField(blank=True)
    project_image = models.ImageField(upload_to="images/", blank=True)
    project_url = models.URLField(blank=True)


class Experience(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="experiences")
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    duration = models.CharField(max_length=100, blank=True)
    job_description = models.TextField(blank=True)


class Achievement(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="achievements")
    achievement = models.CharField(max_length=100)
