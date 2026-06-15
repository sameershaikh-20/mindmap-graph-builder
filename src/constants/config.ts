export const COLORS = {
  background: '#1a1a2e',
  primary: '#6366f1',
  secondary: '#ec4899',
  accent: '#14b8a6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  text: '#ffffff',
  textSecondary: '#a1a1aa',
} as const;

export const NODE_DEFAULTS = {
  width: 200,
  height: 80,
  borderRadius: 8,
  minHorizontalSpacing: 200,
  minVerticalSpacing: 100,
} as const;

export const ZOOM = {
  min: 0.1,
  max: 5.0,
  step: 0.1,
} as const;

export const GRID = {
  size: 40,
  color: 'rgba(255,255,255,0.05)',
} as const;

export const STORE_VERSION = 1;
export const AUTO_SAVE_INTERVAL = 30000;
