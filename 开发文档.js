/**
 * 开发文档 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "devdocs",
  "name": "开发文档",
  "icon": "devdocs",
  "sites": [
    {
      "name": "Vue.js",
      "url": "https://cn.vuejs.org",
      "color": "#4e6ef2",
      "favicon": "favicon/devdocs/vue.png"
    },
    {
      "name": "React",
      "url": "https://react.dev",
      "color": "#00a0a0",
      "favicon": "favicon/devdocs/react.png"
    },
    {
      "name": "TypeScript",
      "url": "https://www.typescriptlang.org",
      "color": "#ff6a00",
      "favicon": "favicon/devdocs/typescript.png"
    },
    {
      "name": "Tailwind CSS",
      "url": "https://tailwindcss.com",
      "color": "#e60012",
      "favicon": "favicon/devdocs/tailwind.png"
    },
    {
      "name": "Next.js",
      "url": "https://nextjs.org",
      "color": "#1a73e8",
      "favicon": "favicon/devdocs/nextjs.ico"
    },
    {
      "name": "Python",
      "url": "https://www.python.org",
      "color": "#00b38a",
      "favicon": "favicon/devdocs/python.ico"
    },
    {
      "name": "Go",
      "url": "https://go.dev",
      "color": "#c7000b",
      "favicon": "favicon/devdocs/go.png"
    },
    {
      "name": "Rust",
      "url": "https://www.rust-lang.org",
      "color": "#2c8fbb",
      "favicon": "favicon/devdocs/rust.png"
    },
    {
      "name": "Node.js",
      "url": "https://nodejs.org",
      "color": "#ff5000",
      "favicon": "favicon/devdocs/node.png"
    },
    {
      "name": "Docker",
      "url": "https://www.docker.com",
      "color": "#8b1a1a",
      "favicon": "favicon/devdocs/docker.png"
    },
    {
      "name": "Wolfram Alpha",
      "url": "https://www.wolframalpha.com",
      "color": "#4e6ef2",
      "favicon": "favicon/devdocs/wolframalpha.ico"
    },
    {
      "name": "Angular ",
      "url": "https://angular.io/",
      "color": "#00a0a0",
      "favicon": "favicon/devdocs/angular.png"
    },
    {
      "name": "Svelte",
      "url": "https://svelte.dev/",
      "color": "#ff6a00",
      "favicon": "favicon/devdocs/svelte.png"
    },
    {
      "name": "Solid.js ",
      "url": "https://www.solidjs.com/",
      "color": "#e60012",
      "favicon": "favicon/devdocs/solidjs.png"
    },
    {
      "name": "Bootstrap",
      "url": "https://getbootstrap.com",
      "color": "#1a73e8",
      "favicon": "favicon/devdocs/getbootstrap.ico"
    },
    {
      "name": "Bootstrap中文网",
      "url": "https://www.bootcss.com/",
      "color": "#00b38a",
      "favicon": "favicon/devdocs/bootcss.ico"
    },
    {
      "name": "Backbone.js",
      "url": "https://backbonejs.org",
      "color": "#c7000b",
      "favicon": "favicon/devdocs/backbonejs.ico"
    },
    {
      "name": "Ember.js",
      "url": "https://emberjs.com",
      "color": "#2c8fbb",
      "favicon": "favicon/devdocs/emberjs.ico"
    },
    {
      "name": "Preact",
      "url": "https://www.preactjs.com.cn/",
      "color": "#ff5000",
      "favicon": "favicon/devdocs/preactjs.ico"
    },
    {
      "name": "uni-app",
      "url": "https://uniapp.dcloud.io/",
      "color": "#8b1a1a",
      "favicon": "favicon/devdocs/uniapp.png"
    },
    {
      "name": "Hexo",
      "url": "https://hexo.io/",
      "color": "#4e6ef2",
      "favicon": "favicon/devdocs/hexo.png"
    },
    {
      "name": "npmjs",
      "url": "https://www.npmjs.com/",
      "color": "#00a0a0",
      "favicon": "favicon/devdocs/npmjs.png"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#3178c6"/><path d="M14 2v6h6" fill="#06b6d4"/><rect x="8" y="12" width="8" height="1.5" rx="0.75" fill="#fff"/><rect x="8" y="15" width="6" height="1.5" rx="0.75" fill="#fff"/><rect x="8" y="18" width="4" height="1.5" rx="0.75" fill="#fff"/></svg>';
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
