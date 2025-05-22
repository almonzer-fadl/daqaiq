export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

export default async function getMessages(locale) {
  try {
    return (await import(`@/public/locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
    return {};
  }
} 