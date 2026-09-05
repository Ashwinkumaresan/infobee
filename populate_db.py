import os
import django
import sys
import math

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')
django.setup()

from django.contrib.auth.models import User
from academy.models import Staff, AcademicYear, Section, StudentClass, StudentProfile

def create_staff(name):
    # generate a simple staff_id from name
    staff_id = ''.join(e for e in name if e.isalnum()).upper()
    staff, created = Staff.objects.get_or_create(staff_id=staff_id, defaults={'name': name, 'designation': 'Faculty'})
    
    # create user
    user, u_created = User.objects.get_or_create(username=staff_id)
    if u_created:
        user.set_password('staff@123')
        user.save()
        staff.user = user
        staff.save()
        print(f"Created staff user {staff_id} for {name}")
    
    # create role if not exists in role app? No, Role is implicit or via User profile? Wait, staff role is checked by staff profile existence in view.
    return staff

def populate():
    # Academic Year
    year_ii, _ = AcademicYear.objects.get_or_create(name='II')
    
    data = [
        {
            'section': 'A',
            'cc': 'A.P.Janani',
            'mentors': ['Ms.P.Banumathi', 'Ms.G.P.Karpagam', 'Dr.A.P.Janani'],
            'rolls': [
                '727625BIT001', '727625BIT002', '727625BIT003', '727625BIT004', '727625BIT005', '727625BIT006', '727625BIT007', '727625BIT008', '727625BIT009', '727625BIT010', '727625BIT011', '727625BIT012', '727625BIT013', '727625BIT014', '727625BIT015', '727625BIT016', '727625BIT017', '727625BIT018', '727625BIT019', '727625BIT020', '727625BIT021', '727625BIT022', '727625BIT023', '727625BIT024', '727625BIT025', '727625BIT026', '727625BIT027', '727625BIT028', '727625BIT029', '727625BIT030', '727625BIT031', '727625BIT032', '727625BIT033', '727625BIT034', '727625BIT035', '727625BIT036', '727625BIT037', '727625BIT038', '727625BIT039', '727625BIT040', '727625BIT041', '727625BIT042', '727625BIT043', '727625BIT044', '727625BIT045', '727625BIT046', '727625BIT047', '727625BIT048', '727625BIT049', '727625BIT050', '727625BIT051', '727625BIT052', '727625BIT053', '727625BIT054', '727625BIT055', '727625BIT056', '727625BIT057', '727625BIT058', '727625BIT059', '727625BIT060', '727626BIT301', '727626BIT304', '727626BIT307', '727626BIT308', '727626BIT309', '727626BIT312'
            ]
        },
        {
            'section': 'B',
            'cc': 'Ms.S.Soundariya',
            'mentors': ['Ms.P.Rajeswari', 'Ms.T.Yawanikha', 'Ms.S.Soundariya'],
            'rolls': [
                '727625BIT061', '727625BIT062', '727625BIT063', '727625BIT064', '727625BIT065', '727625BIT066', '727625BIT067', '727625BIT068', '727625BIT069', '727625BIT070', '727625BIT071', '727625BIT072', '727625BIT073', '727625BIT074', '727625BIT075', '727625BIT076', '727625BIT077', '727625BIT078', '727625BIT079', '727625BIT080', '727625BIT081', '727625BIT082', '727625BIT083', '727625BIT084', '727625BIT085', '727625BIT086', '727625BIT087', '727625BIT088', '727625BIT089', '727625BIT090', '727625BIT091', '727625BIT092', '727625BIT093', '727625BIT094', '727625BIT095', '727625BIT096', '727625BIT097', '727625BIT098', '727625BIT099', '727625BIT100', '727625BIT101', '727625BIT102', '727625BIT103', '727625BIT104', '727625BIT105', '727625BIT106', '727625BIT107', '727625BIT108', '727625BIT109', '727625BIT110', '727625BIT111', '727625BIT112', '727625BIT113', '727625BIT114', '727625BIT115', '727625BIT116', '727625BIT117', '727625BIT118', '727625BIT119', '727625BIT120', '727625BIT121', '727625BIT122', '727625BIT123', '727625BIT124', '727626BIT302', '727626BIT305'
            ]
        },
        {
            'section': 'C',
            'cc': 'Ms.K.S.Sudhishna',
            'mentors': ['Dr.C.Jeevanantham', 'Mr.M.Sivakumar', 'Ms.K.S.Sudhishna'],
            'rolls': [
                '727625BIT125', '727625BIT126', '727625BIT127', '727625BIT128', '727625BIT129', '727625BIT130', '727625BIT131', '727625BIT132', '727625BIT133', '727625BIT134', '727625BIT135', '727625BIT136', '727625BIT137', '727625BIT138', '727625BIT139', '727625BIT140', '727625BIT141', '727625BIT142', '727625BIT143', '727625BIT144', '727625BIT145', '727625BIT146', '727625BIT147', '727625BIT148', '727625BIT149', '727625BIT150', '727625BIT151', '727625BIT152', '727625BIT153', '727625BIT154', '727625BIT155', '727625BIT156', '727625BIT157', '727625BIT158', '727625BIT159', '727625BIT160', '727625BIT161', '727625BIT162', '727625BIT163', '727625BIT164', '727625BIT165', '727625BIT166', '727625BIT167', '727625BIT168', '727625BIT169', '727625BIT170', '727625BIT171', '727625BIT172', '727625BIT173', '727625BIT174', '727625BIT175', '727625BIT176', '727625BIT177', '727625BIT178', '727625BIT179', '727625BIT180', '727625BIT181', '727625BIT182', '727625BIT183', '727625BIT184', '727625BIT185', '727625BIT186', '727625BIT187', '727625BIT188', '727625BIT189', '727626BIT303', '727626BIT306'
            ]
        }
    ]

    for item in data:
        sec, _ = Section.objects.get_or_create(name=item['section'])
        
        # Create Staff for CC
        cc_staff = create_staff(item['cc'])
        
        # Create Staff for Mentors
        mentor_staffs = [create_staff(m) for m in item['mentors']]
        
        # Create StudentClass
        student_class, _ = StudentClass.objects.get_or_create(year=year_ii, section=sec)
        student_class.class_coordinator = cc_staff
        student_class.allowed_roll_numbers = ','.join(item['rolls'])
        student_class.save()
        
        for m in mentor_staffs:
            student_class.mentors.add(m)
            
        print(f"Set up {student_class}")
        
        # Create Students
        rolls = item['rolls']
        total_rolls = len(rolls)
        num_mentors = len(mentor_staffs)
        chunk_size = math.ceil(total_rolls / num_mentors) if num_mentors > 0 else total_rolls
        
        for i, roll in enumerate(rolls):
            # assign mentor
            mentor_idx = min(i // chunk_size, num_mentors - 1) if num_mentors > 0 else None
            mentor = mentor_staffs[mentor_idx] if mentor_idx is not None else None
            
            user, created = User.objects.get_or_create(username=roll)
            if created:
                user.set_password('student@123')
                user.save()
            
            profile, p_created = StudentProfile.objects.get_or_create(user=user)
            profile.register_number = roll
            profile.official_email = f"{roll.lower()}@mcet.in"
            profile.student_class = student_class
            profile.mentor = mentor
            profile.save()
            
        print(f"Created/Updated {total_rolls} students in section {item['section']}")
        
    print("Database population complete!")

if __name__ == '__main__':
    populate()
