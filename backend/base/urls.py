from unicodedata import name
from django.urls import  path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name = 'user'),
    
    path('users/profile/', views.getUserProfile, name = 'user-profile'),
    path('users/register/', views.registerUser, name = 'user-register'),

    path('products/', views.getProducts, name="products" ),
    path('product/<str:pk>/',views.getProduct, name="product" ),
]