import sys
import os
import traceback

cwd = os.path.dirname(__file__)
if cwd not in sys.path:
    sys.path.insert(0, cwd)
os.chdir(cwd)

try:
    from app import app as application
except Exception as e:
    tb = traceback.format_exc()

    # Write full traceback to a log file for debugging
    try:
        with open(os.path.join(cwd, 'wsgi_error.log'), 'w') as f:
            f.write(tb)
    except Exception:
        pass

    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"Python WSGI Startup Error:\n\n{tb}\n\nPlease run 'pip install -r requirements.txt' in cPanel Setup Python App.".encode('utf-8')
        response_headers = [('Content-type', 'text/plain; charset=utf-8'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]