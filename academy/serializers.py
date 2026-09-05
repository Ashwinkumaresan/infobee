from rest_framework import serializers
from .models import StudentProfile, StudentClass, ResearchPaper, Staff, GalleryEvent, EventImage
from django.db.models import Q

class StudentClassSerializer(serializers.ModelSerializer):
    year_name = serializers.CharField(source='year.name', read_only=True)
    section_name = serializers.CharField(source='section.name', read_only=True)
    class_coordinator_name = serializers.CharField(source='class_coordinator.name', read_only=True)

    class Meta:
        model = StudentClass
        fields = ['id', 'year_name', 'section_name', 'class_coordinator_name']

class StaffSerializer(serializers.ModelSerializer):
    cc_details = serializers.SerializerMethodField()
    mentor_details = serializers.SerializerMethodField()

    class Meta:
        model = Staff
        fields = '__all__'

    def get_cc_details(self, obj):
        classes = obj.coordinated_classes.all()
        details = []
        for c in classes:
            student_count = c.students.count()
            students_qs = c.students.exclude(register_number='')
            roll_nos = list(students_qs.values_list('register_number', flat=True))
            paper_count = 0
            if roll_nos:
                paper_count = ResearchPaper.objects.filter(primary_author__in=roll_nos).count()
            
            students_list = []
            for s in students_qs:
                students_list.append({
                    "id": s.id,
                    "register_number": s.register_number,
                    "name": s.name,
                    "email": s.official_email or s.personal_email
                })

            details.append({
                "year_name": c.year.name if c.year else "",
                "section_name": c.section.name if c.section else "",
                "student_count": student_count,
                "paper_count": paper_count,
                "students": students_list
            })
        return details

    def get_mentor_details(self, obj):
        students = obj.mentored_students.exclude(register_number='')
        student_count = students.count()
        roll_nos = list(students.values_list('register_number', flat=True))
        query = Q(authors_list__icontains=obj.staff_id)
        if roll_nos:
            query = query | Q(primary_author__in=roll_nos)
            
        paper_count = ResearchPaper.objects.filter(query).count()
        
        students_list = []
        for s in students:
            students_list.append({
                "id": s.id,
                "register_number": s.register_number,
                "name": s.name,
                "email": s.official_email or s.personal_email
            })

        return {
            "student_count": student_count,
            "paper_count": paper_count,
            "students": students_list
        }

class ResearchPaperSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    keywords = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    is_cited = serializers.SerializerMethodField()
    can_approve = serializers.SerializerMethodField()

    class Meta:
        model = ResearchPaper
        fields = '__all__'

    def get_authors(self, obj):
        if obj.authors_list and isinstance(obj.authors_list, list) and len(obj.authors_list) > 0:
            processed = []
            for author in obj.authors_list:
                a_type = author.get('type')
                desc = f"{a_type}, Department of IT"
                profile_id = None
                
                if a_type == 'Student':
                    roll_no = author.get('roll_no')
                    if roll_no:
                        try:
                            sp = StudentProfile.objects.get(register_number=roll_no)
                            year_name = sp.student_class.year.name if sp.student_class and sp.student_class.year else 'Unknown'
                            desc = f"Student, {year_name} year, Department of IT"
                            profile_id = sp.id
                        except StudentProfile.DoesNotExist:
                            pass
                elif a_type == 'Faculty':
                    staff_id = author.get('roll_no')
                    if staff_id:
                        try:
                            from .models import Staff
                            staff = Staff.objects.get(staff_id=staff_id)
                            desc = f"Faculty, {staff.designation}, Department of IT"
                            profile_id = staff.id
                        except Exception:
                            pass
                
                processed.append({
                    'name': author.get('name'),
                    'email': author.get('email'),
                    'roll_no': author.get('roll_no'),
                    'description': desc,
                    'type': a_type,
                    'profile_id': profile_id
                })
            return processed

        # Fallback for old data
        auths = [obj.primary_author]
        if obj.co_authors:
            auths.extend([a.strip() for a in obj.co_authors.split(',') if a.strip()])
        
        return [{'name': name, 'description': f"{obj.author_type}, Department of IT", 'type': obj.author_type} for name in auths]

    def get_keywords(self, obj):
        if obj.keywords:
            return [k.strip() for k in obj.keywords.split(',') if k.strip()]
        return []

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                return request.user.student_profile.saved_papers.filter(id=obj.id).exists()
            except:
                pass
        return False

    def get_is_cited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                return request.user.student_profile.cited_papers.filter(id=obj.id).exists()
            except:
                pass
        return False

    def get_can_approve(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                profile = request.user.staff_profile
                mentored_roll_nos = list(profile.mentored_students.exclude(register_number='').values_list('register_number', flat=True))
                cc_roll_nos = []
                for c in profile.coordinated_classes.all():
                    cc_roll_nos.extend(list(c.students.exclude(register_number='').values_list('register_number', flat=True)))
                all_roll_nos = set(mentored_roll_nos + cc_roll_nos)
                if obj.authors_list:
                    for author in obj.authors_list:
                        roll_no = author.get('roll_no')
                        if roll_no in all_roll_nos:
                            return True
            except:
                pass
        return False

class StudentProfileSerializer(serializers.ModelSerializer):
    student_class_details = StudentClassSerializer(source='student_class', read_only=True)
    mentor_name = serializers.CharField(source='mentor.name', read_only=True)
    saved_papers = ResearchPaperSerializer(many=True, read_only=True)
    cited_papers = ResearchPaperSerializer(many=True, read_only=True)
    authored_papers = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = '__all__'

    def get_authored_papers(self, obj):
        if not obj.name and not getattr(obj, 'register_number', None):
            return []
        query = Q()
        if obj.name:
            query = Q(primary_author__icontains=obj.name) | Q(co_authors__icontains=obj.name)
        if getattr(obj, 'register_number', None):
            query = query | Q(authors_list__icontains=obj.register_number)
        
        papers = ResearchPaper.objects.filter(query).distinct()
        return ResearchPaperSerializer(papers, many=True, context=self.context).data

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image']

class GalleryEventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = GalleryEvent
        fields = ['id', 'name', 'event_type', 'date', 'description', 'images', 'created_at']
