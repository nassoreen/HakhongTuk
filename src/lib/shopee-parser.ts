export interface ParsedShopeeUrl {
  isValidShopee: boolean;
  isShortLink: boolean;
  shopId?: string;
  itemId?: string;
  rawInput: string;
  normalizedUrl?: string;
  searchQuery?: string;
}

/**
 * Parses user input (which can be a Shopee shortlink, full link, or product keyword)
 */
export function parseShopeeInput(input: string): ParsedShopeeUrl {
  const trimmed = input.trim();

  if (!trimmed) {
    return { isValidShopee: false, isShortLink: false, rawInput: trimmed };
  }

  // Check if it is a Shopee shortlink: https://s.shopee.co.th/xxxxxx or shopee.co.th/universal-link/...
  if (trimmed.includes('s.shopee.co.th') || trimmed.includes('shp.ee')) {
    return {
      isValidShopee: true,
      isShortLink: true,
      rawInput: trimmed,
      normalizedUrl: trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    };
  }

  // Check for standard web formats:
  // e.g. https://shopee.co.th/product/123456789/987654321
  // e.g. https://shopee.co.th/iPhone-17-Pro-Max-i.123456789.987654321
  const standardProductMatch = trimmed.match(/\/product\/(\d+)\/(\d+)/);
  if (standardProductMatch) {
    return {
      isValidShopee: true,
      isShortLink: false,
      shopId: standardProductMatch[1],
      itemId: standardProductMatch[2],
      rawInput: trimmed,
      normalizedUrl: `https://shopee.co.th/product/${standardProductMatch[1]}/${standardProductMatch[2]}`
    };
  }

  const slugProductMatch = trimmed.match(/i\.(\d+)\.(\d+)/);
  if (slugProductMatch) {
    return {
      isValidShopee: true,
      isShortLink: false,
      shopId: slugProductMatch[1],
      itemId: slugProductMatch[2],
      rawInput: trimmed,
      normalizedUrl: `https://shopee.co.th/product/${slugProductMatch[1]}/${slugProductMatch[2]}`
    };
  }

  // If contains shopee.co.th domain
  if (trimmed.includes('shopee.co.th')) {
    return {
      isValidShopee: true,
      isShortLink: false,
      rawInput: trimmed,
      normalizedUrl: trimmed
    };
  }

  // Otherwise, treat as keyword search
  return {
    isValidShopee: false,
    isShortLink: false,
    rawInput: trimmed,
    searchQuery: trimmed
  };
}
