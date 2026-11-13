/**
 * 天气环境 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "weather",
  "name": "天气环境",
  "icon": "weather",
  "sites": [
    {
      "name": "中国天气网",
      "url": "https://www.weather.com.cn",
      "color": "#1a73e8"
    },
    {
      "name": "墨迹天气",
      "url": "https://www.moji.com",
      "color": "#ff6a00"
    },
    {
      "name": "彩云天气",
      "url": "https://www.caiyunapp.com",
      "color": "#2d8cff"
    },
    {
      "name": "AccuWeather",
      "url": "https://www.accuweather.com",
      "color": "#ff6a00"
    },
    {
      "name": "Weather.com",
      "url": "https://weather.com",
      "color": "#1a73e8"
    },
    {
      "name": "空气质量指数",
      "url": "https://www.aqistudy.cn",
      "color": "#00a0a0"
    },
    {
      "name": "Windy",
      "url": "https://www.windy.com",
      "color": "#1a73e8"
    },
    {
      "name": "中央气象台",
      "url": "https://www.nmc.cn",
      "color": "#c7000b"
    },
    {
      "name": "天气后报",
      "url": "https://www.tianqihoubao.com",
      "color": "#00a0a0"
    },
    {
      "name": "中国气象局",
      "url": "https://www.cma.gov.cn",
      "color": "#0066cc"
    },
    {
      "name": "和风天气",
      "url": "https://www.qweather.com",
      "color": "#1a73e8"
    },
    {
      "name": "天气网",
      "url": "https://www.tianqi.com",
      "color": "#2d8cff"
    },
    {
      "name": "2345天气",
      "url": "https://tianqi.2345.com",
      "color": "#ff6a00"
    },
    {
      "name": "中国气象数据网",
      "url": "http://data.cma.cn",
      "color": "#0066cc"
    },
    {
      "name": "天气在线",
      "url": "https://www.t7online.com",
      "color": "#00a0a0"
    },
    {
      "name": "生态环境部",
      "url": "https://www.mee.gov.cn",
      "color": "#00b38a"
    },
    {
      "name": "中国环境监测总站",
      "url": "https://www.cnemc.cn",
      "color": "#00a0a0"
    },
    {
      "name": "蔚蓝地图",
      "url": "https://www.ipe.org.cn",
      "color": "#1a73e8"
    },
    {
      "name": "绿色和平",
      "url": "https://www.greenpeace.org.cn",
      "color": "#00b38a"
    },
    {
      "name": "国家气候中心",
      "url": "http://ncc-cma.net",
      "color": "#0066cc"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4" fill="#ffb700"/><path d="M4 16a4 4 0 0 1 8-1 4 4 0 0 1 7 3H5z" fill="#1a73e8"/><path d="M15 4l1.5 2M20 8h-2M19 3l-1.5 2" stroke="#ff8a00" stroke-width="1.5" stroke-linecap="round"/></svg>';
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

// ==================== AdSense: 分类页广告代码（独立代码块，仅分类页使用） ====================
// 每个分类页共有 3 个广告位：网格广告 1（左上 2x2）、网格广告 2（右中 2x2）、页尾横幅。
// 部署时请替换为 AdSense 后台的真实值：
//   client : 你的发布商 ID，形如 ca-pub-1234567890123456
//   pos1   : 网格广告 1 的广告单元 ID（在 AdSense 后台创建）
//   pos2   : 网格广告 2 的广告单元 ID
//   bottom : 分类页页尾广告的广告单元 ID
// 注意：每个广告位必须使用独立的广告单元 ID。同一页面重复使用同一个广告单元 ID 时，
//       AdSense 只会渲染第一个，其余广告位不显示，导致网格广告只显示部分。
var CATEGORY_AD_UNITS = {
  client: 'ca-pub-6172791470588821',
  pos1: '4869723184',
  pos2: '5751560015',
  bottom: '9862195410'
};

function categoryAdCardHtml(variant) {
  var cls = 'ad-card';
  var slotKey = 'pos1';
  if (variant === 'pos1') { cls += ' ad-card--pos1'; slotKey = 'pos1'; }
  else if (variant === 'pos2') { cls += ' ad-card--pos2'; slotKey = 'pos2'; }
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="' + CATEGORY_AD_UNITS.client + '"\n';
  h += '     data-ad-slot="' + CATEGORY_AD_UNITS[slotKey] + '"\n';
  h += '     data-ad-format="horizontal"\n';
  h += '     data-full-width-responsive="true"></ins>\n';

  h += '</div>';
  return h;
}


// ==================== AdSense: render dynamic ads ====================
function pushAllAds() {
  var nodes = document.querySelectorAll('ins.adsbygoogle');
  for (var i = 0; i < nodes.length; i++) {
    if (!nodes[i].getAttribute('data-adsbygoogle-status')) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
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
      html += categoryAdCardHtml('pos1');
    }
    if (idx === 5) {
      html += categoryAdCardHtml('pos2');
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
  pushAllAds();
}

// ==================== Init ====================
initTheme();
renderCategoryPage();
