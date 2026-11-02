/**
 * NavHub - 通用应用逻辑
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


var HOME_AD_UNITS = {
  client: 'ca-pub-6172791470588821',
  grid1: '5061294877',
  grid2: '1053767107',
  bottom: '9874637852'
};

function homeAdCardHtml(slotKey) {
  var h = '';
  h += '<div class="ad-card ad-card--colspan2">';
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
  var adInserted1 = false;
  var adInserted2 = false;

  CATEGORIES.forEach(function(cat, idx) {
    // 第 1 个 AdSense 网格卡片：第 2 行左侧，横向占 2 格（第 2 行第 1-2 列）
    if (idx === 6) {
      html += homeAdCardHtml('grid1');
    }
    // 第 2 个 AdSense 网格卡片：第 4 行最右侧横向占 2 格（第 4 行第 5-6 列），与第 1 个不相邻
    if (idx === 20) {
      html += homeAdCardHtml('grid2');
    }

    var iconSvg = ICON_SVG[cat.icon] || '';
    var tint = getCardTint(idx);
    var tintColor = store.get('theme') === 'light' ? tint.light : tint.dark;

    html += '<a href="' + encodeURIComponent(cat.name) + '.html" class="cat-card" role="button">';
    html += '<span class="cat-card-tint" style="background:' + tintColor + '"></span>';
    html += '<div class="cat-card-icon">' + iconSvg + '</div>';
    html += '<div class="cat-card-name">' + cat.name + '</div>';
    html += '</a>';
  });
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
