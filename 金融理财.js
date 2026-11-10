/**
 * 金融理财 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "finance",
  "name": "金融理财",
  "icon": "finance",
  "sites": [
   { name: '支付宝', url: 'https://www.alipay.com', favicon: 'favicon/finance/支付宝.ico' },
   { name: '微信支付', url: 'https://pay.weixin.qq.com', favicon: 'favicon/finance/微信支付.ico' },
   { name: '京东金融', url: 'https://www.jdpay.com', favicon: 'favicon/finance/京东支付.ico' },
   { name: '东方财富', url: 'https://www.eastmoney.com', favicon: 'favicon/finance/东方财富.ico' },
   { name: '同花顺', url: 'https://www.10jqka.com.cn', favicon: 'favicon/finance/同花顺.ico' },
   { name: '雪球', url: 'https://xueqiu.com', favicon: 'favicon/finance/雪球.ico' },
   { name: '金融界', url: 'http://www.jrj.com.cn', favicon: 'favicon/finance/金融界.ico' },
   { name: '财经网', url: 'http://www.caijing.com.cn', favicon: 'favicon/finance/财经网.ico' },
   { name: '中金在线', url: 'https://cnfol.com/', favicon: 'favicon/finance/中金在线.ico' },
   { name: '第一财经', url: 'https://www.yicai.com', favicon: 'favicon/finance/第一财经.ico' },
   { name: '中经新纬', url: 'https://www.jwview.com', favicon: 'favicon/finance/中新经纬.png' },
   { name: '和讯', url: 'https://www.hexun.com', favicon: 'favicon/finance/和讯网.ico' },
   { name: '每日经济新闻', url: 'https://www.nbd.com.cn', favicon: 'favicon/finance/每日经济新闻.ico' },
   { name: '华尔街见闻', url: 'https://wallstreetcn.com', favicon: 'favicon/finance/华尔街见闻.png' },
   { name: '经济观察网', url: 'https://www.eeo.com.cn', favicon: 'favicon/finance/经济观察网.ico' },
   { name: '财联社', url: 'https://www.cls.cn/', favicon: 'favicon/finance/财联社.ico' },
   { name: '凤凰网财经', url: 'https://finance.ifeng.com', favicon: 'favicon/finance/凤凰财经.png' },
   { name: '腾讯财经', url: 'https://news.qq.com/ch/finance', favicon: 'favicon/finance/腾讯财经.png' },
   { name: '网易财经', url: 'https://money.163.com', favicon: 'favicon/finance/网易财经.ico' },
   { name: '新浪财经', url: 'https://finance.sina.com.cn', favicon: 'favicon/finance/新浪财经.png' },
   { name: '21经济网', url: 'https://www.21jingji.com', favicon: 'favicon/finance/21世纪经济报道.ico' },
   { name: '南方财经网', url: 'https://www.sfccn.com/', favicon: 'favicon/finance/南方财经网.ico' },
   { name: '东方财富网', url: 'https://www.eastmoney.com', favicon: 'favicon/finance/东方财富.ico' },
   { name: '上海证券报', url: 'https://www.cnstock.com/', favicon: 'favicon/finance/上海证券报.png' },
   { name: '证券时报', url: 'http://www.stcn.com', favicon: 'favicon/finance/证券时报.ico' },
   { name: '证券之星', url: 'https://www.stockstar.com', favicon: 'favicon/finance/证券之星.ico' },
   { name: '天天基金网', url: 'https://fund.eastmoney.com', favicon: 'favicon/finance/天天基金.ico' },
   { name: '晨星网', url: 'https://www.morningstar.cn', favicon: 'favicon/finance/晨星.ico' },
   { name: '中国基金报', url: 'https://www.chnfund.com/', favicon: 'favicon/finance/中国基金报.ico' },
   { name: '蚂蚁财富', url: 'https://www.antfortune.com', favicon: 'favicon/finance/蚂蚁财富.ico' },
   { name: '创业邦', url: 'https://www.cyzone.cn', favicon: 'favicon/finance/创业邦.ico' },
   { name: '美通社', url: 'https://www.prnasia.com', favicon: 'favicon/finance/美通社.png' },
   
   
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1677ff"/><circle cx="12" cy="12" r="8" fill="#fff" opacity="0.15"/><path d="M12 6v12" stroke="#fff" stroke-width="1.5"/><path d="M15 9a2.5 2.5 0 0 0-3-2c-1.5 0-2.5 1-2.5 2s1 2 2.5 2 2.5 1 2.5 2-1 2-2.5 2a2.5 2.5 0 0 1-3-2" stroke="#ffc300" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>';
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
