from django.contrib import admin
from django.http import HttpResponse
import csv
from .models import Staff, StudentClass, AcademicYear, Section, StudentProfile, ResearchPaper, GalleryEvent, EventImage, HackathonRegistration, HackathonSettings

class ExportCsvMixin:
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        headers = []
        for field in meta.fields:
            if field.name == 'team_members':
                headers.extend(['Member 1 Name', 'Member 1 Roll', 'Member 2 Name', 'Member 2 Roll', 'Member 3 Name', 'Member 3 Roll'])
            else:
                headers.append(field.name)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(headers)
        for obj in queryset:
            row_data = []
            for field in meta.fields:
                val = getattr(obj, field.name)
                if field.name == 'team_members':
                    members = val if isinstance(val, list) else []
                    for i in range(3):
                        if i < len(members):
                            row_data.extend([members[i].get('name', ''), members[i].get('roll', '')])
                        else:
                            row_data.extend(['', ''])
                else:
                    # If the field is a file and has a truthy name (i.e. file exists)
                    if getattr(val, 'name', None) and hasattr(val, 'url'):
                        try:
                            row_data.append(request.build_absolute_uri(val.url))
                        except ValueError:
                            row_data.append(str(val))
                    else:
                        row_data.append(val)
            writer.writerow(row_data)

        return response
    export_as_csv.short_description = "Export selected to CSV"


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
class HackathonRegistrationAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('team_name', 'leader_name', 'leader_roll', 'scenario_allocated', 'is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner', 'is_confirmed')
    list_filter = ('scenario_allocated', 'is_confirmed', 'is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner', 'created_at')
    search_fields = ('team_name', 'leader_name', 'leader_roll')
    list_editable = ('is_round_1_selected', 'is_round_2_selected', 'is_round_3_selected', 'is_winner')
    actions = ['export_as_csv']

@admin.register(HackathonSettings)
class HackathonSettingsAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('max_total_teams', 'is_registration_open', 'is_ppt_time_end')
    actions = ['export_as_csv']
    
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
