/**
 * 区块链 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "blockchain",
  "name": "区块链",
  "icon": "blockchain",
  "sites": [
    {
      "name": "币安",
      "url": "https://www.binance.com",
      "color": "#f0b90b"
    },
    {
      "name": "欧易OKX",
      "url": "https://www.okx.com",
      "color": "#000000"
    },
    {
      "name": "CoinMarketCap",
      "url": "https://coinmarketcap.com",
      "color": "#3861fb"
    },
    {
      "name": "以太坊",
      "url": "https://ethereum.org",
      "color": "#627eea"
    },
    {
      "name": "Etherscan",
      "url": "https://etherscan.io",
      "color": "#21325b"
    },
    {
      "name": "Chainlink",
      "url": "https://chain.link",
      "color": "#2a5ada"
    },
    {
      "name": "Uniswap",
      "url": "https://uniswap.org",
      "color": "#ff007a"
    },
    {
      "name": "MetaMask",
      "url": "https://metamask.io",
      "color": "#f6851b"
    },
    {
      "name": "OpenSea",
      "url": "https://opensea.io",
      "color": "#2081e2"
    },
    {
      "name": "Dune",
      "url": "https://dune.com",
      "color": "#0b2443"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="6" height="6" rx="1" fill="#f0b90b"/><rect x="13" y="5" width="6" height="6" rx="1" fill="#627eea"/><rect x="9" y="13" width="6" height="6" rx="1" fill="#3861fb"/><path d="M8 11v2M16 11v2M12 19v-4" stroke="#f0b90b" stroke-width="1.5"/><circle cx="12" cy="16" r="1" fill="#ff007a"/></svg>';
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
  var h = '';
  h += '<div class="' + cls + '">';
  h += '<!--\n';
  h += '      <ins class="adsbygoogle"\n';
  h += '           style="display:block;width:100%;height:100%"\n';
  h += '           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"\n';
  h += '           data-ad-slot="XXXXXXXXXX"\n';
  h += '           data-ad-format="auto"\n';
  h += '           data-full-width-responsive="true"></ins>\n';
  h += '      <script>(adsbygoogle = window.adsbygoogle || []).push({});</' + 'script>\n';
  h += '-->';
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
      html += adCardHtml('span2');
    }
    if (idx === 5) {
      html += adCardHtml('span2x2');
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
