from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from second.models import student_info
from second.serializers import studentSerializer
from django.views.generic.base import TemplateView

# Create your views here.

class home_view(TemplateView):
    template_name = "home.html"

class slist_view(TemplateView):
    template_name = 'student_list.html'

class studentList(APIView):
    def get(self, request):
        st = student_info.objects.all()
        serializer = studentSerializer(st, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = studentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_BAD_REQUEST)