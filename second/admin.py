from django.contrib import admin
from second import models

# Register your models here.
lst = [models.student_info]
admin.site.register(lst)