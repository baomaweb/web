/**
 * 影音娱乐 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "video",
  "name": "影音娱乐",
  "icon": "video",
  "sites": [
   { name: 'B站', url: 'https://www.bilibili.com', favicon: 'favicon/video/bilibili.ico' },
   { name: '优酷', url: 'https://www.youku.com', favicon: 'favicon/video/www.youku.com.ico' },
   { name: '爱奇艺', url: 'https://www.iqiyi.com', favicon: 'favicon/video/www.iqiyi.com.ico' },
   { name: '腾讯视频', url: 'https://v.qq.com', favicon: 'favicon/video/腾讯视频.png' },
   { name: '芒果TV', url: 'https://www.mgtv.com', favicon: 'favicon/video/www.mgtv.com.png' },
   { name: 'QQ音乐', url: 'https://y.qq.com', favicon: 'favicon/video/y.qq.com.ico' },
   { name: '汽水音乐', url: 'https://www.qishui.com/', favicon: 'favicon/video/www.qishui.com.png' },
   { name: 'Spotify', url: 'https://www.spotify.com', favicon: 'favicon/video/spotify.ico' },
   { name: 'apple music', url: 'https://music.apple.com', favicon: 'favicon/video/apple.png' },
   { name: '抖音', url: 'https://www.douyin.com', favicon: 'favicon/video/www.douyin.com.ico' },
   { name: '快手', url: 'https://www.kuaishou.com', favicon: 'favicon/video/快手.ico' },
   { name: '红果短剧', url: 'https://hongguoduanju.com/', favicon: 'favicon/video/红果.png' },
   { name: '河马剧场', url: 'https://www.kuaikaw.cn//', favicon: 'favicon/video/河马.ico' },
   { name: 'YouTube', url: 'https://www.youtube.com', 'color': '#ff0000'},
   { name: '网易云音乐', url: 'https://music.163.com', favicon: 'favicon/video/music.163.com.ico' },
   { name: '酷狗音乐', url: 'https://www.kugou.com/', favicon: 'favicon/video/www.kugou.com.ico' },
   { name: '咪咕音乐', url: 'https://music.migu.cn/', favicon: 'favicon/video/www.mgtv.com.png' },
   { name: '酷我音乐', url: 'https://www.kuwo.cn', favicon: 'favicon/video/www.mgtv.com.png' },
   { name: '波点音乐', url: 'https://bodian.kuwo.cn', favicon: 'favicon/video/bodian.kuwo.cn.ico' },
   { name: '番茄音乐', url: 'https://www.novelfm.com/', favicon: 'favicon/video/www.novelfm.com.png' },
   { name: '千千音乐', url: 'https://music.91q.com', favicon: 'favicon/video/music.91q.com.ico' },
   { name: '懒人听书', url: 'https://www.lrts.me', favicon: 'favicon/video/www.lrts.me.ico' },
   { name: '蜻蜓fm', url: 'https://www.qtfm.cn', favicon: 'favicon/video/www.qtfm.cn.png' },
   { name: '喜马拉雅', url: 'https://www.ximalaya.com', favicon: 'favicon/video/www.ximalaya.com.ico' },
   { name: '荔枝fm', url: 'https://www.lizhi.fm', favicon: 'favicon/video/www.lizhi.fm.ico' },
   { name: '5sing', url: 'https://5sing.kugou.com/', favicon: 'favicon/video/5sing.kugou.com.png' },
   { name: '九天音乐', url: 'http://9sky.com/', favicon: 'favicon/video/9sky.com.png' },
   { name: '酷6音乐', url: 'https://www.ku6.com', 'color': '#000000' },
   { name: '5ND音乐', url: 'https://www.5nd.com', favicon: 'favicon/video/www.5nd.com.ico' },
   { name: '豆瓣音乐', url: 'https://music.douban.com', favicon: 'favicon/video/music.douban.com.ico' },
   { name: '唱吧', url: 'https://changba.com', favicon: 'favicon/video/changba.com.ico' },
   { name: '全民k歌', url: 'https://kg.qq.com', favicon: 'favicon/video/kg.qq.com.ico' },
   
 

  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" fill="#fb7299"/><path d="m10 9 5 3-5 3z" fill="#fff"/><circle cx="19" cy="6" r="2.5" fill="#00be06"/><circle cx="5" cy="6" r="2" fill="#ff6022"/></svg>';
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
