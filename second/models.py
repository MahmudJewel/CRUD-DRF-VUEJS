from django.db import models

# Create your models here.
class student_info(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    sid = models.CharField(max_length=50, blank=True, null=True)
    varsity = models.CharField(max_length=150, blank=True, null=True)
    
    def __str__(self):
        return self.name