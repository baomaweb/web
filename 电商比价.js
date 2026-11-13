/**
 * 电商比价 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "price",
  "name": "电商比价",
  "icon": "price",
  "sites": [
    {
      "name": "什么值得买",
      "url": "https://www.smzdm.com",
      "color": "#ff4d4f"
    },
    {
      "name": "慢慢买",
      "url": "https://www.manmanbuy.com",
      "color": "#e60012"
    },
    {
      "name": "返利网",
      "url": "https://www.fanli.com",
      "color": "#ff6a00"
    },
    {
      "name": "一淘",
      "url": "https://www.etao.com",
      "color": "#ff5000"
    },
    {
      "name": "购物党",
      "url": "https://www.gwdang.com",
      "color": "#ff6a00"
    },
    {
      "name": "省钱快报",
      "url": "https://www.shengqian.com",
      "color": "#ff4d6d"
    },
    {
      "name": "折800",
      "url": "https://www.zhe800.com",
      "color": "#ff4d4f"
    },
    {
      "name": "网易严选",
      "url": "https://you.163.com",
      "color": "#c7000b"
    },
    {
      "name": "京东联盟",
      "url": "https://union.jd.com",
      "color": "#e1251b"
    },
    {
      "name": "淘宝联盟",
      "url": "https://pub.alimama.com",
      "color": "#ff5000"
    },
    {
      "name": "京东",
      "url": "https://www.jd.com",
      "color": "#e1251b"
    },
    {
      "name": "天猫",
      "url": "https://www.tmall.com",
      "color": "#ff0036"
    },
    {
      "name": "淘宝",
      "url": "https://www.taobao.com",
      "color": "#ff5000"
    },
    {
      "name": "拼多多",
      "url": "https://www.pinduoduo.com",
      "color": "#e02e24"
    },
    {
      "name": "苏宁易购",
      "url": "https://www.suning.com",
      "color": "#ff6a00"
    },
    {
      "name": "当当网",
      "url": "https://www.dangdang.com",
      "color": "#c7000b"
    },
    {
      "name": "亚马逊中国",
      "url": "https://www.amazon.cn",
      "color": "#ff9900"
    },
    {
      "name": "小米商城",
      "url": "https://www.mi.com",
      "color": "#ff6a00"
    },
    {
      "name": "华为商城",
      "url": "https://www.vmall.com",
      "color": "#c7000b"
    },
    {
      "name": "国美",
      "url": "https://www.gome.com.cn",
      "color": "#c7000b"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M3 3h9l9 9-9 9-9-9z" fill="#ff6a00"/><circle cx="8" cy="8" r="2" fill="#fff"/><path d="M12 14h4M12 17h3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
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
