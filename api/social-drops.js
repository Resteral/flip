import axios from 'axios';

export default async function handler(req, res) {
  try {
    // We use Reddit's JSON search API as a social media proxy to find live discussions about drops
    const response = await axios.get('https://www.reddit.com/search.json', {
      params: {
        q: '(sneakers OR streetwear OR merchandise) AND (drop OR release)',
        sort: 'new',
        limit: 15,
        t: 'week'
      },
      headers: {
        'User-Agent': 'ProfitFinder/1.0 (Web App)'
      }
    });

    const posts = response.data.data.children;
    
    const drops = posts.map(post => {
      const data = post.data;
      return {
        id: data.id,
        name: data.title,
        date: new Date(data.created_utc * 1000).toLocaleDateString(),
        platform: `r/${data.subreddit}`,
        hype: data.ups > 50 ? 'Very High' : (data.ups > 10 ? 'High' : 'Medium'),
        type: 'Social Drop',
        url: `https://reddit.com${data.permalink}`
      };
    });

    res.status(200).json(drops);
  } catch (error) {
    console.error(error);
    // Graceful fallback on API failure or rate limit
    res.status(200).json([]);
  }
}
