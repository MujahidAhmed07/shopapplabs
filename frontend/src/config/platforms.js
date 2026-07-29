export const PLATFORMS_CONFIG = [
  // Social Platforms
  { id: 'instagram', name: 'Instagram', category: 'social', icon: 'Instagram', urlPattern: 'https://instagram.com/{}' },
  { id: 'facebook', name: 'Facebook', category: 'social', icon: 'Facebook', urlPattern: 'https://facebook.com/{}' },
  { id: 'twitter', name: 'X (Twitter)', category: 'social', icon: 'Twitter', urlPattern: 'https://x.com/{}' },
  { id: 'tiktok', name: 'TikTok', category: 'social', icon: 'Video', urlPattern: 'https://tiktok.com/@{}' },
  { id: 'snapchat', name: 'Snapchat', category: 'social', icon: 'Ghost', urlPattern: 'https://snapchat.com/add/{}' },
  { id: 'reddit', name: 'Reddit', category: 'social', icon: 'MessageSquare', urlPattern: 'https://reddit.com/user/{}' },
  { id: 'pinterest', name: 'Pinterest', category: 'social', icon: 'Pin', urlPattern: 'https://pinterest.com/{}' },
  { id: 'bluesky', name: 'Bluesky', category: 'social', icon: 'Cloud', urlPattern: 'https://bsky.app/profile/{}.bsky.social' },
  { id: 'discord', name: 'Discord', category: 'social', icon: 'MessageCircle', urlPattern: 'https://discord.com' },
  { id: 'tumblr', name: 'Tumblr', category: 'social', icon: 'Compass', urlPattern: 'https://{}.tumblr.com' },

  // Developer & Tech
  { id: 'github', name: 'GitHub', category: 'dev', icon: 'Code', urlPattern: 'https://github.com/{}' },
  { id: 'gitlab', name: 'GitLab', category: 'dev', icon: 'GitBranch', urlPattern: 'https://gitlab.com/{}' },
  { id: 'devto', name: 'DEV Community', category: 'dev', icon: 'Terminal', urlPattern: 'https://dev.to/{}' },
  { id: 'docker_hub', name: 'Docker Hub', category: 'dev', icon: 'Box', urlPattern: 'https://hub.docker.com/u/{}' },
  { id: 'hackerone', name: 'HackerOne', category: 'dev', icon: 'Shield', urlPattern: 'https://hackerone.com/{}' },
  { id: 'codewars', name: 'Codewars', category: 'dev', icon: 'Cpu', urlPattern: 'https://codewars.com/users/{}' },
  { id: 'figma', name: 'Figma', category: 'dev', icon: 'Figma', urlPattern: 'https://figma.com/@{}' },
  { id: 'producthunt', name: 'Product Hunt', category: 'dev', icon: 'Zap', urlPattern: 'https://producthunt.com/@{}' },

  // Gaming
  { id: 'twitch', name: 'Twitch', category: 'gaming', icon: 'Tv', urlPattern: 'https://twitch.tv/{}' },
  { id: 'youtube', name: 'YouTube', category: 'gaming', icon: 'Youtube', urlPattern: 'https://youtube.com/@{}' },
  { id: 'steam', name: 'Steam', category: 'gaming', icon: 'Gamepad2', urlPattern: 'https://steamcommunity.com/id/{}' },
  { id: 'minecraft', name: 'Minecraft', category: 'gaming', icon: 'Box', urlPattern: 'https://namemc.com/profile/{}' },
  { id: 'pubg', name: 'PUBG Stats', category: 'gaming', icon: 'Crosshair', urlPattern: 'https://pubg.op.gg/user/{}' },
  { id: 'chess', name: 'Chess.com', category: 'gaming', icon: 'Award', urlPattern: 'https://chess.com/member/{}' },
  { id: 'itch_io', name: 'Itch.io', category: 'gaming', icon: 'Gamepad', urlPattern: 'https://{}.itch.io' },

  // Media & Creative
  { id: 'spotify', name: 'Spotify', category: 'media', icon: 'Music', urlPattern: 'https://open.spotify.com/user/{}' },
  { id: 'soundcloud', name: 'SoundCloud', category: 'media', icon: 'Volume2', urlPattern: 'https://soundcloud.com/{}' },
  { id: 'medium', name: 'Medium', category: 'media', icon: 'BookOpen', urlPattern: 'https://medium.com/@{}' },
  { id: 'substack', name: 'Substack', category: 'media', icon: 'Mail', urlPattern: 'https://substack.com/@{}' },
  { id: 'patreon', name: 'Patreon', category: 'media', icon: 'Heart', urlPattern: 'https://patreon.com/{}' },
  { id: 'deviantart', name: 'DeviantArt', category: 'media', icon: 'Palette', urlPattern: 'https://deviantart.com/{}' },
  { id: 'letterboxd', name: 'Letterboxd', category: 'media', icon: 'Film', urlPattern: 'https://letterboxd.com/{}/' },

  // Domain Extensions (TLDs)
  { id: 'domain_com', name: '.COM Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.com' },
  { id: 'domain_io', name: '.IO Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.io' },
  { id: 'domain_dev', name: '.DEV Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.dev' },
  { id: 'domain_org', name: '.ORG Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.org' },
  { id: 'domain_net', name: '.NET Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.net' },
  { id: 'domain_co', name: '.CO Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.co' },
  { id: 'domain_ai', name: '.AI Domain', category: 'domains', icon: 'Globe', urlPattern: 'http://{}.ai' }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Checks' },
  { id: 'social', label: 'Social Media' },
  { id: 'dev', label: 'Developers & Tech' },
  { id: 'gaming', label: 'Gaming & Streaming' },
  { id: 'media', label: 'Creative & Music' },
  { id: 'domains', label: 'Domain Extensions' }
];
