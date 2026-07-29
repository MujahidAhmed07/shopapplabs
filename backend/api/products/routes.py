from flask import Blueprint, jsonify

products_bp = Blueprint('products', __name__)

@products_bp.route('/list', methods=['GET'])
def list_products():
    """Future endpoint to list products/services sold by ShopApp Labs."""
    return jsonify({
        "products": [
            {
                "id": "username-checker-pro",
                "name": "Username Checker Pro",
                "tagline": "Real-time handle availability checker for 100+ platforms & TLDs",
                "status": "active",
                "type": "saas_tool"
            }
        ]
    })
