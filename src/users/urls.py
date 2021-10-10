from django.urls import path
from .views import *

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('test/', Test.as_view())
]