# 今天吃什么 - My Food Picker

一个基于 React + TypeScript + Vite 开发的随机食物抽取应用，帮助你决定今天吃什么！

## 功能特性

### 🍽️ 核心功能
- **随机抽取**：采用两步抽取流程，先抽取餐厅/店铺，再从选中店铺中抽取菜品
- **丰富数据**：包含多个食堂、数十个店铺和上百种菜品
- **动态效果**：流畅的旋转抽取动画，增强用户体验

### 🎨 视觉设计
- **玻璃态卡片**：现代化的毛玻璃效果，半透明设计
- **响应式布局**：适配桌面端和移动端
- **深色模式**：支持明暗主题切换，智能适配系统偏好
- **粒子效果**：动态粒子背景，增强视觉吸引力

### 📱 用户体验
- **直观操作**：简单的开始/重新抽取按钮
- **清晰展示**：抽取结果清晰展示，包含食堂、店铺和菜品信息
- **流畅动画**：精心设计的过渡动画，提升交互体验

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS
- **状态管理**：Zustand
- **3D 效果**：Three.js + React Three Fiber
- **动画库**：Framer Motion
- **粒子系统**：自定义 Canvas 粒子 + Three.js 粒子云

## 项目结构

```
├── src/
│   ├── components/          # 组件目录
│   │   ├── canvas/         # Canvas 和 3D 相关组件
│   │   │   ├── Effects.tsx       # 特效组件
│   │   │   ├── FoodCloud.tsx     # 食物粒子云
│   │   │   ├── Scene.tsx         # 3D 场景
│   │   │   └── SimpleParticles.tsx  # 简单粒子效果
│   │   └── overlay/        # 覆盖层组件
│   │       ├── ActionBtn.tsx     # 动作按钮
│   │       ├── DecisionCard.tsx  # 决策卡片
│   │       ├── Header.tsx        # 头部组件
│   │       ├── ResultCard.tsx    # 结果卡片
│   │       └── ThemeToggle.tsx   # 主题切换按钮
│   ├── data/               # 数据目录
│   │   └── menuData.ts     # 菜单数据和抽取逻辑
│   ├── store/              # 状态管理
│   │   └── useStore.ts     # Zustand store
│   ├── App.tsx             # 应用主组件
│   ├── index.css           # 全局样式
│   └── main.tsx            # 应用入口
├── .gitignore              # Git 忽略规则
├── index.html              # HTML 模板
├── package.json            # 项目依赖
├── tailwind.config.js      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 配置
```

## 数据结构

采用嵌套数据结构，按食堂和店铺分组：

```typescript
// 定义菜品数据结构
interface Dish {
  id: number;
  name: string;
}

// 定义商铺数据结构
interface Shop {
  id: number;
  name: string;
  canteen: string;
  dishes: Dish[];
}

// 定义最终抽取结果的数据结构
interface FoodItem {
  canteen: string;
  shop: string;
  dish: string;
}
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 核心功能实现

### 随机抽取逻辑

```typescript
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
```

### 主题切换

支持明暗主题切换，自动保存用户偏好到 localStorage，并适配系统颜色方案。

### 粒子效果

- **桌面端**：使用 Three.js 渲染 3D 食物粒子云
- **移动端**：使用 Canvas 渲染轻量级粒子效果，优化性能

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 作者

goatpretty

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**今天吃什么？**让 My Food Picker 来帮你决定！ 🍜🍔🍕