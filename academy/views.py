from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import StudentProfile, Staff, OTPVerification, GalleryEvent
from .serializers import StudentProfileSerializer, StaffSerializer, GalleryEventSerializer

from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # We need to distinguish between user not found and wrong password
        username_field = User.USERNAME_FIELD
        username = attrs.get(username_field)
        password = attrs.get("password")

        user = User.objects.filter(**{username_field: username}).first()
        if not user:
            from rest_framework.exceptions import AuthenticationFailed
            raise AuthenticationFailed('College mail not found')
            
        if not user.check_password(password):
            from rest_framework.exceptions import AuthenticationFailed
            raise AuthenticationFailed('Invalid Password')

        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class StaffProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.staff_profile
            serializer = StaffSerializer(profile)
            
            # Fetch requested papers (under_review) for this staff
            # Get all students for this staff
            mentored_roll_nos = list(profile.mentored_students.exclude(register_number='').values_list('register_number', flat=True))
            cc_roll_nos = []
            for c in profile.coordinated_classes.all():
                cc_roll_nos.extend(list(c.students.exclude(register_number='').values_list('register_number', flat=True)))
            
            all_roll_nos = set(mentored_roll_nos + cc_roll_nos)
            
            from .models import ResearchPaper
            from .serializers import ResearchPaperSerializer
            from django.db.models import Q

            query = Q(authors_list__icontains=profile.staff_id)
            for roll_no in all_roll_nos:
                if roll_no:
                    query = query | Q(authors_list__icontains=roll_no)
                
            papers = ResearchPaper.objects.filter(query, status='under_review').distinct()
            requested_papers = ResearchPaperSerializer(papers, many=True, context={'request': request}).data

            data = serializer.data
            data['requested_papers'] = requested_papers

            return Response(data)
        except Exception as e:
            return Response({"detail": str(e)}, status=404)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.student_profile
            serializer = StudentProfileSerializer(profile, context={'request': request})
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profile not found for this user."}, status=404)

class CurrentUserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = "unknown"
        if hasattr(user, 'student_profile'):
            role = "student"
        elif hasattr(user, 'staff_profile'):
            role = "staff"
        return Response({"role": role})

import requests

class StudentStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

        stats = {
            "github_repos": "N/A",
            "leetcode_solved": "N/A",
            "hackerrank_badges": "N/A",
            "hackerearth_count": "N/A"
        }
        
        headers = {'User-Agent': 'Mozilla/5.0'}
        
        def extract_username(val):
            if not val: return ""
            return val.strip().strip("/").split("/")[-1]

        github_user = extract_username(profile.github_id)
        leetcode_user = extract_username(profile.leetcode_id)
        hackerrank_user = extract_username(profile.hackerrank_id)

        # GitHub
        if github_user:
            try:
                res = requests.get(f"https://api.github.com/users/{github_user}", timeout=5)
                if res.status_code == 200:
                    stats["github_repos"] = res.json().get("public_repos", 0)
            except Exception:
                pass

        # LeetCode
        if leetcode_user:
            try:
                query = """
                query getUserProfile($username: String!) { 
                  matchedUser(username: $username) { 
                    submitStats { acSubmissionNum { count } } 
                  } 
                }
                """
                res = requests.post(
                    "https://leetcode.com/graphql", 
                    json={"query": query, "variables": {"username": leetcode_user}},
                    timeout=5
                )
                if res.status_code == 200:
                    data = res.json()
                    # acSubmissionNum is a list of dicts. The first one is "All" difficulty.
                    count = data['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count']
                    stats["leetcode_solved"] = count
            except Exception:
                pass

        # HackerRank
        if hackerrank_user:
            try:
                res = requests.get(
                    f"https://www.hackerrank.com/rest/hackers/{hackerrank_user}/badges", 
                    headers=headers, 
                    timeout=5
                )
                if res.status_code == 200:
                    data = res.json()
                    models = data.get("models", [])
                    stats["hackerrank_badges"] = len(models)
            except Exception:
                pass

        return Response(stats)

from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ResearchPaper
from .serializers import ResearchPaperSerializer

