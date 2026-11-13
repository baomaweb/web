/**
 * 云服务 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "cloud",
  "name": "云服务",
  "icon": "cloud",
  "sites": [
    {
      "name": "阿里云",
      "url": "https://www.aliyun.com",
      "color": "#ff6a00"
    },
    {
      "name": "腾讯云",
      "url": "https://cloud.tencent.com",
      "color": "#00a4ff"
    },
    {
      "name": "华为云",
      "url": "https://www.huaweicloud.com",
      "color": "#c7000b"
    },
    {
      "name": "百度智能云",
      "url": "https://cloud.baidu.com",
      "color": "#2932e1"
    },
    {
      "name": "AWS",
      "url": "https://aws.amazon.com",
      "color": "#ff9900"
    },
    {
      "name": "Google Cloud",
      "url": "https://cloud.google.com",
      "color": "#4285f4"
    },
    {
      "name": "Microsoft Azure",
      "url": "https://azure.microsoft.com",
      "color": "#0078d4"
    },
    {
      "name": "Vercel",
      "url": "https://vercel.com",
      "color": "#000000"
    },
    {
      "name": "Cloudflare",
      "url": "https://www.cloudflare.com",
      "color": "#f38020"
    },
    {
      "name": "Oracle Cloud",
      "url": "https://www.oracle.com/cloud",
      "color": "#ff0000"
    },
    {
      "name": "七牛云",
      "url": "https://www.qiniu.com",
      "color": "#00a0e9"
    },
    {
      "name": "又拍云",
      "url": "https://www.upyun.com",
      "color": "#00b38a"
    },
    {
      "name": "金山云",
      "url": "https://www.ksyun.com",
      "color": "#0066cc"
    },
    {
      "name": "UCloud",
      "url": "https://www.ucloud.cn",
      "color": "#00a0e9"
    },
    {
      "name": "青云",
      "url": "https://www.qingcloud.com",
      "color": "#1a73e8"
    },
    {
      "name": "京东云",
      "url": "https://www.jdcloud.com",
      "color": "#e1251b"
    },
    {
      "name": "天翼云",
      "url": "https://www.ctyun.cn",
      "color": "#0066cc"
    },
    {
      "name": "移动云",
      "url": "https://ecloud.10086.cn",
      "color": "#00a0a0"
    },
    {
      "name": "火山引擎",
      "url": "https://www.volcengine.com",
      "color": "#1a73e8"
    },
    {
      "name": "世纪互联",
      "url": "https://www.vianet.com.cn",
      "color": "#0066cc"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 1.5A4 4 0 0 0 6 19z" fill="#ff6a00"/><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 1.5A4 4 0 0 0 6 19z" fill="url(#cg)" opacity="0.3"/><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00a4ff"/><stop offset="1" stop-color="#0078d4"/></linearGradient></defs></svg>';
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
