import os
import django
from django.core.management import call_command

def setup_database():
    print("🚀 Setting up the Infobee database...")
    
    # Configure Django environment
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')
    django.setup()

    print("\n📦 1. Running database migrations...")
    call_command("migrate")
    print("✅ Migrations complete.")
    
    print("\n📥 2. Loading initial data fixture...")
    fixture_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'initial_data.json')
    
    if not os.path.exists(fixture_path):
        print(f"❌ Error: Could not find '{fixture_path}'. Make sure it's in the same directory.")
        return

    try:
        call_command("loaddata", fixture_path)
        print("✅ Initial data loaded successfully!")
        print("\n🎉 Database setup is complete! You now have the exact same data as the original project.")
    except Exception as e:
        print(f"\n❌ Error loading initial data: {e}")

if __name__ == '__main__':
    setup_database()
