/**
 * 邮箱服务 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "email",
  "name": "邮箱服务",
  "icon": "email",
  "sites": [
    {
      "name": "Gmail",
      "url": "https://mail.google.com",
      "color": "#ea4335"
    },
    {
      "name": "QQ邮箱",
      "url": "https://mail.qq.com",
      "color": "#12b7f0"
    },
    {
      "name": "网易邮箱",
      "url": "https://mail.163.com",
      "color": "#ff3333"
    },
    {
      "name": "Outlook",
      "url": "https://outlook.live.com",
      "color": "#0078d4"
    },
    {
      "name": "126邮箱",
      "url": "https://mail.126.com",
      "color": "#ff6600"
    },
    {
      "name": "新浪邮箱",
      "url": "https://mail.sina.com.cn",
      "color": "#ff0000"
    },
    {
      "name": "139邮箱",
      "url": "https://mail.10086.cn",
      "color": "#00a0a0"
    },
    {
      "name": "Yahoo Mail",
      "url": "https://mail.yahoo.com",
      "color": "#6001d2"
    },
    {
      "name": "ProtonMail",
      "url": "https://proton.me/mail",
      "color": "#6d4aff"
    },
    {
      "name": "Zoho Mail",
      "url": "https://www.zoho.com/mail",
      "color": "#c8202f"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#ea4335"/><path d="m2 6 10 7 10-7" fill="#fff" opacity="0.2"/><path d="m2 6 10 7 10-7" stroke="#fff" stroke-width="1.5" fill="none"/></svg>';
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
