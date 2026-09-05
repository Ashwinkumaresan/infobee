import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "App.settings")
django.setup()

from academy.models import ResearchPaper

ResearchPaper.objects.create(
    title="A Unified Machine Learning Framework and Efficient Pattern Mining for Dynamic Price prediction in E-Commerce",
    primary_author="Sumathi T.",
    author_email="sumathi.sae@gmail.com",
    co_authors="Ashwin K., Priyadharshini R., Rajeshwari L.",
    author_type="Faculty",
    authors_list=[
        {
            "name": "Sumathi T.",
            "email": "sumathi.sae@gmail.com",
            "roll_no": "ST001",
            "type": "Faculty"
        },
        {
            "name": "Ashwin K.",
            "email": "ashwin@example.com",
            "roll_no": "727623BIT001",
            "type": "Student"
        },
        {
            "name": "Priyadharshini R.",
            "email": "priya@example.com",
            "roll_no": "727623BIT002",
            "type": "Student"
        },
        {
            "name": "Rajeshwari L.",
            "email": "raji@example.com",
            "roll_no": "727623BIT003",
            "type": "Student"
        }
    ],
    journal="NCIIT 2025",
    publisher="Dr. Mahalingam College of Engineering and Technology",
    year=2025,
    domain="AI",
    citations=0,
    abstract="Dynamic pricing is essential for modern e-commerce platforms, allowing retailers to adjust product prices in response to market fluctuations, consumer preferences, competitor actions, and seasonal variations. Developing a comprehensive dynamic pricing system involves integrating multiple computational components, such as scalable data extraction, time-series preprocessing, pattern discovery, predictive modeling, elasticity analysis, and reinforcement learning-based decision-making.\nThis paper introduces a unified framework that merges machine learning, pattern mining, and reinforcement learning to enable real-time dynamic pricing in e-commerce settings. The system features: (i) an automated Selenium-based pipeline for daily price scraping, (ii) a reliable ETL workflow with data normalization and SQLite time-series storage, (iii) pattern detection based on volatility and change-point methods for analyzing product behavior, (iv) a CatBoost regression model tailored by category for forecasting next-day prices, (v) a hybrid elasticity estimation module employing simulated Bayesian priors to assess demand sensitivity, and (vi) a Thompson Sampling multi-armed bandit algorithm for selecting optimal prices under uncertainty.\nConducted experiments on a dataset of 1,246 products tracked over multiple days demonstrate forecasting errors ranging from 1.56% to 8.70% MAPE across categories, with the reinforcement learning agent showing effective revenue-focused convergence. Results confirm that combining elasticity insights with reinforcement learning enhances pricing strategy performance compared to static or purely machine learning approaches. The proposed architecture provides a scalable, production-ready solution for dynamic pricing in real-world online retail applications.",
    keywords="Dynamic pricing, machine learning, time-series forecasting, pattern mining, change-point detection, price elasticity, reinforcement learning, multi-armed bandits, Thompson Sampling, CatBoost, e-commerce analytics",
    status="published",
    featured=True
)
print("Paper inserted successfully.")
