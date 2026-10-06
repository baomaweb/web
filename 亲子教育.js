/**
 * 亲子教育 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "kids",
  "name": "亲子教育",
  "icon": "kids",
  "sites": [
    {
      "name": "宝宝巴士",
      "url": "https://www.babybus.com",
      "color": "#ff8a00"
    },
    {
      "name": "小伴龙",
      "url": "https://www.xiaobanlong.com",
      "color": "#4ecdc4"
    },
    {
      "name": "凯叔讲故事",
      "url": "https://www.kaishu.cn",
      "color": "#ff6b6b"
    },
    {
      "name": "学而思网校",
      "url": "https://www.xueersi.com",
      "color": "#e94560"
    },
    {
      "name": "猿辅导",
      "url": "https://www.yuanfudao.com",
      "color": "#f96060"
    },
    {
      "name": "作业帮",
      "url": "https://www.zybang.com",
      "color": "#ff7a00"
    },
    {
      "name": "洪恩识字",
      "url": "https://www.ihuman.com",
      "color": "#e8382e"
    },
    {
      "name": "叫叫阅读",
      "url": "https://www.j-jia.com",
      "color": "#ff9500"
    },
    {
      "name": "火花思维",
      "url": "https://www.huohua.cn",
      "color": "#ff5050"
    },
    {
      "name": "巧虎",
      "url": "https://www.qiaohu.com",
      "color": "#ff6600"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5" fill="#ff8a00"/><path d="M7 14c-3 2-5 6-5 6h20s-2-4-5-6" fill="#4ecdc4"/><circle cx="10" cy="8" r="1.5" fill="#fff"/><circle cx="14" cy="8" r="1.5" fill="#fff"/><path d="M10 11h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M5 9q-1-3-2-3M19 9q1-3 2-3" stroke="#ff6b6b" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>';
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
