import axios from 'axios';

const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export const GENERIC_PLATFORMS = {
  about_me: 'https://about.me/{}',
  blogger: 'https://{}.blogspot.com',
  buymeacoffee: 'https://buymeacoff.ee/{}',
  carrd: 'https://{}.carrd.co/',
  cashapp: 'https://cash.app/${}',
  chess: 'https://www.chess.com/member/{}',
  docker_hub: 'https://hub.docker.com/u/{}/',
  flickr: 'https://www.flickr.com/people/{}',
  flipboard: 'https://flipboard.com/@{}',
  goodreads: 'https://www.goodreads.com/{}',
  gumroad: 'https://www.gumroad.com/{}',
  itch_io: 'https://{}.itch.io/',
  keybase: 'https://keybase.io/{}',
  linktree: 'https://linktr.ee/{}',
  livejournal: 'https://{}.livejournal.com',
  myanimelist: 'https://myanimelist.net/profile/{}',
  pastebin: 'https://pastebin.com/u/{}',
  scratch: 'https://scratch.mit.edu/users/{}',
  sketchfab: 'https://sketchfab.com/{}',
  slack: 'https://{}.slack.com',
  strava: 'https://www.strava.com/athletes/{}',
  tenor: 'https://tenor.com/users/{}',
  tradingview: 'https://www.tradingview.com/u/{}/',
  tumblr: 'https://{}.tumblr.com/',
  wordpress: 'https://{}.wordpress.com/',
  '9gag': 'https://9gag.com/u/{}',
  'brave_community': 'https://community.brave.com/u/{}/',
  bugcrowd: 'https://bugcrowd.com/{}',
  cgtrader: 'https://www.cgtrader.com/{}',
  codewars: 'https://www.codewars.com/users/{}',
  crowdin: 'https://crowdin.com/profile/{}',
  disqus: 'https://disqus.com/{}',
  gitbook: 'https://{}.gitbook.io/',
  huggingface: 'https://huggingface.co/{}',
  ifttt: 'https://www.ifttt.com/p/{}',
  instructables: 'https://www.instructables.com/member/{}',
  issuu: 'https://issuu.com/{}',
  bandcamp: 'https://{}.bandcamp.com/',
  myspace: 'https://myspace.com/{}',
  asciinema: 'https://asciinema.org/~{}',
  atcoder: 'https://atcoder.jp/users/{}',
  bezuzyteczna: 'https://bezuzyteczna.pl/uzytkownicy/{}',
  biggerpockets: 'https://www.biggerpockets.com/users/{}',
  blipfoto: 'https://www.blipfoto.com/{}',
  blitz_tactics: 'https://blitztactics.com/{}',
  bongacams: 'https://pt.bongacams.com/profile/{}',
  bookcrossing: 'https://www.bookcrossing.com/mybookshelf/{}/',
  cfx_re_forum: 'https://forum.cfx.re/u/{}/summary',
  championat: 'https://www.championat.com/user/{}',
  chaos: 'https://chaos.social/@{}',
  chatujme_cz: 'https://profil.chatujme.cz/{}',
  coderwall: 'https://coderwall.com/{}',
  cyberdefenders: 'https://cyberdefenders.org/p/{}',
  deviantart: 'https://www.deviantart.com/{}',
  discord_bio: 'https://discords.com/api-v2/bio/details/{}',
  discuss_elastic_co: 'https://discuss.elastic.co/u/{}',
  freesound: 'https://freesound.org/people/{}/',
  genius_artists: 'https://genius.com/artists/{}',
  genius_users: 'https://genius.com/{}',
  gitea: 'https://gitea.com/{}',
  gitee: 'https://gitee.com/{}',
  hackmd: 'https://hackmd.io/@{}',
  hackaday: 'https://hackaday.io/{}',
  hackerearth: 'https://hackerearth.com/@{}',
  hackerone: 'https://hackerone.com/{}',
  hive_blog: 'https://hive.blog/@{}',
  hubpages: 'https://hubpages.com/@{}',
  ifunny: 'https://ifunny.co/user/{}',
  instapaper: 'https://www.instapaper.com/p/{}',
  kongregate: 'https://www.kongregate.com/accounts/{}',
  laracast: 'https://laracasts.com/@{}',
  linuxfr_org: 'https://linuxfr.org/users/{}',
  mamot: 'https://mamot.fr/@{}',
  memrise: 'https://www.memrise.com/user/{}/',
  myminifactory: 'https://www.myminifactory.com/users/{}',
  mydramalist: 'https://www.mydramalist.com/profile/{}',
  nicommunityforum: 'https://community.native-instruments.com/profile/{}',
  naver: 'https://blog.naver.com/{}',
  nyaa_si: 'https://nyaa.si/user/{}',
  observablehq: 'https://observablehq.com/@{}',
  open_collective: 'https://opencollective.com/{}',
  opengameart: 'https://opengameart.org/users/{}',
  platzi: 'https://platzi.com/p/{}/',
  pokemon_showdown: 'https://pokemonshowdown.com/users/{}',
  pronouns_page: 'https://pronouns.page/@{}'
};

