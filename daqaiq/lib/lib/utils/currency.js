import { SUPPLIER_TRANSLATIONS as t } from '../../constants/translations';

export function formatCurrency(amount) {
  if (amount === null || amount === undefined) {
    return t.noData;
  }

  // Format the number with commas for thousands
  const formattedAmount = new Intl.NumberFormat('ar-SA').format(amount);
  
  // Return the formatted amount with the Saudi Riyal symbol
  return `${formattedAmount} ﷼`;
}

export function formatCurrencyWithCode(amount) {
  if (amount === null || amount === undefined) {
    return t.noData;
  }

  // Format the number with commas for thousands
  const formattedAmount = new Intl.NumberFormat('ar-SA').format(amount);
  
  // Return the formatted amount with the Saudi Riyal symbol and code
  return `${formattedAmount} ﷼ (${t.currencyCode})`;
} 