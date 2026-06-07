import Parser from 'rss-parser';

export default async function handler(req, res) {
  try {
    const parser = new Parser();
    // Search Craigslist for cards, collectibles, or game items within 25 miles of 03882
    const feed = await parser.parseURL('https://nh.craigslist.org/search/sss?query=cards|pokemon|game|console&postal=03882&search_distance=25&format=rss');
    
    const deals = feed.items.map((item, index) => {
      // Try to extract price from title (often like "Item Name - $50")
      const priceMatch = item.title.match(/\$(\d+)/);
      const price = priceMatch ? `$${priceMatch[1]}.00` : 'See Listing';
      
      // Attempt to infer retail or value randomly if no price, just for UI demonstration of the flip calculation
      // In a pure production app, you'd integrate eBay pricing for exact values.
      const parsedPrice = priceMatch ? parseInt(priceMatch[1]) : 0;
      const retail = parsedPrice > 0 ? `$${Math.round(parsedPrice * 1.4)}.00` : 'Unknown';

      return {
        id: index + 1,
        name: item.title.replace(/\$\d+/, '').trim(),
        location: 'Craigslist Local (03882)',
        price: price,
        retail: retail,
        condition: 'Used/Local',
        link: item.link
      };
    });

    res.status(200).json(deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch local deals' });
  }
}
