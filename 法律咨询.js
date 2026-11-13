/**
 * 法律咨询 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "law",
  "name": "法律咨询",
  "icon": "law",
  "sites": [
    {
      "name": "中国裁判文书网",
      "url": "https://wenshu.court.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "北大法宝",
      "url": "https://www.pkulaw.com",
      "color": "#1a3f8f"
    },
    {
      "name": "无讼",
      "url": "https://www.itslaw.com",
      "color": "#2c8fbb"
    },
    {
      "name": "找法网",
      "url": "https://www.findlaw.cn",
      "color": "#2d8cff"
    },
    {
      "name": "华律网",
      "url": "https://www.66law.cn",
      "color": "#e03a1d"
    },
    {
      "name": "威科先行",
      "url": "https://www.wkinfo.com.cn",
      "color": "#0056d2"
    },
    {
      "name": "国家法律法规数据库",
      "url": "https://flk.npc.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "中顾法律网",
      "url": "https://www.9ask.cn",
      "color": "#1a73e8"
    },
    {
      "name": "法信",
      "url": "https://www.faxin.cn",
      "color": "#1a5c7a"
    },
    {
      "name": "法律图书馆",
      "url": "https://www.law-lib.com",
      "color": "#0066cc"
    },
    {
      "name": "中国法院网",
      "url": "https://www.chinacourt.org",
      "color": "#c7000b"
    },
    {
      "name": "法律快车",
      "url": "https://www.lawtime.cn",
      "color": "#1a73e8"
    },
    {
      "name": "律师365",
      "url": "https://www.64365.com",
      "color": "#0066cc"
    },
    {
      "name": "汇法网",
      "url": "https://www.lawxp.com",
      "color": "#1a5c7a"
    },
    {
      "name": "中国普法网",
      "url": "http://www.legalinfo.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "司法部",
      "url": "https://www.moj.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "110网",
      "url": "https://www.110.com",
      "color": "#c7000b"
    },
    {
      "name": "法律教育网",
      "url": "https://www.chinalawedu.com",
      "color": "#1a73e8"
    },
    {
      "name": "大律师网",
      "url": "https://www.maxlaw.cn",
      "color": "#0066cc"
    },
    {
      "name": "中国律师网",
      "url": "http://www.acla.org.cn",
      "color": "#c7000b"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M12 3v18M5 8h14" stroke="#1a3f8f" stroke-width="2" stroke-linecap="round"/><path d="M5 8 2 14h6zM19 8l-3 6h6z" fill="#c7000b"/><path d="M8 21h8" stroke="#1a3f8f" stroke-width="2" stroke-linecap="round"/></svg>';
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
