export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  DASHBOARD: '/dashboard',
  EDITOR: '/editor/:graphId',
  TEMPLATES: '/templates',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  HELP: '/help',
  ABOUT: '/about',
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.HOME]: 'MindMap Graph Builder',
  [ROUTES.LOGIN]: 'Sign In',
  [ROUTES.SIGNUP]: 'Create Account',
  [ROUTES.FORGOT_PASSWORD]: 'Reset Password',
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.TEMPLATES]: 'Templates',
  [ROUTES.SETTINGS]: 'Settings',
  [ROUTES.PROFILE]: 'Profile',
  [ROUTES.HELP]: 'Help & Documentation',
  [ROUTES.ABOUT]: 'About',
};
