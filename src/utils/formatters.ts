
/**
 * Utility functions for formatting data
 */

/**
 * Format a currency value with appropriate suffixes (K, L)
 */
export const formatCurrency = (value: number): string => {
  if (value >= 100000) {
    return `${(value / 100000).toFixed(2)}L`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toFixed(0);
};
