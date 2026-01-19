from django.shortcuts import render
from django.db import transaction
from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Contact, ContactStatusChoices
from .serializers import ContactSerializer, CsvImportSerializer
import csv
import io

class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContactSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["last_name", "created_at"]
    ordering = ["last_name"]

    def get_queryset(self):
        return Contact.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        new_status_obj=ContactStatusChoices.objects.filter(status='Nowy').first()
        serializer.save(status=new_status_obj,owner=self.request.user)

    @action(detail=False, methods=['POST'], url_path='upload-contacts')
    def upload_contacts(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"detail": "File is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not file.name.endswith('.csv'):
            return Response({"detail": "Please upload a CSV file."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            decoded_file = file.read().decode('utf-8-sig')
            reader = csv.DictReader(io.StringIO(decoded_file))
            new_contacts = []
            errors = []

            new_status_obj = ContactStatusChoices.objects.filter(status='Nowy').first()
            if not new_status_obj:
                return Response(
                    {"detail": "'Nowy' status not found in database."}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            for index, row in enumerate(reader, start=1):
                serializer = CsvImportSerializer(data=row)
                
                if serializer.is_valid():
                    instance = Contact(**serializer.validated_data)
                    instance.status_id = new_status_obj.id
                    instance.owner = request.user
                    new_contacts.append(instance)
                else:
                    errors.append({
                        "row": index,
                        "errors": serializer.errors
                    })

            if new_contacts:
                    Contact.objects.bulk_create(
                    new_contacts, 
                    ignore_conflicts=True
                )

            return Response({
                "status": "ok",
                "errors": errors
            })
        
        except UnicodeDecodeError:
            return Response({"detail": "Invalid file encoding"}, status=status.HTTP_400_BAD_REQUEST)
        except csv.Error as e:
            return Response({"detail": f"CSV parsing error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
