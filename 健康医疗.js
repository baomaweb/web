/**
 * 健康医疗 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "health",
  "name": "健康医疗",
  "icon": "health",
  "sites": [
    {
      "name": "丁香园",
      "url": "https://www.dxy.cn",
      "color": "#00a0a0"
    },
    {
      "name": "好大夫在线",
      "url": "https://www.haodf.com",
      "color": "#00b3fd"
    },
    {
      "name": "春雨医生",
      "url": "https://www.chunyuyisheng.com",
      "color": "#00a4ff"
    },
    {
      "name": "微医",
      "url": "https://www.guahao.com",
      "color": "#1a73e8"
    },
    {
      "name": "平安健康",
      "url": "https://www.jk.cn",
      "color": "#ff6b1a"
    },
    {
      "name": "京东健康",
      "url": "https://health.jd.com",
      "color": "#e1251b"
    },
    {
      "name": "薄荷健康",
      "url": "https://www.boohee.com",
      "color": "#00be06"
    },
    {
      "name": "Keep",
      "url": "https://www.keep.com",
      "color": "#161823"
    },
    {
      "name": "华为运动健康",
      "url": "https://health.huawei.com",
      "color": "#c7000b"
    },
    {
      "name": " Mayo Clinic",
      "url": "https://www.mayoclinic.org",
      "color": "#0078d4"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="#00a0a0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="3" cy="12" r="2" fill="#ff6b1a"/><circle cx="21" cy="12" r="2" fill="#00be06"/><circle cx="9" cy="5" r="1.5" fill="#e1251b"/></svg>';
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
