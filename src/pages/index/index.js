const storage = require('../../lib/storage');
const util = require('../../lib/util');
const CLunar = require('../../npm/chinese-lunar');

const app = getApp();
const { contentHeight, barTitleHeight } = util.getNavigationData();

const dayText = ['日', '一', '二', '三', '四', '五', '六'];

Page({
  data: {
    themeType: 'card', // 首页样式主题
    swiperMargin: '40rpx',
    contentHeight,
    barTitleHeight,

    dateInfo: null, // 日期
    pageCards: [{ // 卡片列表
      name: 'artical',
      text: '社区热帖',
      icon: 'cnode-tiezi',
      style: 'color: #026e00;',
      desc: '足球教练社区，聚集全国的基层教练员。'
    }, {
      name: 'news',
      text: '教练快讯',
      icon: 'cnode-xinwen',
      style: 'color: #3c82e2;',
      desc: '教练快讯详细描述...'
    }]
  },
  onShareAppMessage() {
    return {
      title: app.shareInfo.title,
      path: `/pages/index/index`
    }
  },
  onLoad() {
    const current = new Date();
    this.setData({
      dateInfo: {
        chineseDate: CLunar.solarToLunar(current, 'YMD'),
        weekDay: `周${dayText[current.getDay()]}`,
        date: util.fillZero(current.getDate())
      }
    })
  },
  // 跳转
  gotoPage(e) {
    const { page } = e.currentTarget.dataset;
    let url = '/pages/index/index';
    if (page === 'news') {
      url = '/pages/artical/list?tab=news'; // 新闻列表
    } else if (page === 'artical') {
      url = '/pages/artical/list'
    }
    wx.navigateTo({ url });
  },
})