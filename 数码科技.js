/**
 * 数码科技 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "digital",
  "name": "数码科技",
  "icon": "digital",
  "sites": [
    {
      "name": "中关村在线",
      "url": "https://www.zol.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "太平洋电脑网",
      "url": "https://www.pconline.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "IT之家",
      "url": "https://www.ithome.com",
      "color": "#ff4d4f"
    },
    {
      "name": "快科技",
      "url": "https://www.mydrivers.com",
      "color": "#c7000b"
    },
    {
      "name": "爱范儿",
      "url": "https://www.ifanr.com",
      "color": "#1a73e8"
    },
    {
      "name": "少数派",
      "url": "https://sspai.com",
      "color": "#ff5a1f"
    },
    {
      "name": "数字尾巴",
      "url": "https://www.dgtle.com",
      "color": "#00a0a0"
    },
    {
      "name": "极客公园",
      "url": "https://www.geekpark.net",
      "color": "#1a1a1a"
    },
    {
      "name": "锋潮科技",
      "url": "https://www.feng.com",
      "color": "#ff6a00"
    },
    {
      "name": "电脑报",
      "url": "https://www.cpcw.com",
      "color": "#0066cc"
    },
    {
      "name": "苹果",
      "url": "https://www.apple.com.cn",
      "color": "#1a1a1a"
    },
    {
      "name": "华为",
      "url": "https://www.huawei.com/cn",
      "color": "#c7000b"
    },
    {
      "name": "小米",
      "url": "https://www.mi.com",
      "color": "#ff6a00"
    },
    {
      "name": "三星",
      "url": "https://www.samsung.com.cn",
      "color": "#1a3f8f"
    },
    {
      "name": "OPPO",
      "url": "https://www.oppo.com/cn",
      "color": "#00b38a"
    },
    {
      "name": "vivo",
      "url": "https://www.vivo.com.cn",
      "color": "#1a73e8"
    },
    {
      "name": "荣耀",
      "url": "https://www.honor.com/cn",
      "color": "#00a0e9"
    },
    {
      "name": "一加",
      "url": "https://www.oneplus.com/cn",
      "color": "#c7000b"
    },
    {
      "name": "魅族",
      "url": "https://www.meizu.com",
      "color": "#00a0e9"
    },
    {
      "name": "联想",
      "url": "https://www.lenovo.com.cn",
      "color": "#e60012"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="#1a73e8"/><rect x="9" y="9" width="6" height="6" rx="1" fill="#fff"/><path d="M2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" stroke="#ff5a1f" stroke-width="1.5" stroke-linecap="round"/></svg>';
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
