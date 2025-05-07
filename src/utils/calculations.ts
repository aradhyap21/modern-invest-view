
/**
 * Utility functions for investment calculations
 */

import { formatCurrency } from './formatters';

/**
 * Calculate total value from an array of data objects using a specific field
 */
export const calculateTotalValue = (data: any[], field: string): string => {
  if (!data || !data.length) return '0';
  const total = data.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
  return formatCurrency(total);
};

/**
 * Calculate average rate from an array of data objects using a specific field
 */
export const calculateAverageRate = (data: any[], field: string): string => {
  if (!data || !data.length) return '0';
  const sum = data.reduce((total, item) => total + (parseFloat(item[field]) || 0), 0);
  return (sum / data.length).toFixed(1);
};

/**
 * Calculate total quantity from SGP data
 */
export const calculateTotalQuantity = (sgbData: any[]): number => {
  if (!sgbData || !sgbData.length) return 0;
  return sgbData.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
};

/**
 * Calculate SGB value
 */
export const calculateSgbValue = (sgbData: any[]): string => {
  if (!sgbData || !sgbData.length) return '0';
  const totalValue = sgbData.reduce((sum, item) => {
    return sum + (parseInt(item.quantity) || 0) * (parseFloat(item.purchase_price) || 0);
  }, 0);
  return formatCurrency(totalValue);
};

/**
 * Calculate total stock value
 */
export const calculateTotalStockValue = (stocksData: any[]): number => {
  if (!stocksData || !stocksData.length) return 0;
  return stocksData.reduce((sum, stock) => {
    // Handle current_price as either number or string
    let price = stock.current_price;
    // If it's a string with non-numeric characters, try to parse it
    if (typeof price === 'string') {
      price = parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
    }
    // If it's already a number, use it directly
    return sum + (typeof price === 'number' ? price : 0);
  }, 0);
};
