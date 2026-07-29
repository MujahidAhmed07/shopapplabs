import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'shopapplabs-secret-key-2026')
    JSON_SORT_KEYS = False