export function cleanInputUsername(raw) {
  if (!raw) return '';
  let clean = raw.trim();
  if (clean.includes('://') || clean.includes('/')) {
    clean = clean.split('?')[0].split('#')[0].replace(/\/+$/, '');
    const parts = clean.split('/');
    clean = parts[parts.length - 1];
  }
  if (clean.startsWith('@')) {
    clean = clean.substring(1);
  }
  return clean;
}

export async function checkInstagram(username) {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
  const profileUrl = `https://www.instagram.com/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'X-IG-App-ID': '936619743392459',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': `https://www.instagram.com/${username}/`
      },
      timeout: 8000,
      validateStatus: () => true
    });

    if (response.status === 200) {
      const userData = response.data?.data?.user || {};
      const fullName = userData.full_name;
      const followers = userData.edge_followed_by?.count;
      return { status: 'TAKEN', url: profileUrl, full_name: fullName, followers };
    } else if (response.status === 404) {
      return { status: 'AVAILABLE', url: profileUrl };
    } else if ([403, 429].includes(response.status)) {
      return { status: 'UNKNOWN', url: profileUrl, message: 'Blocked on Cloud IP' };
    } else {
      return { status: 'UNKNOWN', url: profileUrl, message: `Status code ${response.status}` };
    }
  } catch (error) {
    return { status: 'UNKNOWN', url: profileUrl, message: 'Blocked on Cloud IP' };
  }
}

export async function checkFacebook(username) {
  const url = `https://www.facebook.com/${username}`;
  const profileUrl = `https://www.facebook.com/${username}`;
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 8000,
      validateStatus: () => true
    });

    if (response.status === 404) {
      return { status: 'AVAILABLE', url: profileUrl };
    } else if (response.status === 200) {
      const html = typeof response.data === 'string' ? response.data : '';
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      const finalUrl = response.request?.res?.responseUrl || url;
      if (title.toLowerCase() === 'facebook' || finalUrl.includes('login') || html.includes('login') || html.includes('checkpoint')) {
        return { status: 'UNKNOWN', url: profileUrl, message: 'Login / Checkpoint required' };
      }
      return { status: 'TAKEN', url: profileUrl, full_name: title.replace(' | Facebook', '') };
    } else if ([403, 429].includes(response.status)) {
      return { status: 'UNKNOWN', url: profileUrl, message: 'Blocked on Cloud IP' };
    } else {
      return { status: 'UNKNOWN', url: profileUrl, message: `Status code ${response.status}` };
    }
  } catch (error) {
    return { status: 'UNKNOWN', url: profileUrl, message: 'Connection blocked' };
  }
}

