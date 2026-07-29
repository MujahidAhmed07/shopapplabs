import sys
import os

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import Flask app — Passenger requires the variable to be named 'application'
from app import app as application