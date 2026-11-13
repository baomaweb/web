/**
 * 邮箱服务 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "email",
  "name": "邮箱服务",
  "icon": "email",
  "sites": [
    {
      "name": "126邮箱",
      "url": "https://mail.126.com",
      "color": "#4e6ef2",
      "favicon": "favicon/email/126.ico"
    },
    {
      "name": "163邮箱",
      "url": "https://mail.163.com",
      "color": "#00a0a0",
      "favicon": "favicon/email/163.ico"
    },
    {
      "name": "QQ邮箱",
      "url": "https://mail.qq.com",
      "color": "#ff6a00",
      "favicon": "favicon/email/qq邮箱.png"
    },
    {
      "name": "Gmail",
      "url": "https://mail.google.com",
      "color": "#e60012",
      "favicon": "favicon/email/gmail.ico"
    },
    {
      "name": "Outlook",
      "url": "https://outlook.live.com",
      "color": "#1a73e8",
      "favicon": "favicon/email/outlook.ico"
    },
    {
      "name": "新浪邮箱",
      "url": "https://mail.sina.com.cn",
      "color": "#00b38a",
      "favicon": "favicon/email/新浪邮箱.ico"
    },
    {
      "name": "搜狐邮箱",
      "url": "https://mail.sohu.com/",
      "color": "#c7000b",
      "favicon": "favicon/email/sohu邮箱.png"
    },
    {
      "name": "139邮箱",
      "url": "https://mail.10086.cn",
      "color": "#2c8fbb",
      "favicon": "favicon/email/139邮箱.ico"
    },
    {
      "name": "21cn邮箱",
      "url": "https://mail.21cn.com/",
      "color": "#ff5000",
      "favicon": "favicon/email/21cn邮箱.ico"
    },
    {
      "name": "tom邮箱",
      "url": "https://mail.tom.com/",
      "color": "#8b1a1a",
      "favicon": "favicon/email/tom邮箱.ico"
    },
    {
      "name": "Email完美邮箱",
      "url": "https://www.email.cn/",
      "color": "#4e6ef2",
      "favicon": "favicon/email/email.cn.png"
    },
    {
      "name": "88完美邮箱",
      "url": "https://www.88.com/",
      "color": "#1677ff"
    },
    {
      "name": "111完美邮箱",
      "url": "https://www.111.com/",
      "color": "#2c8fbb"
    },
    {
      "name": "263邮箱",
      "url": "https://mail.263.net/",
      "color": "#e60012",
      "favicon": "favicon/email/263邮箱.ico"
    },
    {
      "name": "阿里邮箱",
      "url": "https://mail.aliyun.com/",
      "color": "#1a73e8",
      "favicon": "favicon/email/阿里邮箱.ico"
    },
    {
      "name": "阿里企业邮箱",
      "url": "https://qiye.aliyun.com/",
      "color": "#00b38a",
      "favicon": "favicon/email/阿里企业邮箱.ico"
    },
    {
      "name": "新浪企业邮箱",
      "url": "https://mail.sina.net/",
      "color": "#c7000b",
      "favicon": "favicon/email/新浪企业邮箱.ico"
    },
    {
      "name": "网易企业邮箱",
      "url": "https://ym.163.com",
      "color": "#2c8fbb",
      "favicon": "favicon/email/网易企业邮箱.ico"
    },
    {
      "name": "Yahoo Mail",
      "url": "https://mail.yahoo.com",
      "color": "#ff5000",
      "favicon": "favicon/email/yahoo邮箱.ico"
    },
    {
      "name": "ProtonMail",
      "url": "https://proton.me/mail",
      "color": "#8b1a1a",
      "favicon": "favicon/email/proton.png"
    },
    {
      "name": "Zoho Mail",
      "url": "https://www.zoho.com/mail",
      "color": "#4e6ef2",
      "favicon": "favicon/email/zoho.ico"
    },
    {
      "name": "Mail",
      "url": "https://www.mail.com/",
      "color": "#00a0a0",
      "favicon": "favicon/email/mail.png"
    },
    {
      "name": "Yandex Mail",
      "url": "https://360.yandex.com/mail/",
      "color": "#ff6a00",
      "favicon": "favicon/email/yandex.png"
    },
    {
      "name": "gmx Mail",
      "url": "https://www.gmx.com/",
      "color": "#e60012",
      "favicon": "favicon/email/gmx.ico"
    },
    {
      "name": "tuta Mail",
      "url": "https://tuta.com/",
      "color": "#1a73e8",
      "favicon": "favicon/email/tuta.png"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#ea4335"/><path d="m2 6 10 7 10-7" fill="#fff" opacity="0.2"/><path d="m2 6 10 7 10-7" stroke="#fff" stroke-width="1.5" fill="none"/></svg>';
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
