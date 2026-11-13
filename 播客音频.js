/**
 * 播客音频 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "podcast",
  "name": "播客音频",
  "icon": "podcast",
  "sites": [
    {
      "name": "小宇宙",
      "url": "https://www.xiaoyuzhoufm.com",
      "color": "#ff5c00"
    },
    {
      "name": "喜马拉雅",
      "url": "https://www.ximalaya.com",
      "color": "#d43333"
    },
    {
      "name": "荔枝FM",
      "url": "https://www.lizhi.fm",
      "color": "#ff6600"
    },
    {
      "name": "蜻蜓FM",
      "url": "https://www.qingting.fm",
      "color": "#0096ff"
    },
    {
      "name": "网易云音乐",
      "url": "https://music.163.com",
      "color": "#c20c0c"
    },
    {
      "name": "Apple Podcast",
      "url": "https://podcasts.apple.com",
      "color": "#8e44ad"
    },
    {
      "name": "Spotify",
      "url": "https://www.spotify.com",
      "color": "#1db954"
    },
    {
      "name": "Pocket Casts",
      "url": "https://pocketcasts.com",
      "color": "#f43e37"
    },
    {
      "name": "JustPod",
      "url": "https://www.justpod.cn",
      "color": "#1a1a2e"
    },
    {
      "name": "播客小镇",
      "url": "https://www.podtown.cn",
      "color": "#ff4081"
    },
    {
      "name": "猫耳FM",
      "url": "https://www.maoer.com",
      "color": "#ff6b9d"
    },
    {
      "name": "Anchor",
      "url": "https://anchor.fm",
      "color": "#8b5cf6"
    },
    {
      "name": "Castro",
      "url": "https://castro.fm",
      "color": "#ff6a00"
    },
    {
      "name": "Overcast",
      "url": "https://overcast.fm",
      "color": "#fc7e0f"
    },
    {
      "name": "阿基米德",
      "url": "https://www.ajmide.com",
      "color": "#1a73e8"
    },
    {
      "name": "懒人听书",
      "url": "https://www.lrts.me",
      "color": "#ff6a00"
    },
    {
      "name": "企鹅FM",
      "url": "https://fm.qq.com",
      "color": "#1a73e8"
    },
    {
      "name": "QQ音乐",
      "url": "https://y.qq.com",
      "color": "#31c27c"
    },
    {
      "name": "酷我音乐",
      "url": "https://www.kuwo.cn",
      "color": "#ff6a00"
    },
    {
      "name": "Acast",
      "url": "https://www.acast.com",
      "color": "#f5c518"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3" fill="#ff5c00"/><path d="M12 9v8" stroke="#ff5c00" stroke-width="2"/><circle cx="12" cy="20" r="2" fill="#8e44ad"/><path d="M8 16a4 4 0 0 1 8 0" stroke="#1db954" stroke-width="1.5" fill="none"/><path d="M5 14a7 7 0 0 1 14 0" stroke="#d43333" stroke-width="1.5" fill="none" opacity="0.5"/></svg>';
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
