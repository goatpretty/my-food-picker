// 定义菜品数据结构
export interface Dish {
  id: number;
  name: string;
}

// 定义商铺数据结构
export interface Shop {
  id: number;
  name: string;
  canteen: string;
  dishes: Dish[];
}

// 定义最终抽取结果的数据结构
export interface FoodItem {
  canteen: string;
  shop: string;
  dish: string;
}

// 核心数据数组 - 按canteen和shop分组
export const MENU_DATA: Shop[] = [
  {
    id: 1,
    name: '奥尔良拌饭',
    canteen: '一食堂',
    dishes: [
      { id: 1, name: '蜜汁烤肉拌饭' },
      { id: 2, name: '脆皮鸡拌饭' },
      { id: 3, name: '烤肉+脆皮鸡双拼' }
    ]
  },
  {
    id: 2,
    name: '赵家牛肉拉面',
    canteen: '一食堂',
    dishes: [
      { id: 4, name: '牛肉拉面' },
      { id: 5, name: '酱香牛肉面' },
      { id: 6, name: '羊杂面' },
      { id: 7, name: '骨汤面' } 
    ]
  },
  {
    id: 3,
    name: '猫婆小面',
    canteen: '一食堂',
    dishes: [] // 没有具体菜品
  },
  {
    id: 4,
    name: '鑫海民族风味',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 5,
    name: '炙烤牛肉饭',
    canteen: '一食堂',
    dishes: [
      { id: 8, name: '香煎黑椒鸡柳饭' },
      { id: 9, name: '焦香脆皮鸡肉饭' },
      { id: 10, name: '北派烧鸭饭' },
      { id: 11, name: '香脆爆烤鸡胗饭'},
      { id: 12, name: '香烤牛肋条饭'}
    ]
  },
  {
    id: 6,
    name: '津五爷大块牛肉饭',
    canteen: '二食堂',
    dishes: [
      { id: 13, name: '爆汁牛肉饭' },
      { id: 14, name: '蜜汁牛肉饭' },
      { id: 15, name: '番茄牛肉饭 '},
      { id: 16, name: '焦香鸡腿饭'}
    ]
  },
  {
    id: 7,
    name: '小街胡同牛杂面',
    canteen: '一食堂',
    dishes: [
      { id: 18, name: '小街牛杂面' },
      { id: 19, name: '老北京肉末炸酱面' },
      { id: 20, name: '小街鸡丝汤面' },
      { id: 21, name: '麻将鸡丝拌面' },
      { id: 22, name: '葱油拌面' },
      { id: 23, name: '小街火鸡面' }
    ]
  },
  {
    id: 8,
    name: '肯德基',
    canteen: '天猫校园',
    dishes: []
  },
  {
    id: 9,
    name: '瑞幸',
    canteen: '天猫校园',
    dishes: []
  },
  {
    id: 10,
    name: '沪上阿姨',
    canteen: '天猫校园',
    dishes: []
  },
  {
    id: 11,
    name: '猫婆小面',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 12,
    name: '韩记麻辣香锅',
    canteen: '三食堂',
    dishes: []
  },
  {
    id: 13,
    name: '致青春麻辣香锅',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 14,
    name: '鑫海居民族风味',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 15,
    name: '川香水煮鱼',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 16,
    name: '炽牛烤盘饭',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 17,
    name: '无名缘米粉',
    canteen: '一食堂',
    dishes: [
      { id: 24, name: '原味米粉' },
      { id: 25, name: '肉末米粉' },
      { id: 26, name: '鲜椒鸡块米粉' },
      { id: 27, name: '酸辣笋尖米粉' },
      { id: 28, name: '酸角脆笋米粉' },
      { id: 29, name: '秋葵肉末米粉' },
      { id: 30, name: '三鲜米粉' },
      { id: 31, name: '无名缘螺蛳粉' },
      { id: 32, name: '番茄肉末米粉' },
      { id: 33, name: '南昌拌粉' },
    ]
  },
  {
    id: 18,
    name: '老于记炒鸡米饭',
    canteen: '一食堂',
    dishes: [
      { id: 34, name: '招牌鲜香炒鸡' },
      { id: 35, name: '秘制香辣炒鸡' },
      { id: 36, name: '特色鱼香炒鸡' },
      { id: 37, name: '金牌椒麻炒鸡' },
      { id: 38, name: '青花椒炒鸡' },
      { id: 39, name: '回味菌菇炒鸡' },
      { id: 40, name: '青椒椒麻虎头鸡' },
      { id: 41, name: '番茄虎头鸡' },



    ] // 没有具体菜品
  },
  {
    id: 19,
    name: '私房焖肉饭',
    canteen: '一食堂',
    dishes: [
      { id: 42, name: '黑椒煎肉饭' },
      { id: 43, name: '串烧鸡腿饭' },
      { id: 44, name: '嫩滑酸菜鸡' },
      { id: 45, name: '飘香卤肉饭' },
    ]
  },
  {
    id: 20,
    name: '我是主饺面道',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 21,
    name: '吉祥馄饨',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 22,
    name: '4+1冒菜',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 23,
    name: '黄焖鸡米饭',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 24,
    name: '绿氧健康菜',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 25,
    name: '竹笼蒸面焖饭',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 26,
    name: '陶三喜砂锅',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 27,
    name: '韩师傅麻辣烫',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 28,
    name: '重庆鸡公煲',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 29,
    name: '山东大煎饼馄饨果子',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 30,
    name: '渔小渔无骨烤鱼泡泡鸡',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 31,
    name: '淮南牛肉汤',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 32,
    name: '荷叶炒饭炒面干锅焖饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 33,
    name: '东记猪肘饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 34,
    name: '干了么烤盘饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 35,
    name: '妙味烤肉饭脆皮鸡米饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 36,
    name: '王婆大肉滑',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 37,
    name: '朱家小馆羊杂面',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 38,
    name: '南美烧汁小牛饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 39,
    name: '新疆炒米粉',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 40,
    name: '重庆小面',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 41,
    name: '瓦香鸡米饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 42,
    name: '张亮麻辣烫',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 43,
    name: '烤鸭拌饭',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 44,
    name: '杨国福麻辣烫',
    canteen: '二食堂',
    dishes: []
  },
  {
    id: 45,
    name: '杨国福麻辣烫',
    canteen: '一食堂',
    dishes: []
  },
  {
    id: 46,
    name: '鸡腿拌饭鸡架拌面',
    canteen: '天猫校园',
    dishes: [
      { id: 46, name: '鸡腿拌饭' },
      { id: 47, name: '鸡腿拌面' },
    ]
  },
  {
    id: 47,
    name: '店小二烤肉饭',
    canteen: '天猫校园',
    dishes: []
  },
];

/**
 * 辅助函数：随机抽取食物
 * 先抽canteen和shop，然后如果shop有dish，再抽dish
 */
export const randomPick = (): FoodItem => {
  // 1. 随机选择一个shop
  const randomShopIndex = Math.floor(Math.random() * MENU_DATA.length);
  const selectedShop = MENU_DATA[randomShopIndex];
  
  // 2. 如果该shop有dishes，随机选择一个dish；否则dish为空
  let selectedDish = '';
  if (selectedShop.dishes.length > 0) {
    const randomDishIndex = Math.floor(Math.random() * selectedShop.dishes.length);
    selectedDish = selectedShop.dishes[randomDishIndex].name;
  }
  
  // 3. 返回结果
  return {
    canteen: selectedShop.canteen,
    shop: selectedShop.name,
    dish: selectedDish
  };
};

/**
 * 辅助函数：格式化显示文本
 * 用于在 3D 粒子上显示。
 * 如果有品名，显示 "商铺\n品名"；如果无品名，只显示 "商铺"
 */
export const formatLabel = (item: FoodItem): string => {
  return item.dish ? `${item.shop}\n${item.dish}` : item.shop;
};