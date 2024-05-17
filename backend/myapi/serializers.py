from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import UserProfile, Skill, Education, Project, Experience, Achievement


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password']

    def validate(self, attrs):
        if attrs.get('email', '') == '':
            raise serializers.ValidationError("Email is required")
        elif UserProfile.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError("Email already exists")
        return attrs

    def create(self, validated_data):
        user = UserProfile.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'email', 'picture', 'age', 'phone', 'about_me']
        read_only_fields = ['username', 'email']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill', 'percentage']

    def create(self, validated_data):
        print(f'User: {self.context["request"].user.username}')
        validated_data['user'] = UserProfile.objects.get(username=self.context['request'].user.username)
        return super().create(validated_data)


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institute', 'year']

    def create(self, validated_data):
        validated_data['user'] = UserProfile.objects.get(username=self.context['request'].user.username)
        return super().create(validated_data)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'project_name', 'project_description', 'project_image', 'project_url']

    def create(self, validated_data):
        validated_data['user'] = UserProfile.objects.get(username=self.context['request'].user.username)
        return super().create(validated_data)


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'company_name', 'job_title', 'duration', 'job_description']
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = UserProfile.objects.get(username=self.context['request'].user.username)
        return super().create(validated_data)


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'achievement']

    def create(self, validated_data):
        validated_data['user'] = UserProfile.objects.get(username=self.context['request'].user.username)
        return super().create(validated_data)


class UserProfileDetailSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    education = EducationSerializer(many=True)
    projects = ProjectSerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    achievements = AchievementSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'email', 'picture', 'age', 'phone', 'about_me', 'skills', 'education', 'projects',
                  'experiences', 'achievements']
        read_only_fields = ['username', 'email']
