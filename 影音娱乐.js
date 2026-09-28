/**
 * 影音娱乐 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "video",
  "name": "影音娱乐",
  "icon": "video",
  "sites": [
    {
      "name": "B站",
      "url": "https://www.bilibili.com",
      "color": "#fb7299"
    },
    {
      "name": "优酷",
      "url": "https://www.youku.com",
      "color": "#1ab7e5"
    },
    {
      "name": "爱奇艺",
      "url": "https://www.iqiyi.com",
      "color": "#00be06"
    },
    {
      "name": "腾讯视频",
      "url": "https://v.qq.com",
      "color": "#ff6022"
    },
    {
      "name": "YouTube",
      "url": "https://www.youtube.com",
      "color": "#ff0000"
    },
    {
      "name": "网易云音乐",
      "url": "https://music.163.com",
      "color": "#c20c0c"
    },
    {
      "name": "QQ音乐",
      "url": "https://y.qq.com",
      "color": "#31c27c"
    },
    {
      "name": "Spotify",
      "url": "https://www.spotify.com",
      "color": "#1db954"
    },
    {
      "name": "抖音",
      "url": "https://www.douyin.com",
      "color": "#161823"
    },
    {
      "name": "芒果TV",
      "url": "https://www.mgtv.com",
      "color": "#ff5f00"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" fill="#fb7299"/><path d="m10 9 5 3-5 3z" fill="#fff"/><circle cx="19" cy="6" r="2.5" fill="#00be06"/><circle cx="5" cy="6" r="2" fill="#ff6022"/></svg>';
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
