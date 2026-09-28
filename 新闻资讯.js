/**
 * 新闻资讯 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "news",
  "name": "新闻资讯",
  "icon": "news",
  "sites": [
    {
      "name": "今日头条",
      "url": "https://www.toutiao.com",
      "color": "#ff4040"
    },
    {
      "name": "36氪",
      "url": "https://36kr.com",
      "color": "#0061ff"
    },
    {
      "name": "虎嗅",
      "url": "https://www.huxiu.com",
      "color": "#ff5a36"
    },
    {
      "name": "澎湃新闻",
      "url": "https://www.thepaper.cn",
      "color": "#ff7700"
    },
    {
      "name": "网易新闻",
      "url": "https://news.163.com",
      "color": "#c20c02"
    },
    {
      "name": "腾讯新闻",
      "url": "https://news.qq.com",
      "color": "#0f81c7"
    },
    {
      "name": "界面新闻",
      "url": "https://www.jiemian.com",
      "color": "#1a73e8"
    },
    {
      "name": "凤凰新闻",
      "url": "https://news.ifeng.com",
      "color": "#ff5500"
    },
    {
      "name": "BBC中文",
      "url": "https://www.bbc.com/zhongwen",
      "color": "#bb1919"
    },
    {
      "name": "路透社",
      "url": "https://www.reuters.com",
      "color": "#ff6600"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#0061ff"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="11" width="12" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="14" width="8" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="17" width="6" height="1.5" rx="0.75" fill="#9ec5ff"/><circle cx="20" cy="5" r="3" fill="#ff5a36"/></svg>';
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
