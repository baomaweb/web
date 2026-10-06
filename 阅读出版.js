/**
 * 阅读出版 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "reading",
  "name": "阅读出版",
  "icon": "reading",
  "sites": [
    {
      "name": "微信读书",
      "url": "https://weread.qq.com",
      "color": "#1a5634"
    },
    {
      "name": "豆瓣读书",
      "url": "https://book.douban.com",
      "color": "#007722"
    },
    {
      "name": "起点中文网",
      "url": "https://www.qidian.com",
      "color": "#ff4d00"
    },
    {
      "name": "番茄小说",
      "url": "https://fanqienovel.com",
      "color": "#ff3141"
    },
    {
      "name": "晋江原创网",
      "url": "https://www.jjwxc.net",
      "color": "#cc3366"
    },
    {
      "name": "得到",
      "url": "https://www.dedao.cn",
      "color": "#222"
    },
    {
      "name": "亚马逊Kindle",
      "url": "https://www.amazon.com/Kindle",
      "color": "#ff9900"
    },
    {
      "name": "知乎盐选",
      "url": "https://www.zhihu.com/market",
      "color": "#0084ff"
    },
    {
      "name": "中书网",
      "url": "https://www.zhongshu.com",
      "color": "#ff6600"
    },
    {
      "name": "Goodreads",
      "url": "https://www.goodreads.com",
      "color": "#382110"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M4 4h7v16H4z" fill="#1a5634"/><path d="M13 4h7v16h-7z" fill="#ff4d00"/><path d="M11 4h2v16h-2z" fill="#382110"/><rect x="6" y="7" width="3" height="1.5" rx="0.75" fill="#fff"/><rect x="15" y="7" width="3" height="1.5" rx="0.75" fill="#fff"/></svg>';
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
