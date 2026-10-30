/**
 * 新闻资讯 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "news",
  "name": "新闻资讯",
  "icon": "news",
  "sites": [
  	{ name: '央视新闻', url:'https://news.cctv.com/', favicon: 'favicon/news/cctv.ico'},
	{ name: '新华网', url:'https://www.news.cn/', favicon: 'favicon/news/新华网.ico'},
	{ name: '人民网', url:'https://www.people.com.cn/', favicon: 'favicon/news/人民网.ico'},
	{ name: '求是网', url:'https://www.qstheory.cn/', favicon: 'favicon/news/求是网.ico'},
	{ name: '中国新闻网', url:'https://www.chinanews.com.cn/', favicon: 'favicon/news/中国新闻网.ico'},
	{ name: '光明网', url:'https://www.gmw.cn/', favicon: 'favicon/news/光明网.ico'},
	{ name: '凤凰网', url:'https://www.ifeng.com/', favicon: 'favicon/news/凤凰网.ico'},
	{ name: '澎湃', url:'https://www.thepaper.cn/', favicon: 'favicon/news/澎湃.ico'},
	{ name: '环球网', url:'https://www.huanqiu.com/', favicon: 'favicon/news/环球网.png'},
	{ name: '虎嗅', url:'https://www.huxiu.com/', favicon: 'favicon/news/虎嗅.ico'},
	{ name: '36氪', url:'https://www.huxiu.com/', favicon: 'favicon/news/36氪.ico'},
	{ name: '南方周末', url:'https://www.infzm.com/', favicon: 'favicon/news/南方周末.ico'},
	{ name: '看看新闻', url:'https://www.kankanews.com/', favicon: 'favicon/news/看看新闻.ico'},
	{ name: '界面新闻', url:'https://www.jiemian.com/', favicon: 'favicon/news/界面新闻.ico'},
	{ name: '封面新闻', url:'https://www.thecover.cn/', favicon: 'favicon/news/封面新闻.png'},
	{ name: '新京报', url:'https://www.bjnews.com.cn/', favicon: 'favicon/news/新京报.ico'},
	{ name: '网易新闻', url:'https://news.163.com', favicon: 'favicon/news/网易新闻.ico'},
	{ name: '腾讯新闻', url:'https://news.qq.com', favicon: 'favicon/news/腾讯新闻.ico'},
	{ name: '三联生活周刊', url:'https://www.lifeweek.com.cn/', favicon: 'favicon/news/三联生活周刊.ico'},
	{ name: '东方网', url:'https://www.eastday.com/', favicon: 'favicon/news/东方网.ico'},
	{ name: '一点资讯', url:'https://www.yidianzixun.com/', favicon: 'favicon/news/一点资讯.ico'},
	{ name: '中青在线', url:'https://www.cyol.com/', favicon: 'favicon/news/中青在线.png'},
	{ name: '中国日报网', url:'https://cn.chinadaily.com.cn/', favicon: 'favicon/news/中国日报网.ico'},
	{ name: '中华网', url:'https://www.china.com/', favicon: 'favicon/news/中华网.ico'},
	{ name: '央广网', url:'https://www.cnr.cn/', favicon: 'favicon/news/央广网.ico'},
	{ name: '千龙网', url:'https://www.qianlong.com/', favicon: 'favicon/news/千龙网.ico'},
	{ name: '新闻晨报', url:'https://www.shxwcb.com/', favicon: 'favicon/news/新闻晨报.png'},
	{ name: '大河网', url:'https://www.dahe.cn/', favicon: 'favicon/news/大河网.ico'},
    {
      "name": "今日头条",
      "url": "https://www.toutiao.com",
      "color": "#ff4040"
    },
    {
      "name": "扬子晚报",
      "url": "https://www.yangtse.com/",
      "color": "#0061ff"
    },
    {
      "name": "南方网",
      "url": "https://www.southcn.com/",
      "color": "#ff5a36"
    },
    {
      "name": "澎湃新闻",
      "url": "https://www.thepaper.cn",
      "color": "#ff7700"
    },
    {
      "name": "搜狐新闻",
      "url": "https://news.sohu.com",
      "color": "#c20c02"
    },
    {
      "name": "新浪新闻",
      "url": "https://news.sina.com.cn",
      "color": "#0f81c7"
    },
    {
      "name": "中国新闻周刊",
      "url": "https://www.inewsweek.cn/",
      "color": "#1a73e8"
    },
    {
      "name": "凤凰新闻",
      "url": "https://news.ifeng.com",
      "color": "#ff5500"
    },
    {
      "name": "BBC中文",
      "url": "https://www.bbc.com/zhongwen",
      "color": "#bb1919"
    },
    {
      "name": "路透社",
      "url": "https://www.reuters.com",
      "color": "#ff6600"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#0061ff"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="11" width="12" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="14" width="8" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="17" width="6" height="1.5" rx="0.75" fill="#9ec5ff"/><circle cx="20" cy="5" r="3" fill="#ff5a36"/></svg>';
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

// ==================== AdSense ====================
function adCardHtml(variant) {
  var cls = 'ad-card';
  if (variant === 'span2') cls += ' ad-card--span2';
  else if (variant === 'span2x2') cls += ' ad-card--span2x2';
  else if (variant === 'pos1') cls += ' ad-card--pos1';
  else if (variant === 'pos2') cls += ' ad-card--pos2';
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<ins class="adsbygoogle"\n';
  h += '     style="display:block;width:100%;height:100%"\n';
  h += '     data-ad-client="ca-pub-6172791470588821"\n';
  h += '     data-ad-slot="3745621701"\n';
  h += '     data-ad-format="auto"\n';
  h += '     data-full-width-responsive="true"></ins>\n';

  h += '</div>';
  return h;
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
      html += adCardHtml('pos1');
    }
    if (idx === 5) {
      html += adCardHtml('pos2');
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
}

// ==================== Init ====================
initTheme();
renderCategoryPage();
