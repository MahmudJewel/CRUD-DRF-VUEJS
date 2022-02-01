from django.contrib import admin
from django.urls import path, include
from second.views import *

urlpatterns = [
    path('list', studentList.as_view()),
    path('edit/<int:pk>', student_details_class.as_view()),
]