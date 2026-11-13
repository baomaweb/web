/**
 * 时尚美妆 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "fashion",
  "name": "时尚美妆",
  "icon": "fashion",
  "sites": [
    {
      "name": "VOGUE",
      "url": "https://www.vogue.com.cn",
      "color": "#000000"
    },
    {
      "name": "时尚芭莎",
      "url": "https://www.harpersbazaar.com.cn",
      "color": "#d0021b"
    },
    {
      "name": "ELLE",
      "url": "https://www.ellechina.com",
      "color": "#e60012"
    },
    {
      "name": "瑞丽",
      "url": "https://www.rayli.com.cn",
      "color": "#ff4d6d"
    },
    {
      "name": "海报网",
      "url": "https://www.haibao.com",
      "color": "#ff6b9d"
    },
    {
      "name": "米娜",
      "url": "https://www.mina.com.cn",
      "color": "#e91e63"
    },
    {
      "name": "时尚COSMO",
      "url": "https://www.cosmo.com.cn",
      "color": "#d81b60"
    },
    {
      "name": "蘑菇街",
      "url": "https://www.mogujie.com",
      "color": "#ff4d6d"
    },
    {
      "name": "丝芙兰",
      "url": "https://www.sephora.cn",
      "color": "#000000"
    },
    {
      "name": "屈臣氏",
      "url": "https://www.watsons.com.cn",
      "color": "#00a0a0"
    },
    {
      "name": "唯品会",
      "url": "https://www.vip.com",
      "color": "#ff4d6d"
    },
    {
      "name": "聚美优品",
      "url": "https://www.jumei.com",
      "color": "#ff6b9d"
    },
    {
      "name": "花西子",
      "url": "https://www.huaxizi.com",
      "color": "#d81b60"
    },
    {
      "name": "完美日记",
      "url": "https://www.perfectdiary.com",
      "color": "#ff4d6d"
    },
    {
      "name": "欧莱雅",
      "url": "https://www.loreal.com.cn",
      "color": "#000000"
    },
    {
      "name": "雅诗兰黛",
      "url": "https://www.esteelauder.com.cn",
      "color": "#1a3f8f"
    },
    {
      "name": "兰蔻",
      "url": "https://www.lancome.com.cn",
      "color": "#000000"
    },
    {
      "name": "资生堂",
      "url": "https://www.shiseido.com.cn",
      "color": "#c7000b"
    },
    {
      "name": "悦诗风吟",
      "url": "https://www.innisfree.cn",
      "color": "#00b38a"
    },
    {
      "name": "伊丽莎白雅顿",
      "url": "https://www.elizabetharden.com.cn",
      "color": "#c7000b"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 4h-4z" fill="#e91e63"/><path d="M10 7h4l3 14H7z" fill="#ff6b9d"/><circle cx="12" cy="2.5" r="1.5" fill="#d81b60"/></svg>';
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
