/**
 * 搜索引擎 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "search",
  "name": "搜索引擎",
  "icon": "search",
  "sites": [
    {
      "name": "google ",
      "url": "https://www.google.com/",
      "color": "#4e6ef2",
      "favicon": "favicon/search/google.ico"
    },
    {
      "name": "百度 ",
      "url": "https://www.baidu.com/",
      "color": "#00a0a0",
      "favicon": "favicon/search/baidu.ico"
    },
    {
      "name": "bing ",
      "url": "https://cn.bing.com/",
      "color": "#ff6a00",
      "favicon": "favicon/search/bing.ico"
    },
    {
      "name": "360搜索 ",
      "url": "https://www.so.com/",
      "color": "#e60012",
      "favicon": "favicon/search/360.ico"
    },
    {
      "name": "搜狗 ",
      "url": "https://www.sogou.com/",
      "color": "#1a73e8",
      "favicon": "favicon/search/搜狗.ico"
    },
    {
      "name": "搜搜 ",
      "url": "https://www.soso.com/",
      "color": "#00b38a",
      "favicon": "favicon/search/搜搜.ico"
    },
    {
      "name": "今日头条 ",
      "url": "https://www.toutiao.com/",
      "color": "#c7000b",
      "favicon": "favicon/search/toutiao.ico"
    },
    {
      "name": "Naver ",
      "url": "https://www.naver.com/",
      "color": "#2c8fbb",
      "favicon": "favicon/search/naver.ico"
    },
    {
      "name": "yandex ",
      "url": "https://ya.ru/",
      "color": "#ff5000",
      "favicon": "favicon/search/yandex.png"
    },
    {
      "name": "Ceek ",
      "url": "http://www.ceek.jp/",
      "color": "#8b1a1a",
      "favicon": "favicon/search/ceek.ico"
    },
    {
      "name": "中国搜索 ",
      "url": "http://www.chinaso.com/",
      "color": "#4e6ef2",
      "favicon": "favicon/search/中国搜索.ico"
    },
    {
      "name": "新浪爱问 ",
      "url": "https://iask.sina.com.cn/",
      "color": "#00a0a0",
      "favicon": "favicon/search/iask.ico"
    },
    {
      "name": "hotbot ",
      "url": "https://www.hotbot.com/",
      "color": "#ff6a00",
      "favicon": "favicon/search/hotbot.png"
    },
    {
      "name": "looksmart ",
      "url": "https://www.looksmart.com/",
      "color": "#e60012",
      "favicon": "favicon/search/looksmart.ico"
    },
    {
      "name": "lycos ",
      "url": "https://www.lycos.com",
      "color": "#1a73e8",
      "favicon": "favicon/search/lycos.png"
    },
    {
      "name": "DuckDuckGo ",
      "url": "https://duckduckgo.com",
      "color": "#00b38a",
      "favicon": "favicon/search/duckduckgo.ico"
    },
    {
      "name": "Ecosia ",
      "url": "https://www.ecosia.org",
      "color": "#c7000b",
      "favicon": "favicon/search/ecosia.ico"
    },
    {
      "name": "Startpage ",
      "url": "https://www.startpage.com",
      "color": "#2c8fbb",
      "favicon": "favicon/search/startpage.ico"
    },
    {
      "name": "Brave Search ",
      "url": "https://search.brave.com",
      "color": "#ff5000",
      "favicon": "favicon/search/brave.png"
    },
    {
      "name": "Bing",
      "url": "https://www.bing.com",
      "color": "#0078d4"
    },
    {
      "name": "Yandex",
      "url": "https://yandex.com",
      "color": "#ff3333"
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
