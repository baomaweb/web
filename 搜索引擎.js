/**
 * 搜索引擎 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "search",
  "name": "搜索引擎",
  "icon": "search",
  "sites": [
   { name: 'google ', url: 'https://www.google.com/', favicon: 'favicon/search/google.ico' },
   { name: '百度 ', url: 'https://www.baidu.com/', favicon: 'favicon/search/baidu.ico' },
   { name: 'bing ', url: 'https://cn.bing.com/', favicon: 'favicon/search/bing.ico' },
   { name: '360搜索 ', url: 'https://www.so.com/', favicon: 'favicon/search/360.ico' },
   { name: '搜狗 ', url: 'https://www.sogou.com/', favicon: 'favicon/search/搜狗.ico' },
   { name: '搜搜 ', url: 'https://www.soso.com/', favicon: 'favicon/search/搜搜.ico' },
   { name: '今日头条 ', url: 'https://www.toutiao.com/', favicon: 'favicon/search/toutiao.ico' },
   { name: 'Naver ', url: 'https://www.naver.com/', favicon: 'favicon/search/naver.ico' },
   { name: 'yandex ', url: 'https://ya.ru/', favicon: 'favicon/search/yandex.png' },
   { name: 'Ceek ', url: 'http://www.ceek.jp/', favicon: 'favicon/search/ceek.ico' },
   { name: '中国搜索 ', url: 'http://www.chinaso.com/', favicon: 'favicon/search/中国搜索.ico' },
   { name: '新浪爱问 ', url: 'https://iask.sina.com.cn/', favicon: 'favicon/search/iask.ico' },
   { name: 'hotbot ', url: 'https://www.hotbot.com/', favicon: 'favicon/search/hotbot.png' },
   { name: 'looksmart ', url: 'https://www.looksmart.com/', favicon: 'favicon/search/looksmart.ico' },
    {
      "name": "lycos",
      "url": "https://www.lycos.com",
      "color": "#2932e1"
    },
    {
      "name": "DuckDuckGo",
      "url": "https://duckduckgo.com",
      "color": "#de5833"
    },
    {
      "name": "Ecosia",
      "url": "https://www.ecosia.org",
      "color": "#00a0a0"
    },
    {
      "name": "Startpage",
      "url": "https://www.startpage.com",
      "color": "#6526d3"
    },
    {
      "name": "Brave Search",
      "url": "https://search.brave.com",
      "color": "#fb542b"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="#4285f4"/><path d="M11 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#fff"/><path d="m20 20-3.5-3.5" stroke="#34a853" stroke-width="2.5" stroke-linecap="round"/></svg>';
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
  else if (variant === 'pos1') cls += ' ad-card--pos1';
  else if (variant === 'pos2') cls += ' ad-card--pos2';
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="ca-pub-6172791470588821"\n';
  h += '     data-ad-slot="3745621701"\n';
  h += '     data-ad-format="auto"\n';
  h += '     data-full-width-responsive="true"></ins>\n';
  h += '<script>(adsbygoogle = window.adsbygoogle || []).push({});</' + 'script>';
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
      html += adCardHtml('pos1');
    }
    if (idx === 5) {
      html += adCardHtml('pos2');
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
