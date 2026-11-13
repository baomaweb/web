/**
 * 宝马生活-网址导航 - 通用应用逻辑
 * 主题切换 + 首页渲染 + 分类页渲染 + 自定义 favicon 加载
 *
 * favicon 来源：data.js 中每个网站的 favicon 字段
 *   - 本地路径如 "favicons/google.png"
 *   - 远程 URL 如 "https://...favicon.ico"
 *   - 留空则显示首字母色块 fallback
 */

// ==================== Memory State ====================
var store = (function() {
  var state = { theme: 'dark' };
  return {
    get: function(key) { return key === undefined ? state : state[key]; },
    set: function(patch) { Object.keys(patch).forEach(function(k) { state[k] = patch[k]; }); }
  };
})();

// ==================== Theme ====================
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

// ==================== AdSense: 首页广告代码（独立代码块，仅首页使用） ====================
// 首页共有 3 个广告位：网格广告 1（第 3-4 行第 1-2 列，占 2×2 四格）、
// 网格广告 2（第 6-7 行第 5-6 列，占 2×2 四格）、页尾横幅。
// 部署时请替换为 AdSense 后台的真实值：
//   client : 你的发布商 ID，形如 ca-pub-1234567890123456
//   grid1  : 网格广告 1 的广告单元 ID（在 AdSense 后台「广告单元」中创建，10 位左右数字）
//   grid2  : 网格广告 2 的广告单元 ID
//   bottom : 首页页尾广告的广告单元 ID
// 注意：每个广告位必须使用独立的广告单元 ID。同一页面重复使用同一个广告单元 ID 时，
//       AdSense 只会渲染第一个，其余广告位不显示，导致网格广告只显示部分。
var HOME_AD_UNITS = {
  client: 'ca-pub-6172791470588821',
  grid1: '5061294877',
  grid2: '1053767107',
  bottom: '9874637852'
};

function homeAdCardHtml(slotKey) {
  // 两个广告位使用不同定位类：grid1 -> 第 3-4 行第 1-2 列；grid2 -> 第 6-7 行第 5-6 列
  var posClass = slotKey === 'grid2' ? 'ad-card--pos2' : 'ad-card--pos1';
  var h = '';
  h += '<div class="ad-card ' + posClass + '">';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="' + HOME_AD_UNITS.client + '"\n';
  h += '     data-ad-slot="' + HOME_AD_UNITS[slotKey] + '"\n';
  h += '     data-ad-format="horizontal"\n';
  h += '     data-full-width-responsive="true"></ins>\n';
  h += '</div>';
  return h;
}

// ==================== Home Render ====================
function renderHome() {
  var grid = document.getElementById('catGrid');
  if (!grid) return;
  var html = '';

  CATEGORIES.forEach(function(cat, idx) {
    var iconSvg = ICON_SVG[cat.icon] || '';
    var tint = getCardTint(idx);
    var tintColor = store.get('theme') === 'light' ? tint.light : tint.dark;

    html += '<a href="' + encodeURIComponent(cat.name) + '.html" class="cat-card" role="button">';
    html += '<span class="cat-card-tint" style="background:' + tintColor + '"></span>';
    html += '<div class="cat-card-icon">' + iconSvg + '</div>';
    html += '<div class="cat-card-name">' + cat.name + '</div>';
    html += '</a>';
  });

  // 两个广告格由 CSS 显式定位到指定行列（不参与分类卡片自动流占位），统一追加在末尾
  html += homeAdCardHtml('grid1');
  html += homeAdCardHtml('grid2');

  grid.innerHTML = html;
  pushAllAds();
}

// ==================== Init ====================
initTheme();


// ==================== AdSense: render dynamic ads ====================
function pushAllAds() {
  var nodes = document.querySelectorAll('ins.adsbygoogle');
  for (var i = 0; i < nodes.length; i++) {
    if (!nodes[i].getAttribute('data-adsbygoogle-status')) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
}
