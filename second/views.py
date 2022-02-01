from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from second.models import student_info
from second.serializers import studentSerializer
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView

from second.models import student_info
# Create your views here.

class home_view(TemplateView):
    template_name = "home.html"

class slist_view(TemplateView):
    template_name = 'student_list.html'
class update_view(UpdateView):
    model = student_info
    fields = ['name', 'sid', 'varsity']
    template_name = 'update.html'
    success_url = '/'
    

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

class student_details_class(APIView):
	def get_object(self, pk):
		try:
			return student_info.objects.get(id=pk)
		except student_info.DoesNotExist():
			return HttpResponse(status=404)
	def get(self, request, pk): # see indivisual student
		st = self.get_object(pk)
		serializer = studentSerializer(st)
		return Response(serializer.data)

	def delete(self, request, pk): # Delete
		st = self.get_object(pk)
		st.delete()
		return Response(status = 204)