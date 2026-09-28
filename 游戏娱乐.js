/**
 * 游戏娱乐 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "games",
  "name": "游戏娱乐",
  "icon": "games",
  "sites": [
    {
      "name": "Steam",
      "url": "https://store.steampowered.com",
      "color": "#1b2838"
    },
    {
      "name": "Epic Games",
      "url": "https://store.epicgames.com",
      "color": "#0078f2"
    },
    {
      "name": "TapTap",
      "url": "https://www.taptap.cn",
      "color": "#ff4d4f"
    },
    {
      "name": "NGA",
      "url": "https://nga.cn",
      "color": "#c7000b"
    },
    {
      "name": "游民星空",
      "url": "https://www.gamersky.com",
      "color": "#e60012"
    },
    {
      "name": "3DMGame",
      "url": "https://www.3dmgame.com",
      "color": "#cc0000"
    },
    {
      "name": "Itch.io",
      "url": "https://itch.io",
      "color": "#fa5c5c"
    },
    {
      "name": "GOG",
      "url": "https://www.gog.com",
      "color": "#9b2c2c"
    },
    {
      "name": "IGN",
      "url": "https://www.ign.com",
      "color": "#bf1313"
    },
    {
      "name": "游侠网",
      "url": "https://www.ali213.net",
      "color": "#0066cc"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="11" rx="5" fill="#1b2838"/><circle cx="7" cy="12" r="1.5" fill="#ff4d4f"/><rect x="5" y="10.5" width="4" height="1" rx="0.5" fill="#ff4d4f" transform="rotate(90 7 12)"/><circle cx="16" cy="11" r="1" fill="#00ba34"/><circle cx="18" cy="11" r="1" fill="#00ba34"/><circle cx="17" cy="14" r="1" fill="#00ba34"/><circle cx="15" cy="14" r="1" fill="#00ba34"/><circle cx="17" cy="9" r="1" fill="#00ba34"/></svg>';
function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

// ==================== Theme ====================
var store = (function() {
  var state = { theme: 'dark' };
  return {
    get: function(key) { return key === undefined ? state : state[key]; },
    set: function(patch) { Object.keys(patch).forEach(function(k) { state[k] = patch[k]; }); }
  };
})();

function toggleTheme() {
  var current = store.get('theme');
  var next = current === 'dark' ? 'light' : 'dark';
  store.set({ theme: next });
  document.documentElement.setAttribute('data-theme', next);
  try {
    document.cookie = 'navhub-theme=' + next + ';path=/;max-age=31536000';
  } catch(e) {}
}

function initTheme() {
  var savedTheme = null;
  try {
    var m = document.cookie.match(/navhub-theme=(dark|light)/);
    if (m) savedTheme = m[1];
  } catch(e) {}
  if (savedTheme) {
    store.set({ theme: savedTheme });
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    store.set({ theme: 'light' });
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// ==================== AdSense ====================
function adCardHtml(variant) {
  var cls = 'ad-card';
  if (variant === 'span2') cls += ' ad-card--span2';
  else if (variant === 'span2x2') cls += ' ad-card--span2x2';
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<!--\n';
  h += '      <ins class="adsbygoogle"\n';
  h += '           style="display:block;width:100%;height:100%"\n';
  h += '           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"\n';
  h += '           data-ad-slot="XXXXXXXXXX"\n';
  h += '           data-ad-format="auto"\n';
  h += '           data-full-width-responsive="true"></ins>\n';
  h += '      <script>(adsbygoogle = window.adsbygoogle || []).push({});</' + 'script>\n';
  h += '-->';
  h += '</div>';
  return h;
}

// ==================== Render ====================
function renderCategoryPage() {
  var cat = CATEGORY;
  if (!cat) return;

  var iconSvg = ICON_SVG || '';
  var headerHtml = '';
  headerHtml += '<div class="cat-detail-icon">' + iconSvg + '</div>';
  headerHtml += '<span class="cat-detail-title">' + cat.name + '</span>';
  headerHtml += '<span class="cat-detail-count">' + cat.sites.length + ' 个网站</span>';
  document.getElementById('catDetailHeader').innerHTML = headerHtml;

  var grid = document.getElementById('siteGrid');
  var html = '';
  cat.sites.forEach(function(site, idx) {
    if (idx === 0) {
      html += adCardHtml('span2');
    }
    if (idx === 5) {
      html += adCardHtml('span2x2');
    }

    var favSrc = site.favicon || '';
    var fallbackColor = site.color || '#666';
    var initial = getInitial(site.name);

    html += '<a href="' + site.url + '" target="_blank" rel="noopener" class="site-item">';
    html += '<div class="site-favicon">';
    if (favSrc) {
      html += '<img src="' + favSrc + '" alt="" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">';
      html += '<div class="site-favicon-fallback" style="display:none;background:' + fallbackColor + '">' + initial + '</div>';
    } else {
      html += '<div class="site-favicon-fallback" style="display:flex;background:' + fallbackColor + '">' + initial + '</div>';
    }
    html += '</div>';
    html += '<span class="site-name">' + site.name + '</span>';
    html += '<span class="site-arrow">&#8599;</span>';
    html += '</a>';
  });
  grid.innerHTML = html;
}

// ==================== Init ====================
initTheme();
renderCategoryPage();
