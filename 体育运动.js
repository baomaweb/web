/**
 * 体育运动 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "sports",
  "name": "体育运动",
  "icon": "sports",
  "sites": [
    {
      "name": "虎扑",
      "url": "https://www.hupu.com",
      "color": "#ff6600"
    },
    {
      "name": "直播吧",
      "url": "https://www.zhibo8.com",
      "color": "#1a73e8"
    },
    {
      "name": "懂球帝",
      "url": "https://www.dongqiudi.com",
      "color": "#00a0a0"
    },
    {
      "name": "CCTV5",
      "url": "https://tv.cctv.com",
      "color": "#c7000b"
    },
    {
      "name": "新浪体育",
      "url": "https://sports.sina.com.cn",
      "color": "#ff0000"
    },
    {
      "name": "腾讯体育",
      "url": "https://sports.qq.com",
      "color": "#0f81c7"
    },
    {
      "name": "ESPN",
      "url": "https://www.espn.com",
      "color": "#cc0000"
    },
    {
      "name": "NBA中文",
      "url": "https://china.nba.com",
      "color": "#17408b"
    },
    {
      "name": "虎扑跑步",
      "url": "https://run.hupu.com",
      "color": "#ff6600"
    },
    {
      "name": "悦跑圈",
      "url": "https://www.joyrun.com",
      "color": "#00be06"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#ff6600"/><path d="M3 12c4 0 9-4 9-9M12 3c0 5 5 9 9 9M21 12c-4 0-9 4-9 9M12 21c0-5-5-9-9-9" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/></svg>';
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
