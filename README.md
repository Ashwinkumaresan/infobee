# Infobee IT Association - Backend

This is the backend server for the Infobee IT Association platform. It is built using **Python**, **Django**, and **Django REST Framework (DRF)**.

## Prerequisites
- Python 3.8+ 
- pip (Python package installer)

## Local Development Setup

Follow these steps to set up the project locally on your machine.

### 1. Create a Virtual Environment
It is highly recommended to use a virtual environment to isolate the project dependencies.
```bash
python -m venv venv
```

### 2. Activate the Virtual Environment
- **Mac / Linux:**
  ```bash
  source venv/bin/activate
  ```
- **Windows:**
  ```bash
  venv\Scripts\activate
  ```

### 3. Install Dependencies
Install all required packages from `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the root of the `Server` directory (same level as `manage.py`) and add the following required environment variables for email functionality to work:
```ini
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
COMMON_EMAILS=email1@example.com,email2@example.com
```

### 5. Initialize the Database
Instead of running manual migrations, we have provided a script that sets up the database and prepopulates it with the initial data.
```bash
python setup_db.py
```
*(This script automatically runs `manage.py migrate` and loads `initial_data.json` so you have a fully working database instantly!)*

### 6. Run the Development Server
Start the local server:
```bash
python manage.py runserver
```
The backend API will now be running at `http://127.0.0.1:8000/`.

---

## Production Deployment (cPanel / Shared Hosting)

This project is configured to use **WhiteNoise** for serving static files efficiently in production. When deploying to a production server like cPanel:

1. Upload the files (excluding `.env`, `venv`, `db.sqlite3`, `__pycache__`).
2. Re-create your `.env` file securely on the server.
3. Install dependencies: `pip install -r requirements.txt`.
4. Apply migrations: `python manage.py migrate`.
5. **Collect Static Files** to generate the admin panel CSS:
   ```bash
   python manage.py collectstatic
   ```
6. Restart your Python app via the cPanel dashboard.
