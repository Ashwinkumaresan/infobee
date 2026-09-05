import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')
django.setup()

from django.contrib.auth.models import User
from academy.models import Staff

def create_staff(staff_id, name):
    user, created_user = User.objects.get_or_create(username=staff_id)
    user.set_password('staff@123')
    user.save()
    if created_user:
        print(f"Created user {staff_id}")
    else:
        print(f"User {staff_id} already exists, updated password to staff@123")
    
    staff, created_staff = Staff.objects.get_or_create(staff_id=staff_id, defaults={
        'name': name,
        'user': user,
        'college_email': f'{staff_id.lower()}@mit.edu',
        'personal_email': f'{staff_id.lower()}@gmail.com',
        'designation': 'Assistant Professor',
    })
    
    if not created_staff and not staff.user:
        staff.user = user
        staff.save()
        print(f"Updated staff {staff_id} with user")
    elif created_staff:
        print(f"Created staff {staff_id}")
    else:
        print(f"Staff {staff_id} already exists")

if __name__ == '__main__':
    create_staff('MIT-40', 'Staff MIT-40')
    create_staff('MIT-50', 'Staff MIT-50')
    create_staff('MIT-60', 'Staff MIT-60')
