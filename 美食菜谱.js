/**
 * 美食菜谱 分类页 - 数据 + 应用逻辑
 * 40 个网站
 */

var CATEGORY = {
  "id": "food",
  "name": "美食菜谱",
  "icon": "food",
  "sites": [
    {
      "name": "下厨房",
      "url": "https://www.xiachufang.com",
      "color": "#ff6a00"
    },
    {
      "name": "豆果美食",
      "url": "https://www.douguo.com",
      "color": "#ff4d4f"
    },
    {
      "name": "美食杰",
      "url": "https://www.meishij.net",
      "color": "#ff7a00"
    },
    {
      "name": "香哈菜谱",
      "url": "https://www.xiangha.com",
      "color": "#e6312a"
    },
    {
      "name": "日食记",
      "url": "https://www.rishiji.com",
      "color": "#ff6b6b"
    },
    {
      "name": "美食天下",
      "url": "https://www.meishichina.com",
      "color": "#ff5a1f"
    },
    {
      "name": "好豆网",
      "url": "https://www.haodou.com",
      "color": "#ff8a00"
    },
    {
      "name": "贝太厨房",
      "url": "https://www.beitaichufang.com",
      "color": "#ff4d6d"
    },
    {
      "name": "懒饭",
      "url": "https://www.lanfan.com",
      "color": "#ff6a00"
    },
    {
      "name": "厨房故事",
      "url": "https://www.kitchenstories.cn",
      "color": "#f39c12"
    },
    {
      "name": "大众点评",
      "url": "https://www.dianping.com",
      "color": "#ff6633"
    },
    {
      "name": "美团",
      "url": "https://www.meituan.com",
      "color": "#ffc300"
    },
    {
      "name": "饿了么",
      "url": "https://www.ele.me",
      "color": "#0095ff"
    },
    {
      "name": "盒马",
      "url": "https://www.freshhippo.com",
      "color": "#00a0e9"
    },
    {
      "name": "叮咚买菜",
      "url": "https://www.100.me",
      "color": "#00b38a"
    },
    {
      "name": "肯德基",
      "url": "https://www.kfc.com.cn",
      "color": "#c7000b"
    },
    {
      "name": "麦当劳",
      "url": "https://www.mcdonalds.com.cn",
      "color": "#ffcc00"
    },
    {
      "name": "星巴克",
      "url": "https://www.starbucks.com.cn",
      "color": "#00704a"
    },
    {
      "name": "瑞幸咖啡",
      "url": "https://www.luckincoffee.com",
      "color": "#1a73e8"
    },
    {
      "name": "喜茶",
      "url": "https://www.heytea.com",
      "color": "#1a1a1a"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M4 11h16a8 8 0 0 1-16 0z" fill="#ff6a00"/><path d="M2 11h20" stroke="#e6312a" stroke-width="1.5"/><path d="M12 3v2M9 4.5 10 6M15 4.5 14 6" stroke="#ff8a00" stroke-width="1.5" stroke-linecap="round"/></svg>';
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
