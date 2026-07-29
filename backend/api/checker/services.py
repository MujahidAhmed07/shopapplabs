import urllib.request
import urllib.error
import requests
import json
import re
from concurrent.futures import ThreadPoolExecutor
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

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
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
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
    headers = {'User-Agent': BROWSER_UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}
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
                return {"status": "TAKEN", "url": profile_url, "full_name": profile_info.get('title'), "followers": profile_info.get('subscriberCount')}
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
    try:
        api_url = f"https://www.tikwm.com/api/user/info?unique_id={username}"
        r = requests.get(api_url, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            if data.get('code') == 0:
                user_data = data.get('data', {}).get('user', {})
                return {"status": "TAKEN", "url": profile_url, "full_name": user_data.get('nickname'), "followers": user_data.get('followerCount')}
            elif data.get('code') == -1 or "invalid" in str(data.get('msg', '')).lower():
                return {"status": "AVAILABLE", "url": profile_url}
    except Exception:
        pass
    try:
        oembed_url = f"https://www.tiktok.com/oembed?url={profile_url}"
        r = requests.get(oembed_url, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            return {"status": "TAKEN", "url": profile_url, "full_name": data.get('author_name')}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
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
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_reddit(username):
    url = f"https://old.reddit.com/user/{username}"
    headers = {'User-Agent': BROWSER_UA}
    profile_url = f"https://www.reddit.com/user/{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
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
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_discord(username):
    username_lower = username.lower()
    profile_url = "https://discord.com/"
    if not re.match(r'^[a-z0-9._]+$', username_lower):
        return {"status": "INVALID", "url": profile_url, "message": "Only letters, numbers, periods, and underscores allowed"}
    if len(username_lower) < 2 or len(username_lower) > 32:
        return {"status": "INVALID", "url": profile_url, "message": "Must be between 2 and 32 characters"}
    if ".." in username_lower:
        return {"status": "INVALID", "url": profile_url, "message": "Cannot contain double periods"}

    url = "https://discord.com/api/v9/unique-username/username-attempt-unauthed"
    headers = {'User-Agent': BROWSER_UA, 'Content-Type': 'application/json'}
    try:
        r = requests.post(url, headers=headers, json={"username": username_lower}, timeout=8)
        if r.status_code == 200:
            data = r.json()
            if data.get('taken') is True:
                return {"status": "TAKEN", "url": profile_url}
            return {"status": "AVAILABLE", "url": profile_url}
        elif r.status_code == 400:
            return {"status": "INVALID", "url": profile_url, "message": "Invalid Discord format"}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_youtube(username):
    url = f"https://www.youtube.com/@{username}"
    headers = {'User-Agent': BROWSER_UA}
    profile_url = f"https://www.youtube.com/@{username}"
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
        return {"status": "UNKNOWN", "url": profile_url}
    except Exception as e:
        return {"status": "ERROR", "message": str(e), "url": profile_url}

def check_twitch(username):
    headers = {'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'User-Agent': BROWSER_UA}
    payload = [{"operationName": "ChannelShell", "variables": {"login": username}, "query": "query ChannelShell($login: String!) { user(login: $login) { id login displayName } }"}]
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

def check_generic_profile(username, url_pattern, profile_pattern):
    url = url_pattern.format(username)
    profile_url = profile_pattern.format(username)
    headers = {'User-Agent': BROWSER_UA}
    try:
        r = requests.get(url, headers=headers, timeout=8, allow_redirects=True, verify=False)
        if r.status_code == 200:
            return {"status": "TAKEN", "url": profile_url}
        elif r.status_code == 404:
            return {"status": "AVAILABLE", "url": profile_url}
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
        return {"status": "INVALID", "url": "#", "message": "Only letters, numbers, and dashes allowed"}
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
