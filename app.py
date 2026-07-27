from flask import Flask, request, jsonify, render_template
import urllib.request
import urllib.error
import requests
import json
import re
import socket
from concurrent.futures import ThreadPoolExecutor
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__, template_folder='templates')

# User-Agent list to rotate or mimic a modern browser
BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

GENERIC_PLATFORMS = {
    'about_me': 'https://about.me/{}',
    'blogger': 'https://{}.blogspot.com',
    'buymeacoffee': 'https://buymeacoff.ee/{}',
    'carrd': 'https://{}.carrd.co/',
    'cashapp': 'https://cash.app/${}',
    'chess': 'https://www.chess.com/member/{}',
    'docker_hub': 'https://hub.docker.com/u/{}/',
    'flickr': 'https://www.flickr.com/people/{}',
    'flipboard': 'https://flipboard.com/@{}',
    'goodreads': 'https://www.goodreads.com/{}',
    'gumroad': 'https://www.gumroad.com/{}',
    'itch_io': 'https://{}.itch.io/',
    'keybase': 'https://keybase.io/{}',
    'linktree': 'https://linktr.ee/{}',
    'livejournal': 'https://{}.livejournal.com',
    'myanimelist': 'https://myanimelist.net/profile/{}',
    'pastebin': 'https://pastebin.com/u/{}',
    'scratch': 'https://scratch.mit.edu/users/{}',
    'sketchfab': 'https://sketchfab.com/{}',
    'slack': 'https://{}.slack.com',
    'strava': 'https://www.strava.com/athletes/{}',
    'tenor': 'https://tenor.com/users/{}',
    'tradingview': 'https://www.tradingview.com/u/{}/',
    'tumblr': 'https://{}.tumblr.com/',
    'wordpress': 'https://{}.wordpress.com/',
    '9gag': 'https://9gag.com/u/{}',
    'brave_community': 'https://community.brave.com/u/{}/',
    'bugcrowd': 'https://bugcrowd.com/{}',
    'cgtrader': 'https://www.cgtrader.com/{}',
    'codewars': 'https://www.codewars.com/users/{}',
    'crowdin': 'https://crowdin.com/profile/{}',
    'disqus': 'https://disqus.com/{}',
    'gitbook': 'https://{}.gitbook.io/',
    'huggingface': 'https://huggingface.co/{}',
    'ifttt': 'https://www.ifttt.com/p/{}',
    'instructables': 'https://www.instructables.com/member/{}',
    'issuu': 'https://issuu.com/{}',
    'bandcamp': 'https://{}.bandcamp.com/',
    'myspace': 'https://myspace.com/{}',
    'asciinema': 'https://asciinema.org/~{}',
    'atcoder': 'https://atcoder.jp/users/{}',
    'bezuzyteczna': 'https://bezuzyteczna.pl/uzytkownicy/{}',
    'biggerpockets': 'https://www.biggerpockets.com/users/{}',
    'blipfoto': 'https://www.blipfoto.com/{}',
    'blitz_tactics': 'https://blitztactics.com/{}',
    'bongacams': 'https://pt.bongacams.com/profile/{}',
    'bookcrossing': 'https://www.bookcrossing.com/mybookshelf/{}/',
    'cfx_re_forum': 'https://forum.cfx.re/u/{}/summary',
    'championat': 'https://www.championat.com/user/{}',
    'chaos': 'https://chaos.social/@{}',
    'chatujme_cz': 'https://profil.chatujme.cz/{}',
    'coderwall': 'https://coderwall.com/{}',
    'cyberdefenders': 'https://cyberdefenders.org/p/{}',
    'deviantart': 'https://www.deviantart.com/{}',
    'discord_bio': 'https://discords.com/api-v2/bio/details/{}',
    'discuss_elastic_co': 'https://discuss.elastic.co/u/{}',
    'freesound': 'https://freesound.org/people/{}/',
    'genius_artists': 'https://genius.com/artists/{}',
    'genius_users': 'https://genius.com/{}',
    'gitea': 'https://gitea.com/{}',
    'gitee': 'https://gitee.com/{}',
    'hackmd': 'https://hackmd.io/@{}',
    'hackaday': 'https://hackaday.io/{}',
    'hackerearth': 'https://hackerearth.com/@{}',
    'hackerone': 'https://hackerone.com/{}',
    'hive_blog': 'https://hive.blog/@{}',
    'hubpages': 'https://hubpages.com/@{}',
    'ifunny': 'https://ifunny.co/user/{}',
    'instapaper': 'https://www.instapaper.com/p/{}',
    'kongregate': 'https://www.kongregate.com/accounts/{}',
    'laracast': 'https://laracasts.com/@{}',
    'linuxfr_org': 'https://linuxfr.org/users/{}',
    'mamot': 'https://mamot.fr/@{}',
    'memrise': 'https://www.memrise.com/user/{}/',
    'myminifactory': 'https://www.myminifactory.com/users/{}',
    'mydramalist': 'https://www.mydramalist.com/profile/{}',
    'nicommunityforum': 'https://community.native-instruments.com/profile/{}',
    'naver': 'https://blog.naver.com/{}',
    'nyaa_si': 'https://nyaa.si/user/{}',
    'observablehq': 'https://observablehq.com/@{}',
    'open_collective': 'https://opencollective.com/{}',
    'opengameart': 'https://opengameart.org/users/{}',
    'platzi': 'https://platzi.com/p/{}/',
    'pokemon_showdown': 'https://pokemonshowdown.com/users/{}',
    'pronouns_page': 'https://pronouns.page/@{}'
}


