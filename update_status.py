import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "App.settings")
django.setup()

from academy.models import ResearchPaper

papers = ResearchPaper.objects.all()
for paper in papers:
    paper.status = 'unpublished'
    paper.save()

print("Paper status updated to 'unpublished'.")
