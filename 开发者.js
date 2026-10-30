/**
 * 开发者 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "dev",
  "name": "开发者",
  "icon": "dev",
  "sites": [
   { name: 'Github ', url: 'https://github.com/', favicon: 'favicon/dev/github.png' },
   { name: 'Gitee ', url: 'https://gitee.com/', favicon: 'favicon/dev/gitee.ico' },
   { name: 'Gitcode ', url: 'https://gitcode.com/', favicon: 'favicon/dev/gitcode.png' },
   { name: '博客园 ', url: 'https://www.cnblogs.com/', favicon: 'favicon/dev/cnblogs.png' }, 
   { name: '稀土掘金 ', url: 'https://www.juejin.cn/', favicon: 'favicon/dev/稀土掘金.png' }, 
   { name: '51cto ', url: 'https://www.51cto.com/', favicon: 'favicon/dev/51cto.ico' },
   { name: 'Gitlab ', url: 'https://gitlab.cn/', favicon: 'favicon/dev/gitlab.png' },
   { name: 'Azure ', url: 'https://azure.microsoft.com/', favicon: 'favicon/dev/azure.ico' }, 
   { name: 'oracle ', url: 'https://www.oracle.com/cn/', favicon: 'favicon/dev/oracle.ico' },
   { name: 'CSDN ', url: 'https://www.csdn.net/', favicon: 'favicon/dev/csdn.ico' },  
   { name: '思否 ', url: 'https://segmentfault.com/', favicon: 'favicon/dev/思否.ico' }, 
   { name: '慕课网 ', url: 'https://www.imooc.com/', favicon: 'favicon/dev/慕课网.ico' },
   { name: 'oschina ', url: 'https://www.oschina.net/', favicon: 'favicon/dev/oschina.ico' },
   { name: 'IT之家 ', url: 'https://www.ithome.com/', favicon: 'favicon/dev/IT之家.png' }, 
   { name: '虎嗅网 ', url: 'https://www.huxiu.com/', favicon: 'favicon/dev/虎嗅网.ico' },
   { name: '钛媒体 ', url: 'https://www.tmtpost.com/', favicon: 'favicon/dev/钛媒体.ico' }, 
   { name: '雷锋网 ', url: 'https://www.leiphone.com/', favicon: 'favicon/dev/雷锋网.ico' },
   { name: '威锋网 ', url: 'https://www.feng.com/', favicon: 'favicon/dev/威锋网.ico' },
   { name: '太平洋科技 ', url: 'https://www.pconline.com.cn', favicon: 'favicon/dev/太平洋科技.ico' },
   { name: ' 中关村在线', url: 'https://www.zol.com.cn', favicon: 'favicon/dev/中关村在线.png' },
   { name: '硅谷网 ', url: 'http://www.guigu.org/', favicon: 'favicon/dev/硅谷网.ico' },
   { name: '少数派 ', url: 'https://sspai.com/', favicon: 'favicon/dev/少数派.ico' },
   { name: '极客公园 ', url: 'https://www.geekpark.net/', favicon: 'favicon/dev/极客公园.png' },
   { name: '电脑报', url: 'https://www.icpcw.com', color: '#161823' },
   { name: 'typecho', url: 'https://typecho.org', color: '#ff5f00' },
   { name: 'wordpress ', url: 'https://wordpress.org/', favicon: 'favicon/dev/wordpress.png' }, 
   { name: 'hexo ', url: 'https://hexo.io/zh-cn/', favicon: 'favicon/dev/hexo.png' },
   { name: 'halo ', url: 'https://www.halo.run/', favicon: 'favicon/dev/halo.ico' },
   { name: 'npmjs ', url: 'https://www.npmjs.com', favicon: 'favicon/dev/npmjs.png' },
   { name: 'Can I Use ', url: 'https://caniuse.com', favicon: 'favicon/dev/caniuse.png' },
   { name: 'Stack Overflow ', url: 'https://stackoverflow.com', favicon: 'favicon/dev/stackoverflow.png' },
   { name: 'mozilla ', url: 'https://developer.mozilla.org',favicon: 'favicon/dev/mozilla.png' },
   { name: 'CodePen ', url: 'https://codepen.io',favicon: 'favicon/dev/codepen.ico' },
   { name: 'LeetCode ', url: 'https://leetcode.cn',favicon: 'favicon/dev/leetcode.ico' },
   { name: 'DevDocs ', url: 'https://devdocs.io',favicon: 'favicon/dev/devdocs.ico' },

  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="m8 6-6 6 6 6" stroke="#24292e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="m16 6 6 6-6 6" stroke="#fc6d26" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M14 4l-4 16" stroke="#f48024" stroke-width="2.5" stroke-linecap="round"/></svg>';
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

// ==================== AdSense ====================
function adCardHtml(variant) {
  var cls = 'ad-card';
  if (variant === 'span2') cls += ' ad-card--span2';
  else if (variant === 'span2x2') cls += ' ad-card--span2x2';
  else if (variant === 'pos1') cls += ' ad-card--pos1';
  else if (variant === 'pos2') cls += ' ad-card--pos2';
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="ca-pub-6172791470588821"\n';
  h += '     data-ad-slot="3745621701"\n';
  h += '     data-ad-format="auto"\n';
  h += '     data-full-width-responsive="true"></ins>\n';

  h += '</div>';
  return h;
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
      html += adCardHtml('pos1');
    }
    if (idx === 5) {
      html += adCardHtml('pos2');
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
}

// ==================== Init ====================
initTheme();
renderCategoryPage();
