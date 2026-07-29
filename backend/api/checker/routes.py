from flask import Blueprint, request, jsonify
import re
from .services import (
    clean_input_username, check_instagram, check_facebook, check_snapchat,
    check_tiktok, check_twitter, check_reddit, check_bluesky, check_discord,
    check_youtube, check_twitch, check_generic_profile, check_domain,
    GENERIC_PLATFORMS
)

checker_bp = Blueprint('checker', __name__)

@checker_bp.route('/<platform>', methods=['GET'])
@checker_bp.route('/check/<platform>', methods=['GET'])
def check_platform(platform):
    raw_username = request.args.get('username', '').strip()
    username = clean_input_username(raw_username)
    if not username:
        return jsonify({"error": "Username parameter is required"}), 400
    
    if not re.match(r'^[a-zA-Z0-9._\-]+$', username):
        return jsonify({"error": "Username contains invalid characters"}), 400

    if platform == 'instagram':
        res = check_instagram(username)
    elif platform == 'facebook':
        res = check_facebook(username)
    elif platform == 'snapchat':
        res = check_snapchat(username)
    elif platform == 'tiktok':
        res = check_tiktok(username)
    elif platform == 'twitter':
        res = check_twitter(username)
    elif platform == 'reddit':
        res = check_reddit(username)
    elif platform == 'bluesky':
        res = check_bluesky(username)
    elif platform == 'discord':
        res = check_discord(username)
    elif platform == 'youtube':
        res = check_youtube(username)
    elif platform == 'twitch':
        res = check_twitch(username)
    elif platform in GENERIC_PLATFORMS:
        res = check_generic_profile(username, GENERIC_PLATFORMS[platform], GENERIC_PLATFORMS[platform])
    elif platform.startswith('domain_'):
        tld = platform.split('_')[1]
        domain_name = f"{username}.{tld}"
        res = check_domain(domain_name)
    else:
        return jsonify({"error": f"Unknown platform: {platform}"}), 400
        
    return jsonify(res)
