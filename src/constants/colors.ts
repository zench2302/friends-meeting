export const CALENDAR_COLORS = {
  AVAILABLE_TIME: 'rgba(74, 222, 128, 1)', // 基础绿色
  WHITE: 'white'
};

export const HIGHLIGHT_COLOR = {
  BASE: 'rgba(74, 222, 128, 0.6)', // 基础绿色带60%透明度
  OVERLAP: (count: number) => `rgba(74, 222, 128, ${Math.min(0.4 + count * 0.2, 0.9)})`, // 重叠时的颜色
};
