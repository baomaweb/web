/**
 * 社区论坛 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "forum",
  "name": "社区论坛",
  "icon": "forum",
  "sites": [
    {
      "name": "百度贴吧",
      "url": "https://tieba.baidu.com",
      "color": "#4e6ef2"
    },
    {
      "name": "虎扑社区",
      "url": "https://www.hupu.com",
      "color": "#ff6600"
    },
    {
      "name": "V2EX",
      "url": "https://www.v2ex.com",
      "color": "#333"
    },
    {
      "name": "Node Seek",
      "url": "https://www.nodeseek.com",
      "color": "#0066cc"
    },
    {
      "name": "HostLoc",
      "url": "https://www.hostloc.com",
      "color": "#ff5a1f"
    },
    {
      "name": "吾爱破解",
      "url": "https://www.52pojie.cn",
      "color": "#cc3333"
    },
    {
      "name": "恩山论坛",
      "url": "https://www.right.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "远景论坛",
      "url": "https://bbs.pcbeta.com",
      "color": "#0096ff"
    },
    {
      "name": "潮下载",
      "url": "https://www.chaoxz.com",
      "color": "#1a73e8"
    },
    {
      "name": "1024社区",
      "url": "https://www.1024.com",
      "color": "#222"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M3 5h18v10H8l-5 4z" fill="#4e6ef2"/><rect x="6" y="8" width="12" height="1.5" rx="0.75" fill="#fff"/><rect x="6" y="11" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7"/><circle cx="18" cy="3" r="2" fill="#cc3333"/></svg>';
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
  h += '           data-ad-client="ca-pub-6172791470588821"\n';
  h += '           data-ad-slot="3745621701"\n';
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
