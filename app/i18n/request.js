export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

export default async function getMessages(locale) {
  return (await import(`../../public/locales/${locale}/common.json`)).default;
} 