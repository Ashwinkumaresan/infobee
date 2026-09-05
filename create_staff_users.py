import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')
django.setup()

from django.contrib.auth.models import User
from academy.models import Staff

def create_staff_users():
    staff_members = Staff.objects.all()
    for staff in staff_members:
        if not staff.user:
            # Create user
            username = staff.staff_id
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_password('staff@123')
                user.save()
                print(f"Created user for {staff.name} ({username})")
            
            staff.user = user
            staff.save()
            print(f"Linked user to staff {staff.name}")

if __name__ == '__main__':
    create_staff_users()
