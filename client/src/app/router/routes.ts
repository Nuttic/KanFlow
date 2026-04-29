export const ROUTES = {
  DEFAULT: '/',
  HOME: '/home',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  ALL_BOARDS: 'all_boards',
  BOARD_DETAILS: '/boards/:id'
} as const;

export type ROUTES = typeof ROUTES[keyof typeof ROUTES];