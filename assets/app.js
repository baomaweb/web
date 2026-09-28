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
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<!--\n';
  h += '      <ins class="adsbygoogle"\n';
  h += '           style="display:block;width:100%;height:100%"\n';
  h += '           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"\n';
  h += '           data-ad-slot="XXXXXXXXXX"\n';
  h += '           data-ad-format="auto"\n';
  h += '           data-full-width-responsive="true"></ins>\n';
  h += '      <script>(adsbygoogle = window.adsbygoogle || []).push({});</' + 'script>\n';
  h += '-->';
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
    // 第 1 个 AdSense 网格卡片：第 7 个位置（第 2 行第 1 列）
    if (idx === 6) {
      html += adCardHtml();
    }
    // 第 2 个 AdSense 网格卡片：第 14 个位置（第 3 行第 2 列），与第 1 个不相邻
    if (idx === 13) {
      html += adCardHtml();
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
}

// ==================== Category Page Render ====================
function renderCategoryPage() {
  var params = new URLSearchParams(window.location.search);
  var catId = params.get('id') || '';
  var cat = null;
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === catId) { cat = CATEGORIES[i]; break; }
  }
  if (!cat) {
    document.getElementById('headerTitle').textContent = '\u5206\u7c7b\u672a\u627e\u5230';
    document.getElementById('catDetailHeader').innerHTML = '<span class="cat-detail-title">\u5206\u7c7b\u672a\u627e\u5230</span><span class="cat-detail-count"><a href="index.html" style="color:var(--accent);text-decoration:none;">\u8fd4\u56de\u9996\u9875</a></span>';
    return;
  }

  document.title = cat.name + ' - NavHub \u79d1\u6280\u5bfc\u822a';
  document.getElementById('headerTitle').textContent = cat.name;

  var iconSvg = ICON_SVG[cat.icon] || '';
  var headerHtml = '';
  headerHtml += '<div class="cat-detail-icon">' + iconSvg + '</div>';
  headerHtml += '<span class="cat-detail-title">' + cat.name + '</span>';
  headerHtml += '<span class="cat-detail-count">' + cat.sites.length + ' \u4e2a\u7f51\u7ad9</span>';
  document.getElementById('catDetailHeader').innerHTML = headerHtml;

  var grid = document.getElementById('siteGrid');
  var html = '';
  cat.sites.forEach(function(site, idx) {
    // 第 1 个 AdSense 网格卡片：在第 1 个网站之前插入（跨上下2格，占第 1 列第 1-2 行）
    if (idx === 0) {
      html += adCardHtml('span2');
    }
    // 第 2 个 AdSense 网格卡片：在第 6 个网站之后插入（跨上下左右 2x2 四格，占第 4-5 列第 2-3 行），与第 1 个不相邻
    if (idx === 5) {
      html += adCardHtml('span2x2');
    }

    var favSrc = site.favicon || '';
    var fallbackColor = site.color || '#666';
    var initial = getInitial(site.name);

    html += '<a href="' + site.url + '" target="_blank" rel="noopener" class="site-item">';
    html += '<div class="site-favicon">';
    if (favSrc) {
      html += '<img src="' + favSrc + '" alt="" loading="lazy" onerror="this.style.display=\'none\';var fb=this.parentElement.querySelector(\'.site-favicon-fallback\');if(fb)fb.style.display=\'flex\'">';
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
}

// ==================== Init ====================
initTheme();
