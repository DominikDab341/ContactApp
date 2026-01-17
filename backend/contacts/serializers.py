from rest_framework import serializers
from .models import Contact
from phonenumber_field.serializerfields import PhoneNumberField

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'town', 'status',
                  'created_at']
        read_only_fields = ['id','created_at']

class CsvImportSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=64)
    last_name = serializers.CharField(max_length=128)
    phone_number = PhoneNumberField()
    email = serializers.EmailField()
    town = serializers.CharField(max_length=256, required=False, allow_blank=True)
    