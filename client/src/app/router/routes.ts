export const ROUTES = {
  DEFAULT: '/',
  HOME: '/home',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
} as const;

export type ROUTES = typeof ROUTES[keyof typeof ROUTES];