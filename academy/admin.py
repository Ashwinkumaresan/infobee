from django.contrib import admin
from .models import Staff, StudentClass, AcademicYear, Section, StudentProfile, ResearchPaper, GalleryEvent, EventImage, HackathonRegistration, HackathonSettings

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

@admin.register(HackathonRegistration)
class HackathonRegistrationAdmin(admin.ModelAdmin):
    list_display = ('team_name', 'leader_name', 'leader_roll', 'scenario_allocated', 'is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner', 'is_confirmed')
    list_filter = ('scenario_allocated', 'is_confirmed', 'is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner', 'created_at')
    search_fields = ('team_name', 'leader_name', 'leader_roll')
    list_editable = ('is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner')

@admin.register(HackathonSettings)
class HackathonSettingsAdmin(admin.ModelAdmin):
    list_display = ('max_total_teams', 'is_registration_open', 'is_ppt_time_end')
    
    fieldsets = (
        ('Global Settings', {
            'fields': ('is_registration_open', 'is_ppt_time_end', 'max_total_teams', 'total_teams_registered')
        }),
        ('Scenario Capacity Limits', {
            'fields': (
                ('max_teams_scenario_1', 'scenario_1_registered'),
                ('max_teams_scenario_2', 'scenario_2_registered'),
                ('max_teams_scenario_3', 'scenario_3_registered'),
                ('max_teams_scenario_4', 'scenario_4_registered'),
                ('max_teams_scenario_5', 'scenario_5_registered'),
            )
        }),
    )

    readonly_fields = (
        'total_teams_registered',
        'scenario_1_registered',
        'scenario_2_registered',
        'scenario_3_registered',
        'scenario_4_registered',
        'scenario_5_registered',
    )

    def has_add_permission(self, request):
        # Prevent adding more than one settings object
        return not HackathonSettings.objects.exists()