export async function checkSnapchat(username) {
  const url = `https://www.snapchat.com/add/${username}`;
  const profileUrl = `https://www.snapchat.com/add/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 8000,
      validateStatus: () => true
    });

    if (response.status === 404) {
      return { status: 'AVAILABLE', url: profileUrl };
    }

    const html = typeof response.data === 'string' ? response.data : '';
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (match) {
      try {
        const data = JSON.parse(match[1].trim());
        const pageProps = data?.props?.pageProps || {};
        const userProfile = pageProps?.userProfile;

        if (userProfile) {
          const profileInfo = userProfile.publicProfileInfo || {};
          const fullName = profileInfo.title;
          const subscribers = profileInfo.subscriberCount;
          return { status: 'TAKEN', url: profileUrl, full_name: fullName, followers: subscribers };
        }

        const innerProps = pageProps.pageProps;
        if (innerProps && typeof innerProps === 'object') {
          if (innerProps.pageMetadata?.pageType === 'NOT_FOUND') {
            return { status: 'AVAILABLE', url: profileUrl };
          }
        }
        if (pageProps.pageMetadata?.pageType === 'NOT_FOUND') {
          return { status: 'AVAILABLE', url: profileUrl };
        }
      } catch (e) {}
    }

    if (response.status === 200) {
      return { status: 'TAKEN', url: profileUrl };
    }
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkTikTok(username) {
  const profileUrl = `https://www.tiktok.com/@${username}`;
  try {
    const apiRes = await axios.get(`https://www.tikwm.com/api/user/info?unique_id=${username}`, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 6000
    });
    if (apiRes.status === 200 && apiRes.data) {
      if (apiRes.data.code === 0) {
        const userData = apiRes.data.data?.user || {};
        return { status: 'TAKEN', url: profileUrl, full_name: userData.nickname, followers: userData.followerCount };
      } else if (apiRes.data.code === -1 || String(apiRes.data.msg || '').toLowerCase().includes('invalid')) {
        return { status: 'AVAILABLE', url: profileUrl };
      }
    }
  } catch (e) {}

  try {
    const oembedRes = await axios.get(`https://www.tiktok.com/oembed?url=${profileUrl}`, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 6000,
      validateStatus: () => true
    });
    if (oembedRes.status === 200) {
      return { status: 'TAKEN', url: profileUrl, full_name: oembedRes.data?.author_name };
    } else if (oembedRes.status === 404) {
      return { status: 'AVAILABLE', url: profileUrl };
    } else {
      return { status: 'UNKNOWN', url: profileUrl };
    }
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkTwitter(username) {
  const url = `https://publish.twitter.com/oembed?url=https://twitter.com/${username}`;
  const profileUrl = `https://x.com/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkReddit(username) {
  const url = `https://old.reddit.com/user/${username}`;
  const profileUrl = `https://www.reddit.com/user/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkBluesky(username) {
  if (username.includes('_')) {
    return { status: 'AVAILABLE', url: `https://bsky.app/profile/${username}.bsky.social`, message: 'Invalid handle format (no underscores)' };
  }
  const url = `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${username}.bsky.social`;
  const profileUrl = `https://bsky.app/profile/${username}.bsky.social`;
  try {
    const res = await axios.get(url, { timeout: 8000, validateStatus: () => true });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 400) {
      if (res.data?.message?.includes('Unable to resolve handle')) {
        return { status: 'AVAILABLE', url: profileUrl };
      }
      return { status: 'AVAILABLE', url: profileUrl, message: res.data?.message };
    }
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkDiscord(username) {
  const usernameLower = username.toLowerCase();
  const profileUrl = 'https://discord.com/';

  if (!/^[a-z0-9._]+$/.test(usernameLower)) {
    return { status: 'INVALID', url: profileUrl, message: 'Only letters, numbers, periods, and underscores allowed' };
  }
  if (usernameLower.length < 2 || usernameLower.length > 32) {
    return { status: 'INVALID', url: profileUrl, message: 'Must be between 2 and 32 characters' };
  }
  if (usernameLower.includes('..')) {
    return { status: 'INVALID', url: profileUrl, message: 'Cannot contain double periods' };
  }

  const url = 'https://discord.com/api/v9/unique-username/username-attempt-unauthed';
  try {
    const res = await axios.post(url, { username: usernameLower }, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 8000,
      validateStatus: () => true
    });

    if (res.status === 200) {
      if (res.data?.taken === true) {
        return { status: 'TAKEN', url: profileUrl };
      }
      return { status: 'AVAILABLE', url: profileUrl };
    } else if (res.status === 400) {
      let errMsg = 'Invalid format';
      const errors = res.data?.errors;
      if (errors?.username?._errors?.length > 0) {
        errMsg = errors.username._errors[0].message || 'Invalid format';
      } else if (res.data?.message) {
        errMsg = res.data.message;
      }
      return { status: 'INVALID', url: profileUrl, message: errMsg };
    }
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkYoutube(username) {
  const profileUrl = `https://www.youtube.com/@${username}`;
  try {
    const res = await axios.get(profileUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkTwitch(username) {
  const profileUrl = `https://www.twitch.tv/${username}`;
  const payload = [
    {
      operationName: 'ChannelShell',
      variables: { login: username },
      query: 'query ChannelShell($login: String!) { user(login: $login) { id login displayName } }'
    }
  ];
  try {
    const res = await axios.post('https://gql.twitch.tv/gql', payload, {
      headers: {
        'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'User-Agent': BROWSER_UA
      },
      timeout: 8000,
      validateStatus: () => true
    });

    if (res.status === 200 && Array.isArray(res.data) && res.data[0]?.data?.user) {
      return { status: 'TAKEN', url: profileUrl, full_name: res.data[0].data.user.displayName };
    }
    if (res.status === 200) {
      return { status: 'AVAILABLE', url: profileUrl };
    }
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkGitlab(username) {
  const profileUrl = `https://gitlab.com/${username}`;
  try {
    const res = await axios.get(`https://gitlab.com/api/v4/users?username=${username}`, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200 && Array.isArray(res.data)) {
      if (res.data.length > 0) return { status: 'TAKEN', url: profileUrl };
      return { status: 'AVAILABLE', url: profileUrl };
    }
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkDailymotion(username) {
  const profileUrl = `https://www.dailymotion.com/${username}`;
  try {
    const res = await axios.get(`https://api.dailymotion.com/user/${username}`, {
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkPinterest(username) {
  const url = `https://www.pinterest.com/${username}/`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    const html = typeof res.data === 'string' ? res.data : '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title || title.toLowerCase() === '') {
      return { status: 'AVAILABLE', url };
    }
    return { status: 'TAKEN', url, full_name: title };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkPatreon(username) {
  const url = `https://www.patreon.com/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkSpotify(username) {
  const url = `https://open.spotify.com/user/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkSoundcloud(username) {
  const url = `https://soundcloud.com/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkMedium(username) {
  const url = `https://medium.com/@${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    const html = typeof res.data === 'string' ? res.data : '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title.toLowerCase() === 'medium') {
      return { status: 'AVAILABLE', url };
    }
    return { status: 'TAKEN', url, full_name: title.replace(' – Medium', '') };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkSubstack(username) {
  const url = `https://substack.com/@${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    const html = typeof res.data === 'string' ? res.data : '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title.toLowerCase().includes('search')) {
      return { status: 'AVAILABLE', url };
    }
    return { status: 'TAKEN', url, full_name: title.replace(' | Substack', '') };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkSteam(username) {
  const url = `https://steamcommunity.com/id/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    const html = typeof res.data === 'string' ? res.data : '';
    if (html.includes('The specified profile could not be found')) {
      return { status: 'AVAILABLE', url };
    }
    return { status: 'TAKEN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkMinecraft(username) {
  const profileUrl = `https://namemc.com/profile/${username}`;
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
    return { status: 'INVALID', url: profileUrl, message: 'Must be 3-16 alphanumeric characters or underscores' };
  }
  try {
    const res = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url: profileUrl };
  }
}

export async function checkPubg(username) {
  const url = `https://pubg.op.gg/user/${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    const html = typeof res.data === 'string' ? res.data : '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title.toLowerCase().includes('player stats')) {
      return { status: 'TAKEN', url };
    }
    return { status: 'AVAILABLE', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkFigma(username) {
  const url = `https://www.figma.com/@${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkProducthunt(username) {
  const url = `https://www.producthunt.com/@${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkLetterboxd(username) {
  const url = `https://letterboxd.com/${username}/`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url };
    if (res.status === 404) return { status: 'AVAILABLE', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'ERROR', message: error.message, url };
  }
}

export async function checkBandcamp(username) {
  const url = `https://${username}.bandcamp.com/`;
  try {
    const res = await axios.get(url, {
      timeout: 8000,
      maxRedirects: 0,
      validateStatus: () => true
    });
    if (res.status === 303) return { status: 'AVAILABLE', url };
    if (res.status === 200) return { status: 'TAKEN', url };
    return { status: 'UNKNOWN', url };
  } catch (error) {
    return { status: 'AVAILABLE', url };
  }
}

export async function checkGenericProfile(username, urlPattern, profilePattern) {
  const url = urlPattern.replace('{}', username);
  const profileUrl = profilePattern.replace('{}', username);
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': BROWSER_UA },
      timeout: 8000,
      maxRedirects: 5,
      validateStatus: () => true
    });
    if (res.status === 200) return { status: 'TAKEN', url: profileUrl };
    if (res.status === 404) return { status: 'AVAILABLE', url: profileUrl };
    return { status: 'UNKNOWN', url: profileUrl };
  } catch (error) {
    if (urlPattern.includes('{}') && urlPattern.indexOf('{}') < urlPattern.indexOf('.')) {
      return { status: 'AVAILABLE', url: profileUrl };
    }
    return { status: 'ERROR', message: 'Connection error', url: profileUrl };
  }
}

export async function checkDomain(domainName) {
  const namePart = domainName.split('.')[0];
  if (!/^[a-zA-Z0-9\-]+$/.test(namePart)) {
    return { status: 'INVALID', url: '#', message: 'Only letters, numbers, and dashes are allowed in domains' };
  }
  const namecheapUrl = `https://www.namecheap.com/domains/registration/results/?domain=${domainName}`;
  try {
    const headers = { 'accept': 'application/dns-json' };
    const resA = await axios.get(`https://cloudflare-dns.com/dns-query?name=${domainName}&type=A`, { headers, timeout: 4000 });
    if (resA.data?.Answer?.length > 0) {
      return { status: 'TAKEN', url: `http://${domainName}` };
    }

    const resNS = await axios.get(`https://cloudflare-dns.com/dns-query?name=${domainName}&type=NS`, { headers, timeout: 4000 });
    if (resNS.data?.Answer?.length > 0) {
      return { status: 'TAKEN', url: `http://${domainName}` };
    }

    return { status: 'AVAILABLE', url: namecheapUrl };
  } catch (error) {
    return { status: 'UNKNOWN', url: namecheapUrl, message: error.message };
  }
}

export async function checkPlatform(platform, rawUsername) {
  const username = cleanInputUsername(rawUsername);
  if (!username) {
    return { error: 'Username parameter is required', statusCode: 400 };
  }
  if (!/^[a-zA-Z0-9._\-]+$/.test(username)) {
    return { error: 'Username contains invalid characters', statusCode: 400 };
  }

  let result;
  switch (platform) {
    case 'instagram': result = await checkInstagram(username); break;
    case 'facebook': result = await checkFacebook(username); break;
    case 'snapchat': result = await checkSnapchat(username); break;
    case 'tiktok': result = await checkTikTok(username); break;
    case 'twitter': result = await checkTwitter(username); break;
    case 'reddit': result = await checkReddit(username); break;
    case 'bluesky': result = await checkBluesky(username); break;
    case 'discord': result = await checkDiscord(username); break;
    case 'youtube': result = await checkYoutube(username); break;
    case 'twitch': result = await checkTwitch(username); break;
    case 'vimeo': result = await checkGenericProfile(username, 'https://vimeo.com/{}', 'https://vimeo.com/{}'); break;
    case 'rumble': result = await checkGenericProfile(username, 'https://rumble.com/user/{}', 'https://rumble.com/user/{}'); break;
    case 'dailymotion': result = await checkDailymotion(username); break;
    case 'github': result = await checkGenericProfile(username, 'https://github.com/{}', 'https://github.com/{}'); break;
    case 'gitlab': result = await checkGitlab(username); break;
    case 'devto': result = await checkGenericProfile(username, 'https://dev.to/{}', 'https://dev.to/{}'); break;
    case 'pinterest': result = await checkPinterest(username); break;
    case 'patreon': result = await checkPatreon(username); break;
    case 'spotify': result = await checkSpotify(username); break;
    case 'soundcloud': result = await checkSoundcloud(username); break;
    case 'medium': result = await checkMedium(username); break;
    case 'substack': result = await checkSubstack(username); break;
    case 'steam': result = await checkSteam(username); break;
    case 'minecraft': result = await checkMinecraft(username); break;
    case 'pubg': result = await checkPubg(username); break;
    case 'figma': result = await checkFigma(username); break;
    case 'producthunt': result = await checkProducthunt(username); break;
    case 'letterboxd': result = await checkLetterboxd(username); break;
    case 'bandcamp': result = await checkBandcamp(username); break;
    default:
      if (GENERIC_PLATFORMS[platform]) {
        result = await checkGenericProfile(username, GENERIC_PLATFORMS[platform], GENERIC_PLATFORMS[platform]);
      } else if (platform.startsWith('domain_')) {
        const tld = platform.split('_')[1];
        result = await checkDomain(`${username}.${tld}`);
      } else {
        return { error: `Unknown platform: ${platform}`, statusCode: 400 };
      }
      break;
  }

  return { data: result, statusCode: 200 };
}
