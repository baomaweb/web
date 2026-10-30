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

// ==================== AdSense 网格卡片模板 ====================
function adCardHtml(variant) {
  var cls = 'ad-card';
  if (variant === 'span2') cls += ' ad-card--span2';
  else if (variant === 'span2x2') cls += ' ad-card--span2x2';
  else if (variant === 'colspan2') cls += ' ad-card--colspan2';
  else if (variant === 'pos1') cls += ' ad-card--pos1';
  else if (variant === 'pos2') cls += ' ad-card--pos2';
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<!-- 部署时请将 ca-pub-6172791470588821 替换为你的真实发布商 ID，将 data-ad-slot 替换为 AdSense 后台创建的广告单元 ID -->\n';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="ca-pub-6172791470588821"\n';
  h += '     data-ad-slot="3745621701"\n';
  h += '     data-ad-format="auto"\n';
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
      html += adCardHtml('colspan2');
    }
    // 第 2 个 AdSense 网格卡片：第 4 行最右侧横向占 2 格（第 4 行第 5-6 列），与第 1 个不相邻
    if (idx === 20) {
      html += adCardHtml('colspan2');
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
