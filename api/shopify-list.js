import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Security best practice: Never hardcode your API keys in a public GitHub repo!
  // These should be configured in your Vercel Project Settings > Environment Variables
  const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com';
  const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '758160bce983e0f1666363b177d2b372';

  const { title, description, price, tags, vendor, image } = req.body;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`,
      {
        product: {
          title: title,
          body_html: description || `<p>Rare flip opportunity found via ProfitFinder.</p>`,
          vendor: vendor || 'ProfitFinder Sourced',
          product_type: 'Resale Item',
          tags: tags || 'resell, limited',
          variants: [
            {
              price: price,
              requires_shipping: true,
              inventory_management: 'shopify',
              inventory_quantity: 1
            }
          ],
          images: image ? [{ src: image }] : []
        }
      },
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ success: true, product: response.data.product });
  } catch (error) {
    console.error('Shopify API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to push to Shopify', details: error.response?.data || error.message });
  }
}
