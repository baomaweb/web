/**
 * 学术科研 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "research",
  "name": "学术科研",
  "icon": "research",
  "sites": [
    {
      "name": "中国知网",
      "url": "https://www.cnki.net",
      "color": "#c7000b"
    },
    {
      "name": "万方数据",
      "url": "https://www.wanfangdata.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "维普网",
      "url": "https://www.cqvip.com",
      "color": "#1a73e8"
    },
    {
      "name": "Google Scholar",
      "url": "https://scholar.google.com",
      "color": "#4285f4"
    },
    {
      "name": "arXiv",
      "url": "https://arxiv.org",
      "color": "#b31b1b"
    },
    {
      "name": "PubMed",
      "url": "https://pubmed.ncbi.nlm.nih.gov",
      "color": "#326599"
    },
    {
      "name": "ResearchGate",
      "url": "https://www.researchgate.net",
      "color": "#00ccbb"
    },
    {
      "name": "Semantic Scholar",
      "url": "https://www.semanticscholar.org",
      "color": "#1857b6"
    },
    {
      "name": "Web of Science",
      "url": "https://www.webofscience.com",
      "color": "#0066cc"
    },
    {
      "name": "国家哲学社会科学文献中心",
      "url": "https://www.ncpssd.org",
      "color": "#c7000b"
    },
    {
      "name": "百度学术",
      "url": "https://xueshu.baidu.com",
      "color": "#2932e1"
    },
    {
      "name": "中国科技论文在线",
      "url": "https://www.paper.edu.cn",
      "color": "#0066cc"
    },
    {
      "name": "科学网",
      "url": "https://www.sciencenet.cn",
      "color": "#1a73e8"
    },
    {
      "name": "果壳",
      "url": "https://www.guokr.com",
      "color": "#00b38a"
    },
    {
      "name": "Nature",
      "url": "https://www.nature.com",
      "color": "#1a1a1a"
    },
    {
      "name": "Science",
      "url": "https://www.science.org",
      "color": "#c7000b"
    },
    {
      "name": "IEEE",
      "url": "https://www.ieee.org",
      "color": "#00629b"
    },
    {
      "name": "ACM",
      "url": "https://www.acm.org",
      "color": "#1a73e8"
    },
    {
      "name": "Springer",
      "url": "https://www.springer.com",
      "color": "#0076a0"
    },
    {
      "name": "Elsevier",
      "url": "https://www.elsevier.com",
      "color": "#ff6a00"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6" fill="#326599"/><circle cx="10" cy="10" r="3.5" fill="#fff" opacity="0.7"/><path d="m15 15 6 6" stroke="#b31b1b" stroke-width="2.5" stroke-linecap="round"/><rect x="16" y="3" width="4" height="6" rx="1" fill="#00ccbb"/></svg>';
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
