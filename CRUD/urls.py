from django.contrib import admin
from django.urls import path, include
from second.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view.as_view(), name='home'),
    path('slist', slist_view.as_view(), name='slist'),
    path('update/<slug:pk>', update_view.as_view(), name='update'),
    
    path('api/', include('second.urls'))
]