class ResearchPaperListCreateView(generics.ListCreateAPIView):
    serializer_class = ResearchPaperSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        return ResearchPaper.objects.exclude(status='under_review').order_by('-year', '-created_at')

    def perform_create(self, serializer):
        paper = serializer.save(status='under_review')
        
        # Send email notification
        try:
            from django.core.mail import EmailMultiAlternatives
            from django.utils.html import strip_tags
            from django.conf import settings
            
            recipients = set()
            if paper.author_email:
                recipients.add(paper.author_email)
            
            for email in settings.COMMON_EMAILS:
                recipients.add(email)
            
            # Try to get mentor email if submitter is a student
            try:
                profile = self.request.user.student_profile
                if profile.mentor and profile.mentor.official_email:
                    recipients.add(profile.mentor.official_email)
            except Exception:
                pass # Not a student or no profile
                
            if recipients:
                html_content = f"""
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0c0b3; border-radius: 5px;">
                            <h2 style="color: #f46b24; border-bottom: 2px solid #e0c0b3; padding-bottom: 10px;">New Research Paper Submitted</h2>
                            <p><strong>Title:</strong> {paper.title}</p>
                            <p><strong>Primary Author:</strong> {paper.primary_author}</p>
                            <p><strong>Status:</strong> Under Review</p>
                            <p style="margin-top: 30px; font-size: 0.9em; color: #8d7166;">
                                This is an automated message from the Infobee IT Student Association portal.
                            </p>
                        </div>
                    </body>
                </html>
                """
                subject = f"Research Paper Submitted: {paper.title}"
                text_content = strip_tags(html_content)
                email = EmailMultiAlternatives(subject, text_content, getattr(settings, 'DEFAULT_FROM_EMAIL', 'drmcetit2025@gmail.com'), list(recipients))
                email.attach_alternative(html_content, "text/html")
                email.send(fail_silently=True)
        except Exception as e:
            print(f"Error sending research paper email: {e}")

class ResearchPaperDetailView(generics.RetrieveAPIView):
    queryset = ResearchPaper.objects.all()
    serializer_class = ResearchPaperSerializer
    permission_classes = [AllowAny]

from django.shortcuts import get_object_or_404
from rest_framework import status

class ToggleSavePaperView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)
        
        paper = get_object_or_404(ResearchPaper, pk=pk)
        if profile.saved_papers.filter(pk=pk).exists():
            profile.saved_papers.remove(paper)
            is_saved = False
        else:
            profile.saved_papers.add(paper)
            is_saved = True
            
        return Response({"is_saved": is_saved})

class ToggleCitePaperView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)
            
        paper = get_object_or_404(ResearchPaper, pk=pk)
        if profile.cited_papers.filter(pk=pk).exists():
            return Response({"is_cited": True, "detail": "Already cited", "citations": paper.citations})
        
        profile.cited_papers.add(paper)
        paper.citations += 1
        paper.save()
        return Response({"is_cited": True, "citations": paper.citations})

class AuthorPublicProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, roll_no):
        papers = ResearchPaper.objects.filter(
            Q(authors_list__icontains=roll_no)
        ).exclude(status='under_review').distinct()
        
        serializer = ResearchPaperSerializer(papers, many=True, context={'request': request})
        return Response({
            "roll_no": roll_no,
            "papers": serializer.data
        })

class ResearchPaperStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        if not hasattr(request.user, 'staff_profile'):
            return Response({"detail": "Permission denied. Only staff can update paper status."}, status=403)
            
        from django.shortcuts import get_object_or_404
        paper = get_object_or_404(ResearchPaper, pk=pk)
        
        status_value = request.data.get('status')
        if status_value not in dict(ResearchPaper.STATUS_CHOICES).keys():
            return Response({"detail": "Invalid status."}, status=400)
            
        paper.status = status_value
        paper.save()
        
        # Send email notification
        try:
            from django.core.mail import EmailMultiAlternatives
            from django.utils.html import strip_tags
            from django.conf import settings
            
            recipients = set()
            if paper.author_email:
                recipients.add(paper.author_email)
            
            for email in settings.COMMON_EMAILS:
                recipients.add(email)
            
            if recipients:
                # Format status nicely
                status_display = dict(ResearchPaper.STATUS_CHOICES).get(status_value, status_value)
                
                html_content = f"""
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0c0b3; border-radius: 5px;">
                            <h2 style="color: #f46b24; border-bottom: 2px solid #e0c0b3; padding-bottom: 10px;">Research Paper Status Updated</h2>
                            <p><strong>Title:</strong> {paper.title}</p>
                            <p><strong>Primary Author:</strong> {paper.primary_author}</p>
                            <p><strong>New Status:</strong> <span style="font-weight: bold; color: #f46b24;">{status_display}</span></p>
                            <p style="margin-top: 30px; font-size: 0.9em; color: #8d7166;">
                                This is an automated message from the Infobee IT Student Association portal.
                            </p>
                        </div>
                    </body>
                </html>
                """
                subject = f"Research Paper Status Update: {paper.title}"
                text_content = strip_tags(html_content)
                email = EmailMultiAlternatives(subject, text_content, getattr(settings, 'DEFAULT_FROM_EMAIL', 'drmcetit2025@gmail.com'), list(recipients))
                email.attach_alternative(html_content, "text/html")
                email.send(fail_silently=True)
        except Exception as e:
            print(f"Error sending research paper status email: {e}")
            
        return Response({"detail": f"Paper status updated to {status_value}.", "status": status_value})

class StaffStudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, roll_no):
        if not hasattr(request.user, 'staff_profile'):
            return Response({"detail": "Permission denied. Only staff can access this endpoint."}, status=403)
            
        from django.shortcuts import get_object_or_404
        profile = get_object_or_404(StudentProfile, register_number=roll_no)
        from .serializers import StudentProfileSerializer
        serializer = StudentProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

class StaffStudentStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, roll_no):
        if not hasattr(request.user, 'staff_profile'):
            return Response({"detail": "Permission denied."}, status=403)
            
        from django.shortcuts import get_object_or_404
        profile = get_object_or_404(StudentProfile, register_number=roll_no)
        
        stats = {
            "github_repos": "N/A",
            "leetcode_solved": "N/A",
            "hackerrank_badges": "N/A",
            "hackerearth_count": "N/A"
        }
        
        headers = {'User-Agent': 'Mozilla/5.0'}
        
        def extract_username(val):
            if not val: return ""
            return val.strip().strip("/").split("/")[-1]

        github_user = extract_username(profile.github_id)
        leetcode_user = extract_username(profile.leetcode_id)
        hackerrank_user = extract_username(profile.hackerrank_id)

        # GitHub
        if github_user:
            try:
                res = requests.get(f"https://api.github.com/users/{github_user}", timeout=5)
                if res.status_code == 200:
                    stats["github_repos"] = res.json().get("public_repos", 0)
            except Exception:
                pass

        # LeetCode
        if leetcode_user:
            try:
                query = """
                query getUserProfile($username: String!) { 
                  matchedUser(username: $username) { 
                    submitStats { acSubmissionNum { count } } 
                  } 
                }
                """
                res = requests.post(
                    "https://leetcode.com/graphql", 
                    json={'query': query, 'variables': {'username': leetcode_user}},
                    headers=headers, timeout=5
                )
                if res.status_code == 200:
                    data = res.json()
                    submissions = data.get("data", {}).get("matchedUser", {}).get("submitStats", {}).get("acSubmissionNum", [])
                    if submissions:
                        stats["leetcode_solved"] = submissions[0].get("count", 0)
            except Exception:
                pass

        # HackerRank
        if hackerrank_user:
            try:
                res = requests.get(
                    f"https://www.hackerrank.com/rest/hackers/{hackerrank_user}/badges",
                    headers=headers, timeout=5
                )
                if res.status_code == 200:
                    models = res.json().get("models", [])
                    stats["hackerrank_badges"] = len(models)
            except Exception:
                pass
                
        # HackerEarth
        hackerearth_user = extract_username(profile.hackerearth_id)
        if hackerearth_user:
            try:
                res = requests.get(
                    f"https://www.hackerearth.com/@{hackerearth_user}/",
                    headers=headers, timeout=5
                )
                if res.status_code == 200:
                    from bs4 import BeautifulSoup
                    soup = BeautifulSoup(res.text, 'html.parser')
                    problems_solved = soup.find('div', class_='problems-solved')
                    if problems_solved:
                        count = problems_solved.find('span', class_='weight-700')
                        if count:
                            stats["hackerearth_count"] = count.text.strip()
            except Exception:
                pass

        return Response(stats)

class ExportStudentDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, 'staff_profile'):
            return Response({"detail": "Permission denied."}, status=403)
            
        students = StudentProfile.objects.all().order_by('register_number')
        student_list = [{"register_number": s.register_number, "name": s.name} for s in students]
        
        columns = []
        for field in StudentProfile._meta.get_fields():
            if field.name in ['id', 'user']:
                continue
            if field.auto_created and not field.concrete and not field.many_to_many:
                continue
            label = getattr(field, 'verbose_name', field.name)
            if hasattr(label, 'title'):
                label = label.title()
            columns.append({"id": field.name, "label": label})
        
        return Response({"students": student_list, "columns": columns})

    def post(self, request):
        if not hasattr(request.user, 'staff_profile'):
            return Response({"detail": "Permission denied."}, status=403)
            
        data = request.data
        target = data.get("target", "all")
        selected_students = data.get("selected_students", [])
        selected_columns = data.get("selected_columns", [])
        
        if not selected_columns:
            return Response({"detail": "No columns selected."}, status=400)
            
        queryset = StudentProfile.objects.all()
        
        if target == "mentees":
            queryset = queryset.filter(mentor=request.user.staff_profile)
        elif target == "specific":
            queryset = queryset.filter(register_number__in=selected_students)
        elif target == "range":
            start_roll = data.get("start_roll")
            end_roll = data.get("end_roll")
            if start_roll and end_roll:
                queryset = queryset.filter(register_number__gte=start_roll, register_number__lte=end_roll)
            
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="students_export.csv"'},
        )
        
        writer = csv.writer(response)
        writer.writerow(selected_columns)
        
        for student in queryset:
            row = []
            for col in selected_columns:
                if col == "resume_file":
                    if student.resume_file:
                        row.append(request.build_absolute_uri(student.resume_file.url))
                    else:
                        row.append("")
                    continue
                
                val = getattr(student, col, "")
                if hasattr(val, 'all'): # ManyToMany fields (like saved_papers)
                    val = ", ".join([str(v) for v in val.all()])
                row.append(str(val))
            writer.writerow(row)
            
        return response

from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings

class RequestProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Student profile not found."}, status=403)
            
        message = request.data.get('message', '')
        if not message:
            return Response({"detail": "Message is required."}, status=400)
            
        student_email = profile.official_email
        if not student_email:
            return Response({"detail": "Official email not set in profile."}, status=400)
            
        recipients = [student_email] + settings.COMMON_EMAILS
        
        class_info = "N/A"
        if profile.student_class and profile.student_class.year and profile.student_class.section:
            class_info = f"{profile.student_class.year.name} - {profile.student_class.section.name}"
            
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0c0b3; border-radius: 5px;">
                    <h2 style="color: #f46b24; border-bottom: 2px solid #e0c0b3; padding-bottom: 10px;">Profile Update Request</h2>
                    <p><strong>Student Name:</strong> {profile.name}</p>
                    <p><strong>Register Number:</strong> {profile.register_number}</p>
                    <p><strong>Class:</strong> {class_info}</p>
                    <h3 style="margin-top: 20px; color: #1b1c1c;">Requested Updates:</h3>
                    <div style="background-color: #fbf9f8; padding: 15px; border-left: 4px solid #f46b24; white-space: pre-wrap;">{message}</div>
                    <p style="margin-top: 30px; font-size: 0.9em; color: #8d7166;">
                        This is an automated message from the Infobee IT Student Association portal.
                    </p>
                </div>
            </body>
        </html>
        """
        
        subject = f"Profile Update Request - {profile.register_number}"
        text_content = strip_tags(html_content)
        
        try:
            email = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, recipients)
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)
            return Response({"detail": "Update request sent successfully."})
        except Exception as e:
            return Response({"detail": f"Failed to send email: {str(e)}"}, status=500)

import random
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import OTPVerification

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email is required."}, status=400)
            
        # Check if email exists in StudentProfile or StaffProfile
        student = StudentProfile.objects.filter(official_email=email).first()
        staff = Staff.objects.filter(college_email=email).first()
        
        if not student and not staff:
            return Response({"detail": "No account found with this official email."}, status=404)
            
        # Generate 4-digit OTP
        otp = str(random.randint(1000, 9999))
        
        # Save OTP to database
        OTPVerification.objects.create(email=email, otp=otp)
        
        # Send Email
        try:
            from django.core.mail import EmailMultiAlternatives
            from django.utils.html import strip_tags
            from django.conf import settings
            
            recipients = [email] + settings.COMMON_EMAILS
            
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0c0b3; border-radius: 5px;">
                        <h2 style="color: #f46b24; border-bottom: 2px solid #e0c0b3; padding-bottom: 10px;">Password Reset OTP</h2>
                        <p>We received a request to reset your password for the Infobee IT Student Association portal.</p>
                        <p>Your 4-digit OTP is:</p>
                        
                        <div style="margin: 20px 0; text-align: center;">
                            <span style="display: inline-block; padding: 15px 30px; background-color: #fbf9f8; color: #f46b24; font-size: 36px; font-weight: bold; letter-spacing: 12px; border-radius: 8px; border: 2px dashed #f46b24; user-select: all; -webkit-user-select: all; cursor: pointer;">
                                {otp}
                            </span>
                        </div>
                        <p style="text-align: center; color: #8d7166; font-size: 0.85em; margin-bottom: 30px; margin-top: -10px;">(Double-click or long-press the number above to copy it)</p>
                        
                        <p>This OTP is valid for 10 minutes. Please do not share this with anyone.</p>
                        <p style="margin-top: 30px; font-size: 0.9em; color: #8d7166;">
                            This is an automated message. If you did not request this, please ignore this email.
                        </p>
                    </div>
                </body>
            </html>
            """
            subject = "Infobee Portal: Password Reset OTP"
            text_content = strip_tags(html_content)
            email_msg = EmailMultiAlternatives(subject, text_content, getattr(settings, 'DEFAULT_FROM_EMAIL', 'drmcetit2025@gmail.com'), recipients)
            email_msg.attach_alternative(html_content, "text/html")
            email_msg.send(fail_silently=True)
            
            return Response({"detail": "OTP sent successfully."})
        except Exception as e:
            print(f"Error sending OTP email: {e}")
            return Response({"detail": "Failed to send email. Please try again later."}, status=500)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        
        if not email or not otp:
            return Response({"detail": "Email and OTP are required."}, status=400)
            
        otp_record = OTPVerification.objects.filter(email=email).order_by('-created_at').first()
        
        if not otp_record:
            return Response({"detail": "No OTP requested for this email."}, status=400)
            
        if not otp_record.is_valid():
            return Response({"detail": "OTP has expired. Please request a new one."}, status=400)
            
        if otp_record.otp != otp:
            return Response({"detail": "Invalid OTP."}, status=400)
            
        otp_record.is_verified = True
        otp_record.save()
        
        return Response({"detail": "OTP verified successfully."})

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response({"detail": "Email and new password are required."}, status=400)
            
        otp_record = OTPVerification.objects.filter(email=email).order_by('-created_at').first()
        
        if not otp_record or not otp_record.is_verified:
            return Response({"detail": "Email not verified. Please complete OTP verification first."}, status=403)
            
        student = StudentProfile.objects.filter(official_email=email).first()
        staff = Staff.objects.filter(college_email=email).first()
        
        user = None
        if student:
            user = student.user
        elif staff:
            user = staff.user
            
        if not user:
            return Response({"detail": "User not found."}, status=404)
            
        user.set_password(password)
        user.save()
        
        # Optionally, delete all OTPs for this email so they can't be reused
        OTPVerification.objects.filter(email=email).delete()
        
        return Response({"detail": "Password reset successfully."})

class GalleryEventListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        events = GalleryEvent.objects.all()
        serializer = GalleryEventSerializer(events, many=True)
        return Response(serializer.data)
