/**
 * 办公协作 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "office",
  "name": "办公协作",
  "icon": "office",
  "sites": [
    {
      "name": "飞书",
      "url": "https://www.feishu.cn",
      "color": "#00b6d3"
    },
    {
      "name": "钉钉",
      "url": "https://www.dingtalk.com",
      "color": "#1677ff"
    },
    {
      "name": "企业微信",
      "url": "https://work.weixin.qq.com",
      "color": "#07c160"
    },
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "color": "#000000"
    },
    {
      "name": "Slack",
      "url": "https://slack.com",
      "color": "#4a154b"
    },
    {
      "name": "Zoom",
      "url": "https://zoom.us",
      "color": "#2d8cff"
    },
    {
      "name": "腾讯会议",
      "url": "https://meeting.tencent.com",
      "color": "#006eff"
    },
    {
      "name": "石墨文档",
      "url": "https://shimo.im",
      "color": "#1f88f6"
    },
    {
      "name": "WPS",
      "url": "https://www.wps.cn",
      "color": "#ff6a00"
    },
    {
      "name": "Trello",
      "url": "https://trello.com",
      "color": "#0079bf"
    },
    {
      "name": "Microsoft 365",
      "url": "https://www.microsoft.com/zh-cn/microsoft-365",
      "color": "#0078d4"
    },
    {
      "name": "Google Workspace",
      "url": "https://workspace.google.com",
      "color": "#4285f4"
    },
    {
      "name": "语雀",
      "url": "https://www.yuque.com",
      "color": "#00b38a"
    },
    {
      "name": "腾讯文档",
      "url": "https://docs.qq.com",
      "color": "#1a73e8"
    },
    {
      "name": "金山文档",
      "url": "https://www.kdocs.cn",
      "color": "#ff6a00"
    },
    {
      "name": "ProcessOn",
      "url": "https://www.processon.com",
      "color": "#00b38a"
    },
    {
      "name": "幕布",
      "url": "https://mubu.com",
      "color": "#ff6a00"
    },
    {
      "name": "Todoist",
      "url": "https://todoist.com",
      "color": "#e44332"
    },
    {
      "name": "Asana",
      "url": "https://asana.com",
      "color": "#f06a6a"
    },
    {
      "name": "有道云笔记",
      "url": "https://note.youdao.com",
      "color": "#1a73e8"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="12" height="16" rx="2" fill="#00b6d3"/><rect x="9" y="7" width="12" height="13" rx="2" fill="#1677ff" opacity="0.85"/><path d="M6 8h5M6 11h5M6 14h3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
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
