from django.contrib.auth.models import User
from academy.models import StudentProfile

roll_numbers_raw = """7272623BIT001, 7272623BIT003, 7272623BIT005, 7272623BIT007, 7272623BIT009, 7272623BIT011, 7272623BIT013, 7272623BIT015, 7272623BIT017, 7272623BIT019, 7272623BIT021, 7272623BIT023, 7272623BIT025, 7272623BIT027, 7272623BIT029, 7272623BIT031, 7272623BIT033, 7272623BIT035, 7272623BIT037, 7272623BIT039, 7272623BIT041, 7272623BIT043, 7272623BIT045, 7272623BIT047, 7272623BIT049, 7272623BIT051, 7272623BIT053, 7272623BIT055, 7272623BIT057, 7272623BIT059, 7272623BIT061, 7272623BIT063, 7272623BIT065, 7272623BIT067, 7272623BIT069, 7272623BIT071, 7272623BIT073, 7272623BIT075, 7272623BIT077, 7272623BIT079, 7272623BIT081, 7272623BIT083, 7272623BIT085, 7272623BIT087, 7272623BIT089, 7272623BIT091, 7272623BIT093, 7272623BIT095, 7272623BIT097, 7272623BIT099, 7272623BIT101, 7272623BIT103, 7272623BIT105, 7272623BIT107, 7272623BIT109, 7272623BIT111, 7272623BIT113, 7272623BIT115, 7272623BIT117, 7272623BIT119"""

roll_numbers = [r.strip() for r in roll_numbers_raw.split(',')]
password = "Dept@IT."

created_count = 0
for roll in roll_numbers:
    email = f"{roll.lower()}@mcet.in"
    username = roll.lower()
    
    # Create or update user
    user, created = User.objects.get_or_create(username=username)
    user.email = email
    user.set_password(password)
    user.save()
    
    # Create or get profile
    profile, p_created = StudentProfile.objects.get_or_create(user=user)
    if p_created:
        profile.register_number = roll
        profile.official_email = email
        profile.save()
        
    created_count += 1

print(f"Successfully processed {created_count} users and profiles.")
