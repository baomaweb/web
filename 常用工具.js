/**
 * 常用工具 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "tools",
  "name": "常用工具",
  "icon": "tools",
  "sites": [
    {
      "name": "剪映",
      "url": "https://www.capcut.cn",
      "color": "#4e6ef2",
      "favicon": "favicon/tools/剪映.png"
    },
    {
      "name": "有道翻译",
      "url": "https://fanyi.youdao.com",
      "color": "#00a0a0",
      "favicon": "favicon/tools/有道翻译.png"
    },
    {
      "name": "DeepL",
      "url": "https://www.deepl.com",
      "color": "#ff6a00",
      "favicon": "favicon/tools/deepl.png"
    },
    {
      "name": "Google翻译",
      "url": "https://translate.google.com",
      "color": "#e60012",
      "favicon": "favicon/tools/Google翻译.ico"
    },
    {
      "name": "阿里翻译",
      "url": "https://translate.alibaba.com",
      "color": "#1a73e8",
      "favicon": "favicon/tools/阿里翻译.ico"
    },
    {
      "name": "必应翻译",
      "url": "https://www.bing.com/translator",
      "color": "#00b38a",
      "favicon": "favicon/tools/bing翻译.png"
    },
    {
      "name": "草料二维码",
      "url": "https://cli.im",
      "color": "#c7000b",
      "favicon": "favicon/tools/草料.ico"
    },
    {
      "name": "TinyPNG",
      "url": "https://tinypng.com",
      "color": "#2c8fbb",
      "favicon": "favicon/tools/tinypng.png"
    },
    {
      "name": "removebg",
      "url": "https://www.remove.bg",
      "color": "#ff5000",
      "favicon": "favicon/tools/remove.ico"
    },
    {
      "name": "Photopea",
      "url": "https://www.photopea.com",
      "color": "#8b1a1a",
      "favicon": "favicon/tools/photopea.png"
    },
    {
      "name": "腾讯文档",
      "url": "https://docs.qq.com",
      "color": "#1677ff"
    },
    {
      "name": "幕布",
      "url": "https://mubu.com",
      "color": "#ff6b6b"
    },
    {
      "name": "百度翻译",
      "url": "https://fanyi.baidu.com",
      "color": "#2932e1"
    },
    {
      "name": "菜鸟教程",
      "url": "https://www.runoob.com",
      "color": "#3cb371"
    },
    {
      "name": "Wolfram Alpha",
      "url": "https://www.wolframalpha.com",
      "color": "#dd1100"
    },
    {
      "name": "阿里云盘",
      "url": "https://www.alipan.com",
      "color": "#00a0e9"
    },
    {
      "name": "百度网盘",
      "url": "https://pan.baidu.com",
      "color": "#2932e1"
    },
    {
      "name": "夸克网盘",
      "url": "https://pan.quark.cn",
      "color": "#1a73e8"
    },
    {
      "name": "迅雷",
      "url": "https://www.xunlei.com",
      "color": "#1a73e8"
    },
    {
      "name": "在线工具",
      "url": "https://tool.lu",
      "color": "#00a0a0"
    },
    {
      "name": "创客贴",
      "url": "https://www.chuangkit.com",
      "color": "#2d7cff"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.1-2.1z" fill="#f59e0b"/><circle cx="17.5" cy="6.5" r="2.5" fill="#3cb371"/></svg>';
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
