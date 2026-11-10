/**
 * 文档参考 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "devdocs",
  "name": "开发文档",
  "icon": "devdocs",
  "sites": [
   { name: 'Vue.js', url: 'https://cn.vuejs.org', favicon: 'favicon/devdocs/vue.png' },
   { name: 'React', url: 'https://react.dev', favicon: 'favicon/devdocs/react.png' },
   { name: 'TypeScript', url: 'https://www.typescriptlang.org', favicon: 'favicon/devdocs/typescript.png' },
   { name: 'Tailwind CSS', url: 'https://tailwindcss.com', favicon: 'favicon/devdocs/tailwind.png' },
   { name: 'Next.js', url: 'https://nextjs.org', favicon: 'favicon/devdocs/nextjs.ico' },
   { name: 'Python', url: 'https://www.python.org', favicon: 'favicon/devdocs/python.ico' },
   { name: 'Go', url: 'https://go.dev', favicon: 'favicon/devdocs/go.png' },
   { name: 'Rust', url: 'https://www.rust-lang.org', favicon: 'favicon/devdocs/rust.png' },
   { name: 'Node.js', url: 'https://nodejs.org', favicon: 'favicon/devdocs/node.png' },
   { name: 'Docker', url: 'https://www.docker.com', favicon: 'favicon/devdocs/docker.png' },
   { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', favicon: 'favicon/devdocs/wolframalpha.ico' },   
   { name: 'Angular ', url: 'https://angular.io/', favicon: 'favicon/devdocs/angular.png' },
   { name: 'Svelte', url: 'https://svelte.dev/', favicon: 'favicon/devdocs/svelte.png' },
   { name: 'Solid.js ', url: 'https://www.solidjs.com/', favicon: 'favicon/devdocs/solidjs.png' },
   { name: 'Bootstrap', url: 'https://getbootstrap.com', favicon: 'favicon/devdocs/getbootstrap.ico' },
   { name: 'Bootstrap中文网', url: 'https://www.bootcss.com/', favicon: 'favicon/devdocs/bootcss.ico' },
   { name: 'Backbone.js', url: 'https://backbonejs.org', favicon: 'favicon/devdocs/backbonejs.ico' },
   { name: 'Ember.js', url: 'https://emberjs.com', favicon: 'favicon/devdocs/emberjs.ico' },
   { name: 'Preact', url: 'https://www.preactjs.com.cn/', favicon: 'favicon/devdocs/preactjs.ico' },
   { name: 'uni-app', url: 'https://uniapp.dcloud.io/', favicon: 'favicon/devdocs/uniapp.png' },
   { name: 'Hexo', url: 'https://hexo.io/', favicon: 'favicon/devdocs/hexo.png' },
   { name: 'npmjs', url: 'https://www.npmjs.com/', favicon: 'favicon/devdocs/npmjs.png' },
   


  ]
};

var ICON_SVG = '';
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
