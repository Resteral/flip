import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Fetch high value cards from a recent popular set (e.g. Pokemon 151 - sv3pt5)
    // We order by market price descending to get the best flip targets.
    const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
      params: {
        q: 'set.id:sv3pt5',
        pageSize: 15,
        orderBy: '-tcgplayer.prices.holofoil.market'
      }
    });

    const cards = response.data.data;
    
    const flips = cards.filter(card => card.tcgplayer && card.tcgplayer.prices).map((card, index) => {
      // Find the best pricing object (holofoil, normal, or 1st edition)
      const prices = card.tcgplayer.prices.holofoil || card.tcgplayer.prices.normal;
      
      const marketPrice = prices?.market || 0;
      const lowPrice = prices?.low || marketPrice;
      
      // Calculate potential ROI if buying at 'low' and selling at 'market'
      const profit = marketPrice - lowPrice;
      const roi = lowPrice > 0 ? ((profit / lowPrice) * 100).toFixed(1) : 0;
      
      return {
        id: card.id,
        name: card.name,
        buyAvg: `$${lowPrice.toFixed(2)}`,
        sellAvg: `$${marketPrice.toFixed(2)}`,
        roi: `${roi}%`,
        trend: parseFloat(roi) > 0 ? 'up' : 'down',
        image: card.images.small,
        url: card.tcgplayer?.url || '#'
      };
    });

    // Only return cards with positive ROI data
    const validFlips = flips.filter(f => parseFloat(f.roi) > 0).sort((a, b) => parseFloat(b.roi) - parseFloat(a.roi));

    res.status(200).json(validFlips);
  } catch (error) {
    console.error(error);
    res.status(200).json([]);
  }
}
