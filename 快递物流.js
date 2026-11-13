/**
 * 快递物流 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "express",
  "name": "快递物流",
  "icon": "express",
  "sites": [
    {
      "name": "顺丰速运",
      "url": "https://www.sf-express.com",
      "color": "#000000"
    },
    {
      "name": "中通快递",
      "url": "https://www.zto.com",
      "color": "#0066cc"
    },
    {
      "name": "圆通速递",
      "url": "https://www.yto.net.cn",
      "color": "#e60012"
    },
    {
      "name": "韵达快递",
      "url": "https://www.yundaex.com",
      "color": "#ff6a00"
    },
    {
      "name": "申通快递",
      "url": "https://www.sto.cn",
      "color": "#c7000b"
    },
    {
      "name": "京东物流",
      "url": "https://www.jdl.cn",
      "color": "#e1251b"
    },
    {
      "name": "菜鸟网络",
      "url": "https://www.cainiao.com",
      "color": "#ff5000"
    },
    {
      "name": "中国邮政",
      "url": "https://www.ems.com.cn",
      "color": "#007a33"
    },
    {
      "name": "德邦快递",
      "url": "https://www.deppon.com",
      "color": "#005bac"
    },
    {
      "name": "极兔速递",
      "url": "https://www.jtexpress.com",
      "color": "#e60012"
    },
    {
      "name": "跨越速运",
      "url": "https://www.ky-express.com",
      "color": "#0066cc"
    },
    {
      "name": "宅急送",
      "url": "https://www.zjs.com.cn",
      "color": "#ff6a00"
    },
    {
      "name": "快递100",
      "url": "https://www.kuaidi100.com",
      "color": "#00b38a"
    },
    {
      "name": "丰巢",
      "url": "https://www.fengcang.com",
      "color": "#00a0a0"
    },
    {
      "name": "安能物流",
      "url": "https://www.ane56.com",
      "color": "#ff6a00"
    },
    {
      "name": "百世快递",
      "url": "https://www.800best.com",
      "color": "#e60012"
    },
    {
      "name": "天天快递",
      "url": "https://www.ttkdex.com",
      "color": "#0066cc"
    },
    {
      "name": "DHL",
      "url": "https://www.dhl.com",
      "color": "#ffcc00"
    },
    {
      "name": "FedEx",
      "url": "https://www.fedex.com",
      "color": "#4d148c"
    },
    {
      "name": "UPS",
      "url": "https://www.ups.com",
      "color": "#351c15"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="8" width="12" height="9" rx="1" fill="#ff6a00"/><path d="M14 10h4l3 4v3h-7z" fill="#1a73e8"/><circle cx="7" cy="18" r="2" fill="#333"/><circle cx="17" cy="18" r="2" fill="#333"/><path d="M5 11h7M5 13.5h5" stroke="#fff" stroke-width="1.2"/></svg>';
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
