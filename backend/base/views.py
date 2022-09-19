from email import message
from re import T
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .products import products
from .serializers import ProductSerializer, UserSerializer, UserSerializersWithToken
# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializersWithToken(self.user).data

        for k,v in serializer.items():
            data[k] =v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):

    user = request.user
    serializers = UserSerializer(user, many= False)
    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])

def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many= True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try :
        users = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializers = UserSerializersWithToken(users, many =False)
        return Response(serializers.data)
    except:
        message = { 'detail' : 'User with this e-mail already exists.'}
        return  Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many= True)
    return Response(serializers.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serializers = ProductSerializer(product, many= False)
    return Response(serializers.data)