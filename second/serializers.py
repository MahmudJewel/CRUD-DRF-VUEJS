from rest_framework import serializers
from second.models import student_info

class studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_info
        fields = '__all__'