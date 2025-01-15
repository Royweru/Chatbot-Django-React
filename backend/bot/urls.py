
from django.contrib import admin
from django.urls import path
from .views import BotQueryAPIView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/query',BotQueryAPIView.as_view(),name= 'bot-query')
]
