import os
from flask import Flask, send_from_directory, jsonify, Response, request
from flask_cors import CORS
from config import Config
from api.checker.routes import checker_bp
from api.products.routes import products_bp

def create_app():
    static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
    app = Flask(__name__, static_folder=static_dir, static_url_path='')
    
    app.config.from_object(Config)
    
    # Enable CORS for frontend requests
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register API Blueprints
    app.register_blueprint(checker_bp, url_prefix='/api/v1/checker')
    app.register_blueprint(checker_bp, url_prefix='/api/check', name='checker_legacy')
    app.register_blueprint(products_bp, url_prefix='/api/v1/products')

    @app.after_request
    def add_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        return response

    @app.route('/favicon.ico')
    def favicon():
        svg_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>'
        return Response(svg_icon, mimetype='image/svg+xml')

    @app.route('/sitemap.xml')
    def sitemap():
        sitemap_path = os.path.join(os.path.dirname(__file__), 'sitemap.xml')
        if os.path.exists(sitemap_path):
            with open(sitemap_path, 'r', encoding='utf-8') as f:
                return Response(f.read(), mimetype='application/xml')
        return Response("Not found", status=404)

    @app.route('/robots.txt')
    def robots():
        robots_path = os.path.join(os.path.dirname(__file__), 'robots.txt')
        if os.path.exists(robots_path):
            with open(robots_path, 'r', encoding='utf-8') as f:
                return Response(f.read(), mimetype='text/plain')
        return Response("Not found", status=404)

    @app.route('/')
    def serve_root():
        index_path = os.path.join(app.static_folder, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, 'index.html'), 200
        return jsonify({"message": "ShopApp Labs Backend API is Running", "version": "2.0"}), 200

    # Catch 404 for SPA Client Routes and serve index.html with HTTP status 200
    @app.errorhandler(404)
    def handle_spa_fallback(e):
        if request.path.startswith('/api/'):
            return jsonify({"error": "API route not found"}), 404
        index_path = os.path.join(app.static_folder, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, 'index.html'), 200
        return jsonify({"message": "ShopApp Labs Backend API is Running", "version": "2.0"}), 200

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
