/**
 * 社交媒体 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "social",
  "name": "社交媒体",
  "icon": "social",
  "sites": [
    {
      "name": "微博",
      "url": "https://weibo.com",
      "color": "#e6162d"
    },
    {
      "name": "微信网页版",
      "url": "https://wx.qq.com",
      "color": "#07c160"
    },
    {
      "name": "小红书",
      "url": "https://www.xiaohongshu.com",
      "color": "#ff2741"
    },
    {
      "name": "知乎",
      "url": "https://www.zhihu.com",
      "color": "#0084ff"
    },
    {
      "name": "豆瓣",
      "url": "https://www.douban.com",
      "color": "#007722"
    },
    {
      "name": "X (Twitter)",
      "url": "https://x.com",
      "color": "#1a1a1a"
    },
    {
      "name": "Reddit",
      "url": "https://www.reddit.com",
      "color": "#ff4500"
    },
    {
      "name": "Facebook",
      "url": "https://www.facebook.com",
      "color": "#1877f2"
    },
    {
      "name": "Instagram",
      "url": "https://www.instagram.com",
      "color": "#e4405f"
    },
    {
      "name": "LinkedIn",
      "url": "https://www.linkedin.com",
      "color": "#0a66c2"
    },
    {
      "name": "快手",
      "url": "https://www.kuaishou.com",
      "color": "#ff4d00"
    },
    {
      "name": "百度贴吧",
      "url": "https://tieba.baidu.com",
      "color": "#3385ff"
    },
    {
      "name": "TikTok",
      "url": "https://www.tiktok.com",
      "color": "#000000"
    },
    {
      "name": "Snapchat",
      "url": "https://www.snapchat.com",
      "color": "#fffc00"
    },
    {
      "name": "Pinterest",
      "url": "https://www.pinterest.com",
      "color": "#e60023"
    },
    {
      "name": "Telegram",
      "url": "https://telegram.org",
      "color": "#229ed9"
    },
    {
      "name": "Discord",
      "url": "https://discord.com",
      "color": "#5865f2"
    },
    {
      "name": "脉脉",
      "url": "https://maimai.cn",
      "color": "#00b38a"
    },
    {
      "name": "即刻",
      "url": "https://okjike.com",
      "color": "#ffcc00"
    },
    {
      "name": "虎扑",
      "url": "https://www.hupu.com",
      "color": "#c7000b"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3" fill="#e6162d"/><circle cx="18" cy="6" r="3" fill="#1a73e8"/><circle cx="18" cy="18" r="3" fill="#00ba34"/><path d="M9 12h6M6 10l9-3M6 14l9 3" stroke="#5f6368" stroke-width="1.5" fill="none"/></svg>';
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
