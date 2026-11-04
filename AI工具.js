/**
 * AI工具 分类页 - 数据 + 应用逻辑
 * 31 个网站
 */

var CATEGORY = {
  "id": "ai",
  "name": "AI工具",
  "icon": "ai",
  "sites": [
   { name: 'kimi', url: 'https://www.kimi.com/', favicon: 'favicon/ai/kimi.png' },
   { name: 'deepseek', url: 'https://www.deepseek.com', favicon: 'favicon/ai/deepseek.png' },
   { name: '豆包', url: 'https://www.doubao.com', favicon: 'favicon/ai/豆包.png' },
   { name: '字节TRAE', url: 'https://www.trae.cn', favicon: 'favicon/ai/trae.png' },	
   { name: '扣子', url: 'https://www.coze.cn/overview', favicon: 'favicon/ai/扣子.png' },
   { name: '即梦 ', url: 'https://jimeng.jianying.com', favicon: 'favicon/ai/即梦.png' },
   { name: '百度搭子', url: 'https://www.dumate.cn/', favicon: 'favicon/ai/搭子.png' },
   { name: '百度秒哒', url: 'https://www.miaoda.cn/', favicon: 'favicon/ai/秒哒.png' },
   { name: '库库AI', url: 'https://kuku.baidu.com/', favicon: 'favicon/ai/库库.png' },
   { name: '文心', url: 'https://wenxin.baidu.com/', favicon: 'favicon/ai/文心.ico' },
   { name: '文心一言', url: 'https://yiyan.baidu.com', favicon: 'favicon/ai/文心一言.ico'},
   { name: '文心快码', url: 'https://comate.baidu.com/zh', favicon: 'favicon/ai/文心快码.png' },
   { name: 'accio', url: 'https://www.accio.com', favicon: 'favicon/ai/accio.png' },
   { name: '通义千问',url: 'https://qianwen.aliyun.com',favicon: 'favicon/ai/通义千问.png'},
   { name: '万相', url: 'https://tongyi.aliyun.com/wan/', favicon: 'favicon/ai/万相.png' },
   { name: 'Qoder', url: 'https://qoder.com.cn', favicon: 'favicon/ai/qoder.png' },
   { name: '阿里秒悟', url: 'https://meoo.com/', favicon: 'favicon/ai/meoo.png' },
   { name: '腾讯元器', url: 'https://yuanqi.tencent.com/', favicon: 'favicon/ai/腾讯元器.png' },
   { name: 'codebuddy', url: 'https://www.codebuddy.cn/', favicon: 'favicon/ai/codebuddy.png' },
   { name: 'workbuddy', url: 'https://www.workbuddy.cn', favicon: 'favicon/ai/workbuddy.png' },
   { name: 'qclaw', url: 'https://qclaw.qq.com/', favicon: 'favicon/ai/qclaw.png' },
   { name: '腾讯元宝', url: 'https://yuanbao.tencent.com/', favicon: 'favicon/ai/元宝.png' },
   { name: '可灵', url: 'https://klingai.com', favicon: 'favicon/ai/可灵.png' },
   { name: '讯飞星火', url: 'https://xinghuo.xfyun.cn/', favicon: 'favicon/ai/讯飞星火.png' },
   { name: '智谱Zcode', url: 'https://zcode.z.ai/cn', favicon: 'favicon/ai/智谱Zcode.png' },
   { name: 'AutoClaw', url: 'https://autoclaw.zhipuai.cn/', favicon: 'favicon/ai/autoclaw.png' },
   { name: '清言', url: 'https://chatglm.cn', favicon: 'favicon/ai/清言.png' },
   { name: 'ChatGPT', url: 'https://chat.openai.com', favicon: 'favicon/ai/openai.ico' },
   { name: 'huggingface', url: 'https://huggingface.co', favicon: 'favicon/ai/huggingface.ico' },
   { name: 'claude', url: 'https://claude.ai', favicon: 'favicon/ai/claude.ico' },
   { name: 'Gemini', url: 'https://gemini.google.com', favicon: 'favicon/ai/gemini.png' },
   { name: 'Midjourney', url: 'https://www.midjourney.com', favicon: 'favicon/ai/midjourney.png' },
   { name: 'Stable Diffusion', url: 'https://stability.ai', favicon: 'favicon/ai/stability.png' },
   { name: 'Perplexity', url: 'https://www.perplexity.ai', favicon: 'favicon/ai/perplexity.ico' },
   { name: '百川智能', url: 'https://www.baichuan-ai.com/', favicon: 'favicon/ai/百川.png' },
   { name: '天工AI', url: 'https://www.tiangong.cn/', favicon: 'favicon/ai/天工.ico' },
   { name: '纳米work', url: 'https://work.n.cn/', favicon: 'favicon/ai/纳米.png' },
   { name: '有道龙虾', url: 'https://lobsterai.youdao.com/', favicon: 'favicon/ai/有道龙虾.png' },
   { name: '码上飞', url: 'https://www.codeflying.net/', favicon: 'favicon/ai/码上飞.ico' },

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
