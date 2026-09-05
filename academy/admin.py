from django.contrib import admin
from .models import Staff, StudentClass, AcademicYear, Section, StudentProfile, ResearchPaper, GalleryEvent, EventImage

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('staff_id', 'name', 'designation')
    search_fields = ('staff_id', 'name')

@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(StudentClass)
class StudentClassAdmin(admin.ModelAdmin):
    list_display = ('year', 'section', 'class_coordinator')
    list_filter = ('year', 'section')
    filter_horizontal = ('mentors',)

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'register_number', 'name', 'student_class', 'mentor')
    search_fields = ('user__username', 'register_number', 'name')
    list_filter = ('student_class', 'mentor')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj and obj.student_class:
            form.base_fields['mentor'].queryset = obj.student_class.mentors.all()
        return form

@admin.register(ResearchPaper)
class ResearchPaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'primary_author', 'journal', 'year', 'status', 'featured')
    list_editable = ('featured',)
    search_fields = ('title', 'primary_author', 'journal', 'keywords')
    list_filter = ('status', 'author_type', 'domain', 'year', 'featured')

class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 3

@admin.register(GalleryEvent)
class GalleryEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'event_type', 'date')
    list_filter = ('event_type', 'date')
    search_fields = ('name', 'event_type')
    inlines = [EventImageInline]
