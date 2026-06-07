import axios from 'axios';

export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
      params: {
        q: `name:"*${q}*"`,
        pageSize: 10,
        orderBy: '-tcgplayer.prices.holofoil.market'
      }
    });

    const cards = response.data.data;
    
    const searchResults = cards.map(card => {
      const prices = card.tcgplayer?.prices?.holofoil || card.tcgplayer?.prices?.normal;
      
      const marketPrice = prices?.market || 0;
      const lowPrice = prices?.low || marketPrice;
      
      const profit = marketPrice - lowPrice;
      const roi = lowPrice > 0 ? ((profit / lowPrice) * 100).toFixed(1) : 0;
      
      return {
        id: card.id,
        name: card.name,
        set: card.set.name,
        buyAvg: `$${lowPrice.toFixed(2)}`,
        sellAvg: `$${marketPrice.toFixed(2)}`,
        roi: `${roi}%`,
        trend: parseFloat(roi) > 0 ? 'up' : 'down',
        image: card.images.small
      };
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(200).json([]);
  }
}
