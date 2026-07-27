import sys
import os

# Ensure current working directory and sys.path contain the app folder
cwd = os.path.dirname(__file__)
if cwd not in sys.path:
    sys.path.insert(0, cwd)
os.chdir(cwd)

try:
    from app import app as application
except Exception as e:
    # Diagnostic fallback so cPanel displays the exact Python error instead of silent 500
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"Python WSGI Startup Error:\n\n{str(e)}\n\nPlease run 'pip install -r requirements.txt' in cPanel Setup Python App.".encode('utf-8')
        response_headers = [('Content-type', 'text/plain; charset=utf-8'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]

