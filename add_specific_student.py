import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')
django.setup()

from django.contrib.auth.models import User
from academy.models import StudentProfile, StudentClass

def create_student(register_number, name):
    user, created_user = User.objects.get_or_create(username=register_number)
    user.set_password('student@123')
    user.save()
    if created_user:
        print(f"Created user {register_number}")
    else:
        print(f"User {register_number} already exists, updated password to student@123")
    
    student, created_student = StudentProfile.objects.get_or_create(user=user, defaults={
        'register_number': register_number,
        'name': name,
        'official_email': f'{register_number.lower()}@mit.edu',
        'personal_email': f'{register_number.lower()}@gmail.com',
    })
    
    if created_student:
        print(f"Created student {register_number}")
    else:
        print(f"Student {register_number} already exists")

if __name__ == '__main__':
    create_student('727625BIT058', 'Student 727625BIT058')
