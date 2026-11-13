/**
 * 设计资源 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "design",
  "name": "设计资源",
  "icon": "design",
  "sites": [
    {
      "name": "Dribbble",
      "url": "https://dribbble.com",
      "color": "#ea4c89"
    },
    {
      "name": "Behance",
      "url": "https://www.behance.net",
      "color": "#1769ff"
    },
    {
      "name": "Figma",
      "url": "https://www.figma.com",
      "color": "#a259ff"
    },
    {
      "name": "Sketch",
      "url": "https://www.sketch.com",
      "color": "#f7b500"
    },
    {
      "name": "Unsplash",
      "url": "https://unsplash.com",
      "color": "#000000"
    },
    {
      "name": "Pexels",
      "url": "https://www.pexels.com",
      "color": "#05a081"
    },
    {
      "name": "iconfont",
      "url": "https://www.iconfont.cn",
      "color": "#2c8cff"
    },
    {
      "name": "Lucide Icons",
      "url": "https://lucide.dev",
      "color": "#000000"
    },
    {
      "name": "Coolors",
      "url": "https://coolors.co",
      "color": "#ff6b6b"
    },
    {
      "name": "Google Fonts",
      "url": "https://fonts.google.com",
      "color": "#4285f4"
    },
    {
      "name": "Adobe",
      "url": "https://www.adobe.com/cn",
      "color": "#fa0f00"
    },
    {
      "name": "稿定设计",
      "url": "https://www.gaoding.com",
      "color": "#ff6a00"
    },
    {
      "name": "站酷海洛",
      "url": "https://www.hellorf.com",
      "color": "#0066cc"
    },
    {
      "name": "优设",
      "url": "https://www.uisdc.com",
      "color": "#1a73e8"
    },
    {
      "name": "蓝湖",
      "url": "https://lanhuapp.com",
      "color": "#2d8cff"
    },
    {
      "name": "UI中国",
      "url": "https://www.ui.cn",
      "color": "#1a73e8"
    },
    {
      "name": "设计癖",
      "url": "https://www.shejipi.com",
      "color": "#ff6a00"
    },
    {
      "name": "普象网",
      "url": "https://www.pulidesign.com",
      "color": "#00a0a0"
    },
    {
      "name": "古田路9号",
      "url": "https://www.gtn9.com",
      "color": "#c7000b"
    },
    {
      "name": "字体传奇",
      "url": "https://www.ziticq.com",
      "color": "#8b1a1a"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#a259ff"/><circle cx="19" cy="5" r="2.5" fill="#ea4c89"/><circle cx="5" cy="19" r="2.5" fill="#f7b500"/><path d="M19 5 5 19" stroke="#1769ff" stroke-width="1.5"/><path d="M14 12l5-7M12 14l-7 5" stroke="#2c8cff" stroke-width="1" fill="none" stroke-dasharray="2 2"/></svg>';
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
