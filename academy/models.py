from django.db import models
from django.contrib.auth.models import User

class Staff(models.Model):
    staff_id = models.CharField(max_length=50, unique=True, verbose_name="Staff ID")
    name = models.CharField(max_length=255)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="staff_profile", null=True, blank=True)
    college_email = models.EmailField(max_length=255, null=True, blank=True)
    personal_email = models.EmailField(max_length=255, null=True, blank=True)
    designation = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.staff_id})"

class AcademicYear(models.Model):
    name = models.CharField(max_length=10, unique=True, help_text='e.g., "I", "II", "III", "IV"')

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length=10, unique=True, help_text='e.g., "A", "B", "C"')

    def __str__(self):
        return self.name

class StudentClass(models.Model):
    year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name="classes")
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="classes")
    class_coordinator = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, related_name="coordinated_classes")
    mentors = models.ManyToManyField(Staff, related_name="mentored_classes")
    allowed_roll_numbers = models.TextField(
        blank=True,
        help_text="Enter roll numbers separated by commas or newlines (e.g., 727623BIT001, 727623BIT002)"
    )

    def __str__(self):
        return f"{self.year} year IT {self.section}"

    class Meta:
        verbose_name_plural = "Student Classes"
        unique_together = ('year', 'section')



class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    student_class = models.ForeignKey(StudentClass, on_delete=models.SET_NULL, null=True, blank=True, related_name="students")
    mentor = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True, related_name="mentored_students")
    
    # 1. Personal Info
    register_number = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    mobile_number = models.CharField(max_length=20, blank=True)
    personal_email = models.EmailField(blank=True)
    official_email = models.EmailField(blank=True)
    
    # Parents & Address
    father_name = models.CharField(max_length=255, blank=True)
    father_occupation = models.CharField(max_length=255, blank=True)
    father_mobile = models.CharField(max_length=20, blank=True)
    mother_name = models.CharField(max_length=255, blank=True)
    mother_occupation = models.CharField(max_length=255, blank=True)
    mother_mobile = models.CharField(max_length=20, blank=True)
    native_location = models.CharField(max_length=255, blank=True)
    communication_address = models.TextField(blank=True)
    permanent_address = models.TextField(blank=True)
    
    # 2. Education History
    school_10th = models.CharField(max_length=255, blank=True)
    board_10th = models.CharField(max_length=255, blank=True)
    mark_10th = models.CharField(max_length=50, blank=True)
    percentage_10th = models.CharField(max_length=20, blank=True)
    school_12th = models.CharField(max_length=255, blank=True)
    board_12th = models.CharField(max_length=255, blank=True)
    mark_12th = models.CharField(max_length=50, blank=True)
    percentage_12th = models.CharField(max_length=20, blank=True)
    polytechnic_name = models.CharField(max_length=255, blank=True)
    polytechnic_dept = models.CharField(max_length=255, blank=True)
    diploma_percentage = models.CharField(max_length=20, blank=True)
    educational_gap = models.CharField(max_length=255, blank=True)
    
    # 3. Academic Performance
    sem1_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem2_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem3_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem4_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem5_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem6_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem7_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    sem8_sgpa = models.CharField(max_length=10, blank=True, default="N/A")
    cgpa = models.CharField(max_length=10, blank=True)
    current_arrears = models.CharField(max_length=10, blank=True, default="0")
    history_of_arrears = models.CharField(max_length=10, blank=True, default="0")
    
    # 4. Coding & Links
    linkedin_id = models.CharField(max_length=255, blank=True)
    github_id = models.CharField(max_length=255, blank=True)
    leetcode_id = models.CharField(max_length=255, blank=True)
    hackerrank_id = models.CharField(max_length=255, blank=True)
    hackerearth_id = models.CharField(max_length=255, blank=True)
    portfolio_link = models.URLField(blank=True, max_length=500)
    resume_file = models.FileField(upload_to='resumes/', null=True, blank=True)
    
    # 5. Research Papers
    saved_papers = models.ManyToManyField('ResearchPaper', related_name='saved_by', blank=True)
    cited_papers = models.ManyToManyField('ResearchPaper', related_name='cited_by', blank=True)

    def save(self, *args, **kwargs):
        if self.register_number:
            from .models import StudentClass
            classes = StudentClass.objects.all()
            for sc in classes:
                if sc.allowed_roll_numbers:
                    roll_nos = [r.strip() for r in sc.allowed_roll_numbers.replace('\n', ',').split(',') if r.strip()]
                    if self.register_number in roll_nos:
                        self.student_class = sc
                        break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} Profile"

class ResearchPaper(models.Model):
    AUTHOR_TYPES = (
        ('Faculty', 'Faculty'),
        ('Student', 'Student'),
    )
    STATUS_CHOICES = (
        ('under_review', 'Under Review'),
        ('published', 'Published'),
        ('unpublished', 'Unpublished'),
        ('rejected', 'Rejected'),
    )

    title = models.CharField(max_length=500)
    primary_author = models.CharField(max_length=255)
    author_email = models.EmailField(blank=True)
    co_authors = models.TextField(blank=True, help_text="Comma separated list of co-authors")
    author_type = models.CharField(max_length=20, choices=AUTHOR_TYPES, default='Student')
    
    authors_list = models.JSONField(default=list, blank=True, help_text="List of dicts: [{'name': '...', 'email': '...', 'roll_no': '...', 'type': 'Student|Faculty'}]")
    
    journal = models.CharField(max_length=255)
    publisher = models.CharField(max_length=255, blank=True)
    year = models.IntegerField(default=2025)
    domain = models.CharField(max_length=100)
    
    citations = models.IntegerField(default=0)
    abstract = models.TextField()
    doi = models.CharField(max_length=255, blank=True)
    pdf_url = models.URLField(max_length=500, blank=True)
    pdf_file = models.FileField(upload_to='research_papers/', null=True, blank=True)
    is_downloadable = models.BooleanField(default=False)
    keywords = models.TextField(blank=True, help_text="Comma separated keywords")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='under_review')
    featured = models.BooleanField(default=False)
    is_dark_featured = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.primary_author})"

class OTPVerification(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def is_valid(self):
        from django.utils import timezone
        from datetime import timedelta
        # 10 minute expiration
        return self.created_at >= timezone.now() - timedelta(minutes=10)

class GalleryEvent(models.Model):
    name = models.CharField(max_length=255)
    event_type = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.date}"

    class Meta:
        ordering = ['-date']

class EventImage(models.Model):
    event = models.ForeignKey(GalleryEvent, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='event_gallery/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.event.name}"
