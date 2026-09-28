/**
 * AI工具 分类页 - 数据 + 应用逻辑
 * 10 个网站
 */

var CATEGORY = {
  "id": "ai",
  "name": "AI工具",
  "icon": "ai",
  "sites": [
   { name: ' 豆包', url: 'https://www.doubao.com', favicon: 'favicon/ai/豆包.png' },
   { name: ' 即梦 ', url: 'https://jimeng.jianying.com', favicon: 'favicon/ai/即梦.png' },
   { name: ' 剪映', url: 'https://www.capcut.cn', favicon: 'favicon/ai/剪映.png' },
  { name: ' 扣子', url: 'https://www.coze.cn/overview', favicon: 'favicon/ai/扣子.png' },
  { name: ' 字节TRAE', url: 'https://www.trae.cn', favicon: 'favicon/ai/trae.png' },	
  { name: ' qoder', url: 'https://qoder.com.cn', favicon: 'favicon/ai/qoder.png' },
  { name: ' kimi', url: 'https://www.kimi.com/', favicon: 'favicon/ai/kimi.png' },
  { name: ' deepseek', url: 'http://www.deepseek.com', favicon: 'favicon/ai/deepseek.png' },
  { name: ' 百度搭子', url: 'https://www.dumate.cn/', favicon: 'favicon/ai/搭子.png' },
  { name: ' 百度秒哒', url: 'https://www.miaoda.cn/', favicon: 'favicon/ai/秒哒.png' },
    {"name": "文心一言","url": "https://yiyan.baidu.com","color": "#2932e1"},
  { name: ' 文心快码', url: 'https://comate.baidu.com/zh', favicon: 'favicon/ai/文心快码.png' },
  { name: ' accio', url: 'https://www.accio.com', favicon: 'favicon/ai/accio.png' },
    {"name": "通义千问","url": "https://qianwen.aliyun.com","color": "#615ced"},
  { name: ' 万相', url: 'https://tongyi.aliyun.com/wan/', favicon: 'favicon/ai/万相.png' },
  { name: ' 腾讯元器', url: 'https://yuanqi.tencent.com/', favicon: 'favicon/ai/腾讯元器.png' },
  { name: ' codebuddy', url: 'https://www.codebuddy.cn/', favicon: 'favicon/ai/codebuddy.png' },
  { name: ' workbuddy', url: 'https://www.workbuddy.cn', favicon: 'favicon/ai/workbuddy.png' },
  { name: ' qclaw', url: 'https://qclaw.qq.com/', favicon: 'favicon/ai/qclaw.png' },
  { name: ' 腾讯元宝', url: 'https://yuanbao.tencent.com/', favicon: 'favicon/ai/元宝.png' },
  { name: ' 可灵', url: 'https://klingai.com', favicon: 'favicon/ai/可灵.png' },
  { name: ' 讯飞星火', url: 'https://xinghuo.xfyun.cn/', favicon: 'favicon/ai/讯飞星火.png' },
  { name: ' 智谱Zcode', url: 'https://zcode.z.ai/cn', favicon: 'favicon/ai/智谱Zcode.png' },
  { name: ' 清言', url: 'https://chatglm.cn', favicon: 'favicon/ai/清言.png' },
  
   
    {
      "name": "ChatGPT",
      "url": "https://chat.openai.com",
      "color": "#10a37f"
    },
    {
      "name": "Kimi",
      "url": "https://kimi.moonshot.cn",
      "color": "#1a1a2e"
    },
    {
      "name": "Claude",
      "url": "https://claude.ai",
      "color": "#d97757"
    },
    {
      "name": "Hugging Face",
      "url": "https://huggingface.co",
      "color": "#ff9d00"
    },
    {
      "name": "Google Gemini",
      "url": "https://gemini.google.com",
      "color": "#4285f4"
    },
    {
      "name": "Midjourney",
      "url": "https://www.midjourney.com",
      "color": "#000000"
    },
    {
      "name": "Stable Diffusion",
      "url": "https://stability.ai",
      "color": "#9b59b6"
    },
    {
      "name": "Perplexity",
      "url": "https://www.perplexity.ai",
      "color": "#20a4a4"
    }
  ]
};

var ICON_SVG = '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3" fill="#10a37f"/><rect x="9" y="9" width="6" height="6" rx="1" fill="#fff"/><path d="M2 12h2M20 12h2M12 2v2M12 20v2" stroke="#4285f4" stroke-width="2" stroke-linecap="round"/><circle cx="4.5" cy="4.5" r="1.5" fill="#ff9d00"/><circle cx="19.5" cy="19.5" r="1.5" fill="#ff9d00"/></svg>';
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
