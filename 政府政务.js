/**
 * 政府政务 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "gov",
  "name": "政府政务",
  "icon": "gov",
  "sites": [
    {
      "name": "中国政府网",
      "url": "https://www.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "国家税务总局",
      "url": "https://www.chinatax.gov.cn",
      "color": "#0056d2"
    },
    {
      "name": "国家企业信用信息公示系统",
      "url": "https://www.gsxt.gov.cn",
      "color": "#0066cc"
    },
    {
      "name": "国家知识产权局",
      "url": "https://www.cnipa.gov.cn",
      "color": "#003580"
    },
    {
      "name": "中国海关",
      "url": "https://www.customs.gov.cn",
      "color": "#0066cc"
    },
    {
      "name": "国家移民局",
      "url": "https://www.nia.gov.cn",
      "color": "#1a5c7a"
    },
    {
      "name": "教育部",
      "url": "https://www.moe.gov.cn",
      "color": "#0056d2"
    },
    {
      "name": "人社部",
      "url": "https://www.mohrss.gov.cn",
      "color": "#1a73e8"
    },
    {
      "name": "国家发改委",
      "url": "https://www.ndrc.gov.cn",
      "color": "#0066cc"
    },
    {
      "name": "国家卫健委",
      "url": "https://www.nhc.gov.cn",
      "color": "#0f81c7"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M3 21h18" stroke="#c7000b" stroke-width="2.5" stroke-linecap="round"/><path d="M5 21V10l7-7 7 7v11" fill="#c7000b"/><rect x="9" y="15" width="6" height="6" fill="#fff"/><rect x="9" y="12" width="6" height="2" fill="#0056d2"/></svg>';
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
