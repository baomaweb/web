/**
 * 购物电商 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "shopping",
  "name": "购物电商",
  "icon": "shopping",
  "sites": [
 
   { name: '淘宝', url: 'https://www.taobao.com', favicon: 'favicon/shopping/淘宝.ico' },
   { name: '京东', url: 'https://www.jd.com', favicon: 'favicon/shopping/京东.ico' },
   { name: '拼多多', url: 'https://www.pinduoduo.com', favicon: 'favicon/shopping/拼多多.png' },
   { name: '唯品会', url: 'https://www.vip.com', favicon: 'favicon/shopping/唯品会.ico' },
   { name: '天猫', url: 'https://www.tmall.com', favicon: 'favicon/shopping/天猫.png' },
   { name: '苏宁易购', url: 'https://www.suning.com', favicon: 'favicon/shopping/苏宁易购.ico' },
   { name: 'Amazon', url: 'https://www.amazon.com', favicon: 'favicon/shopping/Amazon.ico' },
   { name: '当当网', url: 'https://www.dangdang.com', favicon: 'favicon/shopping/当当网.ico' },
   { name: '得物', url: 'https://www.dewu.com', favicon: 'favicon/shopping/得物.ico' },
   { name: '1688', url: 'https://www.1688.com', favicon: 'favicon/shopping/1688.ico' },
   { name: '麦德龙', url: 'https://www.maidelong.com/', favicon: 'favicon/shopping/麦德龙.png' },
   { name: '沃尔玛', url: 'https://www.walmart.cn/', favicon: 'favicon/shopping/沃尔玛.ico' },
   { name: '山姆', url: 'https://cms.samsclub.cn/', favicon: 'favicon/shopping/山姆.ico' },
   { name: '开市客', url: 'https://www.costco.com.cn', favicon: 'favicon/shopping/开市客.ico' },
   { name: '盒马', url: 'https://www.freshippo.com/', favicon: 'favicon/shopping/盒马.png' },
   { name: '永辉', url: 'https://www.yonghui.com.cn', favicon: 'favicon/shopping/永辉.png' },
   { name: '物美', url: 'https://www.dmall.com/', favicon: 'favicon/shopping/物美.ico' },
   { name: '大润发', url: 'https://www.rt-mart.com.cn/', favicon: 'favicon/shopping/大润发.ico' },
   { name: '华润万家', url: 'https://www.crv.com.cn/', favicon: 'favicon/shopping/华润万家.ico' },
   { name: '百安居', url: 'https://www.bthome.com/', favicon: 'favicon/shopping/百安居.ico' },
   { name: '7ELEVEN', url: 'https://www.7-11.cn/', favicon: 'favicon/shopping/7ELEVEN.ico' },
   { name: '罗森LAWSON', url: 'https://www.chinalawson.com.cn/', favicon: 'favicon/shopping/罗森LAWSON.ico' },
   { name: '便利蜂', url: 'https://www.bianlifeng.com/', favicon: 'favicon/shopping/便利蜂.png' },
   { name: '芙蓉兴盛', url: 'https://www.frxs.com/', favicon: 'favicon/shopping/芙蓉兴盛.png' },
   { name: '三江购物', url: 'https://www.sanjiang.com/', favicon: 'favicon/shopping/三江购物.png' },
   { name: '昆仑好客', url: 'https://www.petrousmile.com', favicon: 'favicon/shopping/昆仑好客.ico' },
   { name: '美宜佳', url: 'https://www.meiyijia.com.cn/', favicon: 'favicon/shopping/美宜佳.png' },
   { name: '生活驿站', url: 'https://www.cckggroup.com/', favicon: 'favicon/shopping/生活驿站.png' },
   
   
   
   
   
   
   { name: '全家', url: 'https://www.familymart.com.cn', favicon: 'favicon/shopping/全家.ico' },
 

  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M5 7h14l-1.5 12h-11z" fill="#ff5000"/><circle cx="9" cy="6" r="2" fill="#fff" stroke="#ff5000" stroke-width="1.5"/><circle cx="17" cy="6" r="2" fill="#fff" stroke="#ff5000" stroke-width="1.5"/><rect x="8" y="10" width="8" height="6" rx="1" fill="#fff" opacity="0.3"/></svg>';
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
