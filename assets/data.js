/**
 * NavHub 导航数据
 * 26 个分类，每个分类包含若干网站
 */

var CATEGORIES = [
  { id: 'search', name: '搜索引擎', icon: 'search', sites: [
    { name: 'Google', url: 'https://www.google.com', color: '#4285f4' },
    { name: '百度', url: 'https://www.baidu.com', color: '#2932e1' },
    { name: 'Bing', url: 'https://www.bing.com', color: '#0078d4' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com', color: '#de5833' },
    { name: '搜狗', url: 'https://www.sogou.com', color: '#ff5a1f' },
    { name: '360搜索', url: 'https://www.so.com', color: '#1bb968' },
    { name: 'Yandex', url: 'https://yandex.com', color: '#ff3333' },
    { name: 'Ecosia', url: 'https://www.ecosia.org', color: '#00a0a0' },
    { name: 'Startpage', url: 'https://www.startpage.com', color: '#6526d3' },
    { name: 'Brave Search', url: 'https://search.brave.com', color: '#fb542b' },
  ]},
  { id: 'social', name: '社交媒体', icon: 'social', sites: [
    { name: '微博', url: 'https://weibo.com', color: '#e6162d' },
    { name: '微信网页版', url: 'https://wx.qq.com', color: '#07c160' },
    { name: '小红书', url: 'https://www.xiaohongshu.com', color: '#ff2741' },
    { name: '知乎', url: 'https://www.zhihu.com', color: '#0084ff' },
    { name: '豆瓣', url: 'https://www.douban.com', color: '#007722' },
    { name: 'X (Twitter)', url: 'https://x.com', color: '#1a1a1a' },
    { name: 'Reddit', url: 'https://www.reddit.com', color: '#ff4500' },
    { name: 'Facebook', url: 'https://www.facebook.com', color: '#1877f2' },
    { name: 'Instagram', url: 'https://www.instagram.com', color: '#e4405f' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', color: '#0a66c2' },
  ]},
  { id: 'news', name: '新闻资讯', icon: 'news', sites: [
    { name: '今日头条', url: 'https://www.toutiao.com', color: '#ff4040' },
    { name: '36氪', url: 'https://36kr.com', color: '#0061ff' },
    { name: '虎嗅', url: 'https://www.huxiu.com', color: '#ff5a36' },
    { name: '澎湃新闻', url: 'https://www.thepaper.cn', color: '#ff7700' },
    { name: '网易新闻', url: 'https://news.163.com', color: '#c20c02' },
    { name: '腾讯新闻', url: 'https://news.qq.com', color: '#0f81c7' },
    { name: '界面新闻', url: 'https://www.jiemian.com', color: '#1a73e8' },
    { name: '凤凰新闻', url: 'https://news.ifeng.com', color: '#ff5500' },
    { name: 'BBC中文', url: 'https://www.bbc.com/zhongwen', color: '#bb1919' },
    { name: '路透社', url: 'https://www.reuters.com', color: '#ff6600' },
  ]},
  { id: 'tools', name: '常用工具', icon: 'tools', sites: [
    { name: '百度翻译', url: 'https://fanyi.baidu.com', color: '#2932e1' },
    { name: 'DeepL', url: 'https://www.deepl.com', color: '#0f2d52' },
    { name: '菜鸟教程', url: 'https://www.runoob.com', color: '#3cb371' },
    { name: '草料二维码', url: 'https://cli.im', color: '#00b38a' },
    { name: 'Photopea', url: 'https://www.photopea.com', color: '#18c520' },
    { name: 'TinyPNG', url: 'https://tinypng.com', color: '#22b14c' },
    { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', color: '#dd1100' },
    { name: 'removebg', url: 'https://www.remove.bg', color: '#5a2de8' },
    { name: '腾讯文档', url: 'https://docs.qq.com', color: '#1677ff' },
    { name: '幕布', url: 'https://mubu.com', color: '#ff6b6b' },
  ]},
  { id: 'shopping', name: '购物电商', icon: 'shopping', sites: [
    { name: '淘宝', url: 'https://www.taobao.com', color: '#ff5000' },
    { name: '京东', url: 'https://www.jd.com', color: '#e1251b' },
    { name: '天猫', url: 'https://www.tmall.com', color: '#ff0036' },
    { name: '拼多多', url: 'https://www.pinduoduo.com', color: '#e02020' },
    { name: '苏宁易购', url: 'https://www.suning.com', color: '#ff8000' },
    { name: '唯品会', url: 'https://www.vip.com', color: '#ff2d8a' },
    { name: 'Amazon', url: 'https://www.amazon.com', color: '#ff9900' },
    { name: '当当网', url: 'https://www.dangdang.com', color: '#ff2832' },
    { name: '得物', url: 'https://www.dewu.com', color: '#1a1a1a' },
    { name: '1688', url: 'https://www.1688.com', color: '#ff6a00' },
  ]},
  { id: 'video', name: '影音娱乐', icon: 'video', sites: [
    { name: 'B站', url: 'https://www.bilibili.com', color: '#fb7299' },
    { name: '优酷', url: 'https://www.youku.com', color: '#1ab7e5' },
    { name: '爱奇艺', url: 'https://www.iqiyi.com', color: '#00be06' },
    { name: '腾讯视频', url: 'https://v.qq.com', color: '#ff6022' },
    { name: 'YouTube', url: 'https://www.youtube.com', color: '#ff0000' },
    { name: '网易云音乐', url: 'https://music.163.com', color: '#c20c0c' },
    { name: 'QQ音乐', url: 'https://y.qq.com', color: '#31c27c' },
    { name: 'Spotify', url: 'https://www.spotify.com', color: '#1db954' },
    { name: '抖音', url: 'https://www.douyin.com', color: '#161823' },
    { name: '芒果TV', url: 'https://www.mgtv.com', color: '#ff5f00' },
  ]},
  { id: 'dev', name: '开发者', icon: 'dev', sites: [
    { name: 'GitHub', url: 'https://github.com', color: '#24292e' },
    { name: 'GitLab', url: 'https://gitlab.com', color: '#fc6d26' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', color: '#f48024' },
    { name: 'MDN', url: 'https://developer.mozilla.org', color: '#000000' },
    { name: 'npm', url: 'https://www.npmjs.com', color: '#cb3837' },
    { name: 'Can I Use', url: 'https://caniuse.com', color: '#0066ff' },
    { name: 'CodePen', url: 'https://codepen.io', color: '#000000' },
    { name: 'LeetCode', url: 'https://leetcode.cn', color: '#ffa116' },
    { name: 'Gitee', url: 'https://gitee.com', color: '#c71d23' },
    { name: 'DevDocs', url: 'https://devdocs.io', color: '#222' },
  ]},
  { id: 'ai', name: 'AI工具', icon: 'ai', sites: [
    { name: 'ChatGPT', url: 'https://chat.openai.com', color: '#10a37f' },
    { name: '文心一言', url: 'https://yiyan.baidu.com', color: '#2932e1' },
    { name: 'Kimi', url: 'https://kimi.moonshot.cn', color: '#1a1a2e' },
    { name: '通义千问', url: 'https://qianwen.aliyun.com', color: '#615ced' },
    { name: 'Claude', url: 'https://claude.ai', color: '#d97757' },
    { name: 'Hugging Face', url: 'https://huggingface.co', color: '#ff9d00' },
    { name: 'Google Gemini', url: 'https://gemini.google.com', color: '#4285f4' },
    { name: 'Midjourney', url: 'https://www.midjourney.com', color: '#000000' },
    { name: 'Stable Diffusion', url: 'https://stability.ai', color: '#9b59b6' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai', color: '#20a4a4' },
  ]},
  { id: 'education', name: '学习教育', icon: 'edu', sites: [
    { name: '网易公开课', url: 'https://open.163.com', color: '#c0301f' },
    { name: '中国大学MOOC', url: 'https://www.icourse163.org', color: '#2c8fbb' },
    { name: '慕课网', url: 'https://www.imooc.com', color: '#1abc9c' },
    { name: '极客时间', url: 'https://time.geekbang.org', color: '#ff4e00' },
    { name: '学堂在线', url: 'https://www.xuetangx.com', color: '#8b1a1a' },
    { name: '百度学术', url: 'https://xueshu.baidu.com', color: '#2932e1' },
    { name: 'Coursera', url: 'https://www.coursera.org', color: '#0056d2' },
    { name: 'edX', url: 'https://www.edx.org', color: '#0224b4' },
    { name: 'Khan Academy', url: 'https://www.khanacademy.org', color: '#14bf96' },
    { name: 'TED', url: 'https://www.ted.com', color: '#e62b1e' },
  ]},
  { id: 'devdocs', name: '文档参考', icon: 'docs', sites: [
    { name: 'Vue.js', url: 'https://cn.vuejs.org', color: '#42b883' },
    { name: 'React', url: 'https://react.dev', color: '#61dafb' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org', color: '#3178c6' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com', color: '#06b6d4' },
    { name: 'Next.js', url: 'https://nextjs.org', color: '#000000' },
    { name: 'Python', url: 'https://www.python.org', color: '#3776ab' },
    { name: 'Go', url: 'https://go.dev', color: '#00add8' },
    { name: 'Rust', url: 'https://www.rust-lang.org', color: '#ce422b' },
    { name: 'Node.js', url: 'https://nodejs.org', color: '#339933' },
    { name: 'Docker', url: 'https://www.docker.com', color: '#2496ed' },
  ]},
  { id: 'cloud', name: '云服务', icon: 'cloud', sites: [
    { name: '阿里云', url: 'https://www.aliyun.com', color: '#ff6a00' },
    { name: '腾讯云', url: 'https://cloud.tencent.com', color: '#00a4ff' },
    { name: '华为云', url: 'https://www.huaweicloud.com', color: '#c7000b' },
    { name: '百度智能云', url: 'https://cloud.baidu.com', color: '#2932e1' },
    { name: 'AWS', url: 'https://aws.amazon.com', color: '#ff9900' },
    { name: 'Google Cloud', url: 'https://cloud.google.com', color: '#4285f4' },
    { name: 'Microsoft Azure', url: 'https://azure.microsoft.com', color: '#0078d4' },
    { name: 'Vercel', url: 'https://vercel.com', color: '#000000' },
    { name: 'Cloudflare', url: 'https://www.cloudflare.com', color: '#f38020' },
    { name: 'Oracle Cloud', url: 'https://www.oracle.com/cloud', color: '#ff0000' },
  ]},
  { id: 'design', name: '设计资源', icon: 'design', sites: [
    { name: 'Dribbble', url: 'https://dribbble.com', color: '#ea4c89' },
    { name: 'Behance', url: 'https://www.behance.net', color: '#1769ff' },
    { name: 'Figma', url: 'https://www.figma.com', color: '#a259ff' },
    { name: 'Sketch', url: 'https://www.sketch.com', color: '#f7b500' },
    { name: 'Unsplash', url: 'https://unsplash.com', color: '#000000' },
    { name: 'Pexels', url: 'https://www.pexels.com', color: '#05a081' },
    { name: 'iconfont', url: 'https://www.iconfont.cn', color: '#2c8cff' },
    { name: 'Lucide Icons', url: 'https://lucide.dev', color: '#000000' },
    { name: 'Coolors', url: 'https://coolors.co', color: '#ff6b6b' },
    { name: 'Google Fonts', url: 'https://fonts.google.com', color: '#4285f4' },
  ]},
  { id: 'job', name: '招聘求职', icon: 'job', sites: [
    { name: 'BOSS直聘', url: 'https://www.zhipin.com', color: '#00a6ff' },
    { name: '智联招聘', url: 'https://www.zhaopin.com', color: '#ff5b1e' },
    { name: '前程无忧', url: 'https://www.51job.com', color: '#ff6600' },
    { name: '拉勾网', url: 'https://www.lagou.com', color: '#00b38a' },
    { name: '猎聘', url: 'https://www.liepin.com', color: '#2c8fbb' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', color: '#0a66c2' },
    { name: 'Indeed', url: 'https://www.indeed.com', color: '#2557a7' },
    { name: 'Glassdoor', url: 'https://www.glassdoor.com', color: '#0caa41' },
    { name: '脉脉', url: 'https://maimai.cn', color: '#1a73e8' },
    { name: '牛客网', url: 'https://www.nowcoder.com', color: '#00a0a0' },
  ]},
  { id: 'travel', name: '旅游出行', icon: 'travel', sites: [
    { name: '携程', url: 'https://www.ctrip.com', color: '#0086f6' },
    { name: '去哪儿', url: 'https://www.qunar.com', color: '#3c8cff' },
    { name: '飞猪', url: 'https://www.fliggy.com', color: '#ff6a00' },
    { name: '12306', url: 'https://www.12306.cn', color: '#0066cc' },
    { name: '马蜂窝', url: 'https://www.mafengwo.cn', color: '#ff9d00' },
    { name: 'Booking', url: 'https://www.booking.com', color: '#003580' },
    { name: 'Airbnb', url: 'https://www.airbnb.com', color: '#ff5a5f' },
    { name: 'TripAdvisor', url: 'https://www.tripadvisor.com', color: '#34e0a1' },
    { name: '同程旅行', url: 'https://www.ly.com', color: '#00b3fd' },
    { name: '途牛', url: 'https://www.tuniu.com', color: '#ff5510' },
  ]},
  { id: 'life', name: '生活服务', icon: 'life', sites: [
    { name: '美团', url: 'https://www.meituan.com', color: '#ffc300' },
    { name: '大众点评', url: 'https://www.dianping.com', color: '#ff6600' },
    { name: '饿了么', url: 'https://www.ele.me', color: '#0198ff' },
    { name: '58同城', url: 'https://www.58.com', color: '#ff552e' },
    { name: '贝壳找房', url: 'https://www.ke.com', color: '#0066cc' },
    { name: '链家', url: 'https://www.lianjia.com', color: '#00a4ff' },
    { name: '滴滴出行', url: 'https://www.diditrip.com', color: '#ff7e02' },
    { name: '高德地图', url: 'https://www.amap.com', color: '#0096ff' },
    { name: '百度地图', url: 'https://map.baidu.com', color: '#2932e1' },
    { name: '天气通', url: 'https://www.tianqi.com', color: '#1ab7e5' },
  ]},
  { id: 'finance', name: '金融理财', icon: 'finance', sites: [
    { name: '支付宝', url: 'https://www.alipay.com', color: '#1677ff' },
    { name: '微信支付', url: 'https://pay.weixin.qq.com', color: '#07c160' },
    { name: '京东金融', url: 'https://www.jdpay.com', color: '#e1251b' },
    { name: '东方财富', url: 'https://www.eastmoney.com', color: '#e03a1d' },
    { name: '同花顺', url: 'https://www.10jqka.com.cn', color: '#ff6b1a' },
    { name: '雪球', url: 'https://xueqiu.com', color: '#1a73e8' },
    { name: '蚂蚁财富', url: 'https://www.antfortune.com', color: '#1677ff' },
    { name: '新浪财经', url: 'https://finance.sina.com.cn', color: '#ff0000' },
    { name: '招商银行', url: 'https://www.cmbchina.com', color: '#c7000b' },
    { name: '工商银行', url: 'https://www.icbc.com.cn', color: '#c7000b' },
  ]},
  { id: 'health', name: '健康医疗', icon: 'health', sites: [
    { name: '丁香园', url: 'https://www.dxy.cn', color: '#00a0a0' },
    { name: '好大夫在线', url: 'https://www.haodf.com', color: '#00b3fd' },
    { name: '春雨医生', url: 'https://www.chunyuyisheng.com', color: '#00a4ff' },
    { name: '微医', url: 'https://www.guahao.com', color: '#1a73e8' },
    { name: '平安健康', url: 'https://www.jk.cn', color: '#ff6b1a' },
    { name: '京东健康', url: 'https://health.jd.com', color: '#e1251b' },
    { name: '薄荷健康', url: 'https://www.boohee.com', color: '#00be06' },
    { name: 'Keep', url: 'https://www.keep.com', color: '#161823' },
    { name: '华为运动健康', url: 'https://health.huawei.com', color: '#c7000b' },
    { name: ' Mayo Clinic', url: 'https://www.mayoclinic.org', color: '#0078d4' },
  ]},
  { id: 'sports', name: '体育运动', icon: 'sports', sites: [
    { name: '虎扑', url: 'https://www.hupu.com', color: '#ff6600' },
    { name: '直播吧', url: 'https://www.zhibo8.com', color: '#1a73e8' },
    { name: '懂球帝', url: 'https://www.dongqiudi.com', color: '#00a0a0' },
    { name: 'CCTV5', url: 'https://tv.cctv.com', color: '#c7000b' },
    { name: '新浪体育', url: 'https://sports.sina.com.cn', color: '#ff0000' },
    { name: '腾讯体育', url: 'https://sports.qq.com', color: '#0f81c7' },
    { name: 'ESPN', url: 'https://www.espn.com', color: '#cc0000' },
    { name: 'NBA中文', url: 'https://china.nba.com', color: '#17408b' },
    { name: '虎扑跑步', url: 'https://run.hupu.com', color: '#ff6600' },
    { name: '悦跑圈', url: 'https://www.joyrun.com', color: '#00be06' },
  ]},
  { id: 'gov', name: '政府政务', icon: 'gov', sites: [
    { name: '中国政府网', url: 'https://www.gov.cn', color: '#c7000b' },
    { name: '国家税务总局', url: 'https://www.chinatax.gov.cn', color: '#0056d2' },
    { name: '国家企业信用信息公示系统', url: 'https://www.gsxt.gov.cn', color: '#0066cc' },
    { name: '国家知识产权局', url: 'https://www.cnipa.gov.cn', color: '#003580' },
    { name: '中国海关', url: 'https://www.customs.gov.cn', color: '#0066cc' },
    { name: '国家移民局', url: 'https://www.nia.gov.cn', color: '#1a5c7a' },
    { name: '教育部', url: 'https://www.moe.gov.cn', color: '#0056d2' },
    { name: '人社部', url: 'https://www.mohrss.gov.cn', color: '#1a73e8' },
    { name: '国家发改委', url: 'https://www.ndrc.gov.cn', color: '#0066cc' },
    { name: '国家卫健委', url: 'https://www.nhc.gov.cn', color: '#0f81c7' },
  ]},
  { id: 'email', name: '邮箱服务', icon: 'email', sites: [
    { name: 'Gmail', url: 'https://mail.google.com', color: '#ea4335' },
    { name: 'QQ邮箱', url: 'https://mail.qq.com', color: '#12b7f0' },
    { name: '网易邮箱', url: 'https://mail.163.com', color: '#ff3333' },
    { name: 'Outlook', url: 'https://outlook.live.com', color: '#0078d4' },
    { name: '126邮箱', url: 'https://mail.126.com', color: '#ff6600' },
    { name: '新浪邮箱', url: 'https://mail.sina.com.cn', color: '#ff0000' },
    { name: '139邮箱', url: 'https://mail.10086.cn', color: '#00a0a0' },
    { name: 'Yahoo Mail', url: 'https://mail.yahoo.com', color: '#6001d2' },
    { name: 'ProtonMail', url: 'https://proton.me/mail', color: '#6d4aff' },
    { name: 'Zoho Mail', url: 'https://www.zoho.com/mail', color: '#c8202f' },
  ]},
  { id: 'reading', name: '阅读出版', icon: 'reading', sites: [
    { name: '微信读书', url: 'https://weread.qq.com', color: '#1a5634' },
    { name: '豆瓣读书', url: 'https://book.douban.com', color: '#007722' },
    { name: '起点中文网', url: 'https://www.qidian.com', color: '#ff4d00' },
    { name: '番茄小说', url: 'https://fanqienovel.com', color: '#ff3141' },
    { name: '晋江原创网', url: 'https://www.jjwxc.net', color: '#cc3366' },
    { name: '得到', url: 'https://www.dedao.cn', color: '#222' },
    { name: '亚马逊Kindle', url: 'https://www.amazon.com/Kindle', color: '#ff9900' },
    { name: '知乎盐选', url: 'https://www.zhihu.com/market', color: '#0084ff' },
    { name: '中书网', url: 'https://www.zhongshu.com', color: '#ff6600' },
    { name: 'Goodreads', url: 'https://www.goodreads.com', color: '#382110' },
  ]},
  { id: 'forum', name: '社区论坛', icon: 'forum', sites: [
    { name: '百度贴吧', url: 'https://tieba.baidu.com', color: '#4e6ef2' },
    { name: '虎扑社区', url: 'https://www.hupu.com', color: '#ff6600' },
    { name: 'V2EX', url: 'https://www.v2ex.com', color: '#333' },
    { name: 'Node Seek', url: 'https://www.nodeseek.com', color: '#0066cc' },
    { name: 'HostLoc', url: 'https://www.hostloc.com', color: '#ff5a1f' },
    { name: '吾爱破解', url: 'https://www.52pojie.cn', color: '#cc3333' },
    { name: '恩山论坛', url: 'https://www.right.com.cn', color: '#0066cc' },
    { name: '远景论坛', url: 'https://bbs.pcbeta.com', color: '#0096ff' },
    { name: '潮下载', url: 'https://www.chaoxz.com', color: '#1a73e8' },
    { name: '1024社区', url: 'https://www.1024.com', color: '#222' },
  ]},
  { id: 'blockchain', name: '区块链', icon: 'blockchain', sites: [
    { name: '币安', url: 'https://www.binance.com', color: '#f0b90b' },
    { name: '欧易OKX', url: 'https://www.okx.com', color: '#000000' },
    { name: 'CoinMarketCap', url: 'https://coinmarketcap.com', color: '#3861fb' },
    { name: '以太坊', url: 'https://ethereum.org', color: '#627eea' },
    { name: 'Etherscan', url: 'https://etherscan.io', color: '#21325b' },
    { name: 'Chainlink', url: 'https://chain.link', color: '#2a5ada' },
    { name: 'Uniswap', url: 'https://uniswap.org', color: '#ff007a' },
    { name: 'MetaMask', url: 'https://metamask.io', color: '#f6851b' },
    { name: 'OpenSea', url: 'https://opensea.io', color: '#2081e2' },
    { name: 'Dune', url: 'https://dune.com', color: '#0b2443' },
  ]},
  { id: 'kids', name: '亲子教育', icon: 'kids', sites: [
    { name: '宝宝巴士', url: 'https://www.babybus.com', color: '#ff8a00' },
    { name: '小伴龙', url: 'https://www.xiaobanlong.com', color: '#4ecdc4' },
    { name: '凯叔讲故事', url: 'https://www.kaishu.cn', color: '#ff6b6b' },
    { name: '学而思网校', url: 'https://www.xueersi.com', color: '#e94560' },
    { name: '猿辅导', url: 'https://www.yuanfudao.com', color: '#f96060' },
    { name: '作业帮', url: 'https://www.zybang.com', color: '#ff7a00' },
    { name: '洪恩识字', url: 'https://www.ihuman.com', color: '#e8382e' },
    { name: '叫叫阅读', url: 'https://www.j-jia.com', color: '#ff9500' },
    { name: '火花思维', url: 'https://www.huohua.cn', color: '#ff5050' },
    { name: '巧虎', url: 'https://www.qiaohu.com', color: '#ff6600' },
  ]},
  { id: 'games', name: '游戏娱乐', icon: 'games', sites: [
    { name: 'Steam', url: 'https://store.steampowered.com', color: '#1b2838' },
    { name: 'Epic Games', url: 'https://store.epicgames.com', color: '#0078f2' },
    { name: 'TapTap', url: 'https://www.taptap.cn', color: '#ff4d4f' },
    { name: 'NGA', url: 'https://nga.cn', color: '#c7000b' },
    { name: '游民星空', url: 'https://www.gamersky.com', color: '#e60012' },
    { name: '3DMGame', url: 'https://www.3dmgame.com', color: '#cc0000' },
    { name: 'Itch.io', url: 'https://itch.io', color: '#fa5c5c' },
    { name: 'GOG', url: 'https://www.gog.com', color: '#9b2c2c' },
    { name: 'IGN', url: 'https://www.ign.com', color: '#bf1313' },
    { name: '游侠网', url: 'https://www.ali213.net', color: '#0066cc' },
  ]},
  { id: 'podcast', name: '播客音频', icon: 'podcast', sites: [
    { name: '小宇宙', url: 'https://www.xiaoyuzhoufm.com', color: '#ff5c00' },
    { name: '喜马拉雅', url: 'https://www.ximalaya.com', color: '#d43333' },
    { name: '荔枝FM', url: 'https://www.lizhi.fm', color: '#ff6600' },
    { name: '蜻蜓FM', url: 'https://www.qingting.fm', color: '#0096ff' },
    { name: '网易云音乐', url: 'https://music.163.com', color: '#c20c0c' },
    { name: 'Apple Podcast', url: 'https://podcasts.apple.com', color: '#8e44ad' },
    { name: 'Spotify', url: 'https://www.spotify.com', color: '#1db954' },
    { name: 'Pocket Casts', url: 'https://pocketcasts.com', color: '#f43e37' },
    { name: 'JustPod', url: 'https://www.justpod.cn', color: '#1a1a2e' },
    { name: '播客小镇', url: 'https://www.podtown.cn', color: '#ff4081' },
  ]},
];

/**
 * 自定义 Favicon 配置说明
 * =============================
 * 每个网站对象的 favicon 字段可填写：
 *   1. 本地图片路径，如 "favicons/google.png"（放在项目目录下）
 *   2. 远程图片 URL，如 "https://www.google.com/favicon.ico"
 *   3. 留空 "" — 自动使用首字母色块作为 fallback
 *
 * 推荐做法：在项目根目录新建 favicons/ 文件夹，
 * 将各网站的 favicon 图标放入其中，然后在下方填写路径。
 *
 * 示例：
 *   { name: 'Google', url: 'https://www.google.com', color: '#4285f4', favicon: 'favicons/google.png' }
 *   { name: '百度', url: 'https://www.baidu.com', color: '#2932e1', favicon: 'favicons/baidu.png' }
 *   { name: '某网站', url: 'https://example.com', color: '#ff0000', favicon: '' }
 */

function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

/**
 * 温和色调调色板 - 用于首页分类卡片背景
 * 每个分类根据 index 取不同温和色，低饱和度、柔和不刺眼
 */
var CARD_TINTS = [
  { dark: 'rgba(66, 133, 244, 0.06)', light: 'rgba(66, 133, 244, 0.04)' },   // 蓝
  { dark: 'rgba(233, 30, 99, 0.06)', light: 'rgba(233, 30, 99, 0.04)' },      // 粉红
  { dark: 'rgba(255, 152, 0, 0.06)', light: 'rgba(255, 152, 0, 0.04)' },      // 橙
  { dark: 'rgba(76, 175, 80, 0.06)', light: 'rgba(76, 175, 80, 0.04)' },      // 绿
  { dark: 'rgba(156, 39, 176, 0.06)', light: 'rgba(156, 39, 176, 0.04)' },     // 紫
  { dark: 'rgba(0, 188, 212, 0.06)', light: 'rgba(0, 188, 212, 0.04)' },       // 青
  { dark: 'rgba(255, 87, 34, 0.06)', light: 'rgba(255, 87, 34, 0.04)' },        // 深橙
  { dark: 'rgba(121, 85, 72, 0.06)', light: 'rgba(121, 85, 72, 0.04)' },       // 棕
  { dark: 'rgba(0, 150, 136, 0.06)', light: 'rgba(0, 150, 136, 0.04)' },       // 蓝绿
  { dark: 'rgba(124, 77, 255, 0.06)', light: 'rgba(124, 77, 255, 0.04)' },     // 靛蓝
  { dark: 'rgba(233, 30, 99, 0.06)', light: 'rgba(233, 30, 99, 0.04)' },      // 粉红
  { dark: 'rgba(255, 193, 7, 0.06)', light: 'rgba(255, 193, 7, 0.04)' },      // 琥珀
  { dark: 'rgba(139, 195, 74, 0.06)', light: 'rgba(139, 195, 74, 0.04)' },    // 浅绿
  { dark: 'rgba(255, 138, 101, 0.06)', light: 'rgba(255, 138, 101, 0.04)' },   // 浅橙
  { dark: 'rgba(149, 117, 205, 0.06)', light: 'rgba(149, 117, 205, 0.04)' },  // 淡紫
  { dark: 'rgba(77, 208, 225, 0.06)', light: 'rgba(77, 208, 225, 0.04)' },    // 浅青
  { dark: 'rgba(240, 98, 146, 0.06)', light: 'rgba(240, 98, 146, 0.04)' },    // 浅粉
  { dark: 'rgba(174, 213, 129, 0.06)', light: 'rgba(174, 213, 129, 0.04)' },  // 嫩绿
  { dark: 'rgba(255, 183, 77, 0.06)', light: 'rgba(255, 183, 77, 0.04)' },    // 暖橙
  { dark: 'rgba(128, 222, 234, 0.06)', light: 'rgba(128, 222, 234, 0.04)' },  // 冰蓝
  { dark: 'rgba(72, 187, 120, 0.06)', light: 'rgba(72, 187, 120, 0.04)' },   // 翠绿
  { dark: 'rgba(128, 90, 213, 0.06)', light: 'rgba(128, 90, 213, 0.04)' },   // 紫罗兰
  { dark: 'rgba(237, 137, 54, 0.06)', light: 'rgba(237, 137, 54, 0.04)' },   // 南瓜橙
  { dark: 'rgba(68, 189, 50, 0.06)', light: 'rgba(68, 189, 50, 0.04)' },     // 草绿
  { dark: 'rgba(0, 184, 148, 0.06)', light: 'rgba(0, 184, 148, 0.04)' },     // 湖青
  { dark: 'rgba(255, 138, 101, 0.06)', light: 'rgba(255, 138, 101, 0.04)' }, // 浅橙
  { dark: 'rgba(149, 117, 205, 0.06)', light: 'rgba(149, 117, 205, 0.04)' }, // 淡紫
  { dark: 'rgba(77, 208, 225, 0.06)', light: 'rgba(77, 208, 225, 0.04)' },   // 浅青
  { dark: 'rgba(240, 98, 146, 0.06)', light: 'rgba(240, 98, 146, 0.04)' },   // 浅粉
];

function getCardTint(idx) {
  return CARD_TINTS[idx % CARD_TINTS.length];
}

/**
 * 图标 SVG 字典 - 每个分类一个彩色 SVG 图标
 * 使用 fill 属性赋予每个图案独立颜色，呈现彩色图案效果
 */
var ICON_SVG = {
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="#4285f4"/><path d="M11 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#fff"/><path d="m20 20-3.5-3.5" stroke="#34a853" stroke-width="2.5" stroke-linecap="round"/></svg>',
  social: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3" fill="#e6162d"/><circle cx="18" cy="6" r="3" fill="#1a73e8"/><circle cx="18" cy="18" r="3" fill="#00ba34"/><path d="M9 12h6M6 10l9-3M6 14l9 3" stroke="#5f6368" stroke-width="1.5" fill="none"/></svg>',
  news: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#0061ff"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="11" width="12" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="14" width="8" height="1.5" rx="0.75" fill="#9ec5ff"/><rect x="6" y="17" width="6" height="1.5" rx="0.75" fill="#9ec5ff"/><circle cx="20" cy="5" r="3" fill="#ff5a36"/></svg>',
  tools: '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.1-2.1z" fill="#f59e0b"/><circle cx="17.5" cy="6.5" r="2.5" fill="#3cb371"/></svg>',
  shopping: '<svg viewBox="0 0 24 24"><path d="M5 7h14l-1.5 12h-11z" fill="#ff5000"/><circle cx="9" cy="6" r="2" fill="#fff" stroke="#ff5000" stroke-width="1.5"/><circle cx="17" cy="6" r="2" fill="#fff" stroke="#ff5000" stroke-width="1.5"/><rect x="8" y="10" width="8" height="6" rx="1" fill="#fff" opacity="0.3"/></svg>',
  video: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" fill="#fb7299"/><path d="m10 9 5 3-5 3z" fill="#fff"/><circle cx="19" cy="6" r="2.5" fill="#00be06"/><circle cx="5" cy="6" r="2" fill="#ff6022"/></svg>',
  dev: '<svg viewBox="0 0 24 24"><path d="m8 6-6 6 6 6" stroke="#24292e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="m16 6 6 6-6 6" stroke="#fc6d26" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M14 4l-4 16" stroke="#f48024" stroke-width="2.5" stroke-linecap="round"/></svg>',
  ai: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3" fill="#10a37f"/><rect x="9" y="9" width="6" height="6" rx="1" fill="#fff"/><path d="M2 12h2M20 12h2M12 2v2M12 20v2" stroke="#4285f4" stroke-width="2" stroke-linecap="round"/><circle cx="4.5" cy="4.5" r="1.5" fill="#ff9d00"/><circle cx="19.5" cy="19.5" r="1.5" fill="#ff9d00"/></svg>',
  edu: '<svg viewBox="0 0 24 24"><path d="M22 10 12 4 2 10l10 6 10-6z" fill="#2c8fbb"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" fill="#1abc9c"/><rect x="16" y="9" width="3" height="6" rx="1" fill="#ff4e00"/></svg>',
  docs: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#3178c6"/><path d="M14 2v6h6" fill="#06b6d4"/><rect x="8" y="12" width="8" height="1.5" rx="0.75" fill="#fff"/><rect x="8" y="15" width="6" height="1.5" rx="0.75" fill="#fff"/><rect x="8" y="18" width="4" height="1.5" rx="0.75" fill="#fff"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 1.5A4 4 0 0 0 6 19z" fill="#ff6a00"/><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 1.5A4 4 0 0 0 6 19z" fill="url(#cg)" opacity="0.3"/><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00a4ff"/><stop offset="1" stop-color="#0078d4"/></linearGradient></defs></svg>',
  design: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#a259ff"/><circle cx="19" cy="5" r="2.5" fill="#ea4c89"/><circle cx="5" cy="19" r="2.5" fill="#f7b500"/><path d="M19 5 5 19" stroke="#1769ff" stroke-width="1.5"/><path d="M14 12l5-7M12 14l-7 5" stroke="#2c8cff" stroke-width="1" fill="none" stroke-dasharray="2 2"/></svg>',
  job: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" fill="#00a6ff"/><rect x="8" y="3" width="8" height="5" rx="1" fill="#ff5b1e"/><rect x="5" y="11" width="14" height="2" rx="1" fill="#fff" opacity="0.4"/><circle cx="17" cy="17" r="2" fill="#ff6600"/></svg>',
  travel: '<svg viewBox="0 0 24 24"><path d="M2 12l9 3 1 9 3-9 9-3-9-3-1-9-3 9z" fill="#ff6a00"/><path d="M12 5l-1 7-9 0 9 3z" fill="#0086f6" opacity="0.5"/></svg>',
  life: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" fill="#ffc300"/><circle cx="12" cy="9" r="2.5" fill="#ff6600"/><circle cx="12" cy="9" r="1" fill="#fff"/></svg>',
  finance: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1677ff"/><circle cx="12" cy="12" r="8" fill="#fff" opacity="0.15"/><path d="M12 6v12" stroke="#fff" stroke-width="1.5"/><path d="M15 9a2.5 2.5 0 0 0-3-2c-1.5 0-2.5 1-2.5 2s1 2 2.5 2 2.5 1 2.5 2-1 2-2.5 2a2.5 2.5 0 0 1-3-2" stroke="#ffc300" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
  health: '<svg viewBox="0 0 24 24"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="#00a0a0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="3" cy="12" r="2" fill="#ff6b1a"/><circle cx="21" cy="12" r="2" fill="#00be06"/><circle cx="9" cy="5" r="1.5" fill="#e1251b"/></svg>',
  sports: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#ff6600"/><path d="M3 12c4 0 9-4 9-9M12 3c0 5 5 9 9 9M21 12c-4 0-9 4-9 9M12 21c0-5-5-9-9-9" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/></svg>',
  gov: '<svg viewBox="0 0 24 24"><path d="M3 21h18" stroke="#c7000b" stroke-width="2.5" stroke-linecap="round"/><path d="M5 21V10l7-7 7 7v11" fill="#c7000b"/><rect x="9" y="15" width="6" height="6" fill="#fff"/><rect x="9" y="12" width="6" height="2" fill="#0056d2"/></svg>',
  email: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#ea4335"/><path d="m2 6 10 7 10-7" fill="#fff" opacity="0.2"/><path d="m2 6 10 7 10-7" stroke="#fff" stroke-width="1.5" fill="none"/></svg>',
  reading: '<svg viewBox="0 0 24 24"><path d="M4 4h7v16H4z" fill="#1a5634"/><path d="M13 4h7v16h-7z" fill="#ff4d00"/><path d="M11 4h2v16h-2z" fill="#382110"/><rect x="6" y="7" width="3" height="1.5" rx="0.75" fill="#fff"/><rect x="15" y="7" width="3" height="1.5" rx="0.75" fill="#fff"/></svg>',
  forum: '<svg viewBox="0 0 24 24"><path d="M3 5h18v10H8l-5 4z" fill="#4e6ef2"/><rect x="6" y="8" width="12" height="1.5" rx="0.75" fill="#fff"/><rect x="6" y="11" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7"/><circle cx="18" cy="3" r="2" fill="#cc3333"/></svg>',
  blockchain: '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="6" height="6" rx="1" fill="#f0b90b"/><rect x="13" y="5" width="6" height="6" rx="1" fill="#627eea"/><rect x="9" y="13" width="6" height="6" rx="1" fill="#3861fb"/><path d="M8 11v2M16 11v2M12 19v-4" stroke="#f0b90b" stroke-width="1.5"/><circle cx="12" cy="16" r="1" fill="#ff007a"/></svg>',
  kids: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5" fill="#ff8a00"/><path d="M7 14c-3 2-5 6-5 6h20s-2-4-5-6" fill="#4ecdc4"/><circle cx="10" cy="8" r="1.5" fill="#fff"/><circle cx="14" cy="8" r="1.5" fill="#fff"/><path d="M10 11h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M5 9q-1-3-2-3M19 9q1-3 2-3" stroke="#ff6b6b" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
  games: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="11" rx="5" fill="#1b2838"/><circle cx="7" cy="12" r="1.5" fill="#ff4d4f"/><rect x="5" y="10.5" width="4" height="1" rx="0.5" fill="#ff4d4f" transform="rotate(90 7 12)"/><circle cx="16" cy="11" r="1" fill="#00ba34"/><circle cx="18" cy="11" r="1" fill="#00ba34"/><circle cx="17" cy="14" r="1" fill="#00ba34"/><circle cx="15" cy="14" r="1" fill="#00ba34"/><circle cx="17" cy="9" r="1" fill="#00ba34"/></svg>',
  podcast: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3" fill="#ff5c00"/><path d="M12 9v8" stroke="#ff5c00" stroke-width="2"/><circle cx="12" cy="20" r="2" fill="#8e44ad"/><path d="M8 16a4 4 0 0 1 8 0" stroke="#1db954" stroke-width="1.5" fill="none"/><path d="M5 14a7 7 0 0 1 14 0" stroke="#d43333" stroke-width="1.5" fill="none" opacity="0.5"/></svg>',
};
