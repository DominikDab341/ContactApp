from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

class ContactStatusChoices(models.Model):
    status = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.status}"

class Contact(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=128)
    phone_number = PhoneNumberField()
    email = models.EmailField()
    town = models.CharField(max_length=256)
    status = models.ForeignKey(ContactStatusChoices, on_delete=models.PROTECT)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['owner', 'phone_number'],
                name='unique_owner_phone_number'
            ),
            models.UniqueConstraint(
                fields=['owner', 'email'],
                name='unique_owner_email'
            )
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



