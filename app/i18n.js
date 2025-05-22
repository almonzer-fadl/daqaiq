import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../public/locales/${locale}/common.json`)).default
}));

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales }); 