def check_instagram(username):
    url = f"https://www.instagram.com/api/v1/users/web_profile_info/?username={username}"
    headers = {
        'User-Agent': BROWSER_UA,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'X-IG-App-ID': '936619743392459',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': f'https://www.instagram.com/{username}/'
    }
    profile_url = f"https://www.instagram.com/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            data = r.json()
            user_data = data.get('data', {}).get('user', {})
            full_name = user_data.get('full_name')
            followers = user_data.get('edge_followed_by', {}).get('count')
            return {"status": "TAKEN", "url": profile_url, "full_name": full_name, "followers": followers}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        elif r.status_code in (403, 429):
            return {"status": "UNKNOWN", "url": profile_url, "message": "Blocked on Cloud IP"}
        else:
            return {"status": "UNKNOWN", "url": profile_url, "message": f"Status code {r.status_code}"}
    except requests.exceptions.RequestException:
        return {"status": "UNKNOWN", "url": profile_url, "message": "Blocked on Cloud IP"}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_facebook(username):
    url = f"https://www.facebook.com/{username}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
    profile_url = f"https://www.facebook.com/{username}"
    try:
        r = requests.get(url, headers=headers, allow_redirects=True, timeout=8)
        if r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        elif r.status_code == 200:
            title_match = re.search(r'<title>([\s\S]*?)</title>', r.text, re.IGNORECASE)
            title = title_match.group(1).strip() if title_match else ""
            if title.lower() == "facebook" or "login" in r.url or "login" in r.text or "checkpoint" in r.text:
                return {"status": "UNKNOWN", "url": profile_url, "message": "Login / Checkpoint required"}
            return {"status": "TAKEN", "url": profile_url, "full_name": title.replace(" | Facebook", "")}
        elif r.status_code in (403, 429):
            return {"status": "UNKNOWN", "url": profile_url, "message": "Blocked on Cloud IP"}
        else:
            return {"status": "UNKNOWN", "url": profile_url, "message": f"Status code {r.status_code}"}
    except requests.exceptions.RequestException:
        return {"status": "UNKNOWN", "url": profile_url, "message": "Connection blocked"}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_snapchat(username):
    url = f"https://www.snapchat.com/add/{username}"
    headers = {
        'User-Agent': BROWSER_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
    }
    profile_url = f"https://www.snapchat.com/add/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        
        match = re.search(r'<script id="__NEXT_DATA__" type="application/json">([\s\S]*?)</script>', r.text)
        if match:
            data = json.loads(match.group(1).strip())
            page_props = data.get('props', {}).get('pageProps', {})
            
            user_profile = page_props.get('userProfile', {})
            if user_profile:
                profile_info = user_profile.get('publicProfileInfo', {})
                full_name = profile_info.get('title')
                subscribers = profile_info.get('subscriberCount')
                return {"status": "TAKEN", "url": profile_url, "full_name": full_name, "followers": subscribers}
                
            inner_props = page_props.get('pageProps', {})
            if isinstance(inner_props, dict):
                page_meta = inner_props.get('pageMetadata', {})
                if page_meta.get('pageType') == 'NOT_FOUND':
                    return {"status": "AVAILABLE", "url": profile_url}
                    
            page_meta_outer = page_props.get('pageMetadata', {})
            if page_meta_outer.get('pageType') == 'NOT_FOUND':
                return {"status": "AVAILABLE", "url": profile_url}
                
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_tiktok(username):
    profile_url = f"https://www.tiktok.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    
    # 1. Try TikWM API (Accurately checks private, empty, and active accounts)
    try:
        api_url = f"https://www.tikwm.com/api/user/info?unique_id={username}"
        r = requests.get(api_url, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            if data.get('code') == 0:
                user_data = data.get('data', {}).get('user', {})
                full_name = user_data.get('nickname')
                followers = user_data.get('followerCount')
                return {"status": "TAKEN", "url": profile_url, "full_name": full_name, "followers": followers}
            elif data.get('code') == -1 or "invalid" in str(data.get('msg', '')).lower():
                return {"status": "AVAILABLE", "url": profile_url}
    except Exception:
        pass
        
    # 2. Fallback to TikTok oEmbed
    try:
        oembed_url = f"https://www.tiktok.com/oembed?url={profile_url}"
        r = requests.get(oembed_url, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            full_name = data.get('author_name')
            return {"status": "TAKEN", "url": profile_url, "full_name": full_name}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}


def check_twitter(username):
    url = f"https://publish.twitter.com/oembed?url=https://twitter.com/{username}"
    headers = {'User-Agent': BROWSER_UA}
    profile_url = f"https://x.com/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_reddit(username):
    url = f"https://old.reddit.com/user/{username}"
    headers = {
        'User-Agent': BROWSER_UA
    }
    profile_url = f"https://www.reddit.com/user/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_bluesky(username):
    if "_" in username:
        return {"status": "AVAILABLE", "url": f"https://bsky.app/profile/{username}.bsky.social", "message": "Invalid handle format (no underscores)"}
    url = f"https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle={username}.bsky.social"
    profile_url = f"https://bsky.app/profile/{username}.bsky.social"
    try:
        r = requests.get(url, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 400:
            data = r.json()
            if "Unable to resolve handle" in data.get('message', ''):
                return {"status": "AVAILABLE", "url": profile_url}
            return {"status": "AVAILABLE", "url": profile_url, "message": data.get('message')}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_discord(username):
    username_lower = username.lower()
    profile_url = "https://discord.com/"
    
    # Discord username format validation
    if not re.match(r'^[a-z0-9._]+$', username_lower):
        return {"status": "INVALID", "url": profile_url, "message": "Only letters, numbers, periods, and underscores allowed"}
    if len(username_lower) < 2 or len(username_lower) > 32:
        return {"status": "INVALID", "url": profile_url, "message": "Must be between 2 and 32 characters"}
    if ".." in username_lower:
        return {"status": "INVALID", "url": profile_url, "message": "Cannot contain double periods"}

    url = "https://discord.com/api/v9/unique-username/username-attempt-unauthed"
    headers = {
        'User-Agent': BROWSER_UA,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    payload = {"username": username_lower}
    try:
        r = requests.post(url, headers=headers, json=payload, timeout=8)
        if r.status_code == 200:
            data = r.json()
            if data.get('taken') is True:
                return {"status": "TAKEN", "url": profile_url}
              # If username is free, direct link is just the app download or homepage since discord has no web profile pages
            return {"status": "AVAILABLE", "url": profile_url}
        elif r.status_code == 400:
            data = r.json()
            err_msg = "Invalid format"
            errors = data.get('errors', {})
            if isinstance(errors, dict) and 'username' in errors:
                username_errors = errors['username'].get('_errors', [])
                if len(username_errors) > 0:
                    err_msg = username_errors[0].get('message', 'Invalid format')
            elif 'message' in data:
                err_msg = data['message']
            return {"status": "INVALID", "url": profile_url, "message": err_msg}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_youtube(username):
    url = f"https://www.youtube.com/@{username}"
    headers = {
        'User-Agent': BROWSER_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
    }
    profile_url = f"https://www.youtube.com/@{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_twitch(username):
    headers = {
        'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'User-Agent': BROWSER_UA
    }
    payload = [
        {
            "operationName": "ChannelShell",
            "variables": {"login": username},
            "query": "query ChannelShell($login: String!) { user(login: $login) { id login displayName } }"
        }
    ]
    profile_url = f"https://www.twitch.tv/{username}"
    try:
        r = requests.post('https://gql.twitch.tv/gql', headers=headers, json=payload, timeout=8)
        if r.status_code == 200:
            data = r.json()
            user_data = data[0].get('data', {}).get('user')
            if user_data:
                return {"status": "TAKEN", "url": profile_url, "full_name": user_data.get('displayName')}
            return {"status": "AVAILABLE", "url": profile_url}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_gitlab(username):
    url = f"https://gitlab.com/api/v4/users?username={username}"
    headers = {'User-Agent': BROWSER_UA}
    profile_url = f"https://gitlab.com/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            data = r.json()
            if len(data) > 0:
                return {"status": "TAKEN", "url": profile_url}
            return {"status": "AVAILABLE", "url": profile_url}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_dailymotion(username):
    url = f"https://api.dailymotion.com/user/{username}"
    profile_url = f"https://www.dailymotion.com/{username}"
    try:
        r = requests.get(url, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_pinterest(username):
    url = f"https://www.pinterest.com/{username}/"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        title_match = re.search(r'<title[^>]*>([\s\S]*?)</title>', r.text, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else ""
        if not title or title.lower() == "":
            return {"status": "AVAILABLE", "url": url}
        return {"status": "TAKEN", "url": url, "full_name": title}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_patreon(username):
    url = f"https://www.patreon.com/{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_spotify(username):
    url = f"https://open.spotify.com/user/{username}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_soundcloud(username):
    url = f"https://soundcloud.com/{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_medium(username):
    url = f"https://medium.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        title_match = re.search(r'<title[^>]*>([\s\S]*?)</title>', r.text, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else ""
        if title.lower() == "medium":
            return {"status": "AVAILABLE", "url": url}
        return {"status": "TAKEN", "url": url, "full_name": title.replace(" – Medium", "")}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_substack(username):
    url = f"https://substack.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        title_match = re.search(r'<title[^>]*>([\s\S]*?)</title>', r.text, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else ""
        if "search" in title.lower():
            return {"status": "AVAILABLE", "url": url}
        return {"status": "TAKEN", "url": url, "full_name": title.replace(" | Substack", "")}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_steam(username):
    url = f"https://steamcommunity.com/id/{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if "The specified profile could not be found" in r.text:
            return {"status": "AVAILABLE", "url": url}
        return {"status": "TAKEN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_minecraft(username):
    profile_url = f"https://namemc.com/profile/{username}"
    # Minecraft username validation: 3-16 chars, alphanumeric/underscore
    if not re.match(r'^[a-zA-Z0-9_]{3,16}$', username):
        return {"status": "INVALID", "url": profile_url, "message": "Must be 3-16 alphanumeric characters or underscores"}
        
    url = f"https://api.mojang.com/users/profiles/minecraft/{username}"
    try:
        r = requests.get(url, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_pubg(username):
    url = f"https://pubg.op.gg/user/{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        title_match = re.search(r'<title[^>]*>([\s\S]*?)</title>', r.text, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else ""
        if "player stats" in title.lower():
            return {"status": "TAKEN", "url": url}
        return {"status": "AVAILABLE", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_figma(username):
    url = f"https://www.figma.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_producthunt(username):
    url = f"https://www.producthunt.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_letterboxd(username):
    url = f"https://letterboxd.com/{username}/"
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": url}

def check_bandcamp(username):
    url = f"https://{username}.bandcamp.com/"
    try:
        r = requests.get(url, timeout=8, allow_redirects=False, verify=False)
        if r.status_code == 303:
            return {"status": "AVAILABLE", "url": url}
        elif r.status_code == 200:
            return {"status": "TAKEN", "url": url}
        else:
            return {"status": "UNKNOWN", "url": url}
    except Exception as e:
        return {"status": "AVAILABLE", "url": url}

def check_generic_profile(username, url_pattern, profile_pattern):
    url = url_pattern.format(username)
    profile_url = profile_pattern.format(username)
    headers = {'User-Agent': BROWSER_UA}
    try:
        # Use verify=False to bypass SSL check issues for stable generic checks
        r = requests.get(url, headers=headers, timeout=8, allow_redirects=True, verify=False)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        else:
            return {"status": "UNKNOWN", "url": profile_url}
    except (requests.exceptions.ConnectionError, requests.exceptions.SSLError):
        if "{}" in url_pattern and url_pattern.index("{}") < url_pattern.index("."):
            return {"status": "AVAILABLE", "url": profile_url}
        return {"status": "ERROR", "message": "Connection error", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_domain(domain_name):
    name_part = domain_name.split('.')[0]
    if not re.match(r'^[a-zA-Z0-9\-]+$', name_part):
        return {
            "status": "INVALID",
            "url": "#",
            "message": "Only letters, numbers, and dashes are allowed in domains"
        }
        
    try:
        url_a = f"https://cloudflare-dns.com/dns-query?name={domain_name}&type=A"
        headers = {"accept": "application/dns-json"}
        r_a = requests.get(url_a, headers=headers, timeout=4)
        data_a = r_a.json()
        if "Answer" in data_a:
            return {"status": "TAKEN", "url": f"http://{domain_name}"}
            
        url_ns = f"https://cloudflare-dns.com/dns-query?name={domain_name}&type=NS"
        r_ns = requests.get(url_ns, headers=headers, timeout=4)
        data_ns = r_ns.json()
        if "Answer" in data_ns:
            return {"status": "TAKEN", "url": f"http://{domain_name}"}
            
        return {"status": "AVAILABLE", "url": f"https://www.namecheap.com/domains/registration/results/?domain={domain_name}"}
    except Exception as e:
        return {"status": "UNKNOWN", "url": f"https://www.namecheap.com/domains/registration/results/?domain={domain_name}", "message": str(e)}

@app.route('/')
@app.route('/username-checker')
def home():
    return render_template('index.html')

@app.after_request
def add_security_and_seo_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    if request.path == '/' or request.path == '/username-checker':
        response.headers['Cache-Control'] = 'public, max-age=3600'
    return response

@app.route('/sitemap.xml')
def sitemap():
    from flask import Response, send_from_directory
    import os
    sitemap_path = os.path.join(os.path.dirname(__file__), 'sitemap.xml')
    with open(sitemap_path, 'r') as f:
        content = f.read()
    return Response(content, mimetype='application/xml')

@app.route('/robots.txt')
def robots():
    from flask import Response
    import os
    robots_path = os.path.join(os.path.dirname(__file__), 'robots.txt')
    with open(robots_path, 'r') as f:
        content = f.read()
    return Response(content, mimetype='text/plain')

def clean_input_username(raw):
    if not raw:
        return ""
    raw = raw.strip()
    if '://' in raw or '/' in raw:
        raw = raw.split('?')[0].split('#')[0].rstrip('/')
        parts = raw.split('/')
        raw = parts[-1]
    if raw.startswith('@'):
        raw = raw[1:]
    return raw

@app.route('/api/check/<platform>')
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
    elif platform == 'vimeo':
        res = check_generic_profile(username, "https://vimeo.com/{}", "https://vimeo.com/{}")
    elif platform == 'rumble':
        res = check_generic_profile(username, "https://rumble.com/user/{}", "https://rumble.com/user/{}")
    elif platform == 'dailymotion':
        res = check_dailymotion(username)
    elif platform == 'github':
        res = check_generic_profile(username, "https://github.com/{}", "https://github.com/{}")
    elif platform == 'gitlab':
        res = check_gitlab(username)
    elif platform == 'devto':
        res = check_generic_profile(username, "https://dev.to/{}", "https://dev.to/{}")
    elif platform == 'pinterest':
        res = check_pinterest(username)
    elif platform == 'patreon':
        res = check_patreon(username)
    elif platform == 'spotify':
        res = check_spotify(username)
    elif platform == 'soundcloud':
        res = check_soundcloud(username)
    elif platform == 'medium':
        res = check_medium(username)
    elif platform == 'substack':
        res = check_substack(username)
    elif platform == 'steam':
        res = check_steam(username)
    elif platform == 'minecraft':
        res = check_minecraft(username)
    elif platform == 'pubg':
        res = check_pubg(username)
    elif platform == 'figma':
        res = check_figma(username)
    elif platform == 'producthunt':
        res = check_producthunt(username)
    elif platform == 'letterboxd':
        res = check_letterboxd(username)
    elif platform == 'bandcamp':
        res = check_bandcamp(username)
    elif platform in GENERIC_PLATFORMS:
        res = check_generic_profile(username, GENERIC_PLATFORMS[platform], GENERIC_PLATFORMS[platform])
    elif platform.startswith('domain_'):
        tld = platform.split('_')[1]
        domain_name = f"{username}.{tld}"
        res = check_domain(domain_name)
    else:
        return jsonify({"error": f"Unknown platform: {platform}"}), 400
        
    return jsonify(res)

@app.route('/api/check')
def check_legacy():
    username = request.args.get('username', '').strip()
    if not username:
        return jsonify({"error": "Username parameter is required"}), 400
    if not re.match(r'^[a-zA-Z0-9._\-]+$', username):
        return jsonify({"error": "Username contains invalid characters"}), 400

    with ThreadPoolExecutor(max_workers=3) as executor:
        future_ig = executor.submit(check_instagram, username)
        future_snap = executor.submit(check_snapchat, username)
        future_fb = executor.submit(check_facebook, username)

        results = {
            "instagram": future_ig.result(),
            "snapchat": future_snap.result(),
            "facebook": future_fb.result()
        }

    return jsonify({
        "username": username,
        "results": results
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
