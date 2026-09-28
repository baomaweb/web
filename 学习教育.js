/**
 * 学习教育 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "education",
  "name": "学习教育",
  "icon": "edu",
  "sites": [
    {
      "name": "网易公开课",
      "url": "https://open.163.com",
      "color": "#c0301f"
    },
    {
      "name": "中国大学MOOC",
      "url": "https://www.icourse163.org",
      "color": "#2c8fbb"
    },
    {
      "name": "慕课网",
      "url": "https://www.imooc.com",
      "color": "#1abc9c"
    },
    {
      "name": "极客时间",
      "url": "https://time.geekbang.org",
      "color": "#ff4e00"
    },
    {
      "name": "学堂在线",
      "url": "https://www.xuetangx.com",
      "color": "#8b1a1a"
    },
    {
      "name": "百度学术",
      "url": "https://xueshu.baidu.com",
      "color": "#2932e1"
    },
    {
      "name": "Coursera",
      "url": "https://www.coursera.org",
      "color": "#0056d2"
    },
    {
      "name": "edX",
      "url": "https://www.edx.org",
      "color": "#0224b4"
    },
    {
      "name": "Khan Academy",
      "url": "https://www.khanacademy.org",
      "color": "#14bf96"
    },
    {
      "name": "TED",
      "url": "https://www.ted.com",
      "color": "#e62b1e"
    }
  ]
};

var ICON_SVG = '';
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
