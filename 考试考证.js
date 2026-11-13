/**
 * 考试考证 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "exam",
  "name": "考试考证",
  "icon": "exam",
  "sites": [
    {
      "name": "中国教育考试网",
      "url": "https://www.neea.edu.cn",
      "color": "#c7000b"
    },
    {
      "name": "学信网",
      "url": "https://www.chsi.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "雅思官网",
      "url": "https://www.chinaielts.org",
      "color": "#e60012"
    },
    {
      "name": "托福官网",
      "url": "https://toefl.neea.cn",
      "color": "#0056d2"
    },
    {
      "name": "研招网",
      "url": "https://yz.chsi.com.cn",
      "color": "#1a73e8"
    },
    {
      "name": "国家公务员局",
      "url": "https://www.scs.gov.cn",
      "color": "#c7000b"
    },
    {
      "name": "会计资格评价网",
      "url": "https://kzp.mof.gov.cn",
      "color": "#0056d2"
    },
    {
      "name": "中小学教师资格考试",
      "url": "https://ntce.neea.edu.cn",
      "color": "#1a73e8"
    },
    {
      "name": "中国人事考试网",
      "url": "https://www.cpta.com.cn",
      "color": "#0066cc"
    },
    {
      "name": "驾考宝典",
      "url": "https://www.jiakaobaodian.com",
      "color": "#ff6a00"
    },
    {
      "name": "高考网",
      "url": "https://www.gaokao.com",
      "color": "#ff6a00"
    },
    {
      "name": "无忧考网",
      "url": "https://www.51test.net",
      "color": "#0066cc"
    },
    {
      "name": "考试吧",
      "url": "https://www.exam8.com",
      "color": "#1a73e8"
    },
    {
      "name": "中华会计网校",
      "url": "https://www.chinaacc.com",
      "color": "#c7000b"
    },
    {
      "name": "东奥会计在线",
      "url": "https://www.dongao.com",
      "color": "#e60012"
    },
    {
      "name": "建设工程教育网",
      "url": "https://www.jianshe99.com",
      "color": "#0066cc"
    },
    {
      "name": "医学教育网",
      "url": "https://www.med66.com",
      "color": "#00b38a"
    },
    {
      "name": "法律教育网",
      "url": "https://www.chinalawedu.com",
      "color": "#1a73e8"
    },
    {
      "name": "华图教育",
      "url": "https://www.huatu.com",
      "color": "#ff6a00"
    },
    {
      "name": "中公教育",
      "url": "https://www.offcn.com",
      "color": "#1a73e8"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="#c7000b"/><rect x="7" y="7" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="11" width="7" height="2" rx="1" fill="#fff" opacity="0.7"/><circle cx="17" cy="18" r="4" fill="#00b38a"/><path d="m15.5 18 1.2 1.2 2.3-2.4" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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
