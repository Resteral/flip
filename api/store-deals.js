import Parser from 'rss-parser';

export default async function handler(req, res) {
  try {
    const parser = new Parser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8'
      }
    });

    // Fetch the Slickdeals Frontpage RSS feed for verified retail store deals
    const feed = await parser.parseURL('https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1');
    
    const deals = feed.items.slice(0, 15).map((item, index) => {
      // Extract store name from title, typically looks like "Item Name @ Store Name - $Price"
      let store = 'Online Retailer';
      let price = 'See Deal';
      
      if (item.title) {
        const atSplit = item.title.split('@');
        if (atSplit.length > 1) {
          store = atSplit[1].split('-')[0].trim();
        }
        
        const priceMatch = item.title.match(/\$[\d,]+(\.\d{2})?/);
        if (priceMatch) {
          price = priceMatch[0];
        }
      }

      return {
        id: index + 1,
        name: item.title,
        location: store,
        price: price,
        retail: 'Clearance/Sale',
        condition: 'New',
        link: item.link
      };
    });

    res.status(200).json(deals);
  } catch (error) {
    console.error(error);
    res.status(200).json([]);
  }
}
