import { NextRequest, NextResponse } from 'next/server';
import { parseShopeeInput } from '@/lib/shopee-parser';
import { PRODUCTS } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'Missing url parameter' },
        { status: 400 }
      );
    }

    const parsed = parseShopeeInput(url);

    let matchedProduct = null;
    if (parsed.itemId) {
      matchedProduct = PRODUCTS.find((p) => p.shopeeItemId === parsed.itemId);
    }

    if (!matchedProduct && parsed.searchQuery) {
      matchedProduct = PRODUCTS.find((p) =>
        p.name.toLowerCase().includes(parsed.searchQuery!.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      parsed,
      product: matchedProduct || PRODUCTS[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
