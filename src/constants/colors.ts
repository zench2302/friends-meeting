export const CALENDAR_COLORS = {
  AVAILABLE_TIME: 'rgba(74, 222, 128, 1)',
  WHITE: 'white'
};

export const HIGHLIGHT_COLOR = {
  BASE: 'rgba(74, 222, 128, 0.6)',
  // 增加颜色深度变化
  OVERLAP: (count: number) => `rgba(74, 222, 128, ${Math.min(0.3 + count * 0.3, 1)})`,
};
