import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is a placeholder API endpoint for search
  // In a real implementation, you would integrate with Sitecore Search API here

  if (req.method === 'GET') {
    const { q, limit = 10 } = req.query;

    // Mock search results for demonstration
    const mockResults = [
      {
        id: '1',
        title: 'Sample Article 1',
        description: 'This is a sample search result description.',
        url: '/articles/sample-1',
      },
      {
        id: '2',
        title: 'Sample Article 2',
        description: 'Another sample search result with relevant content.',
        url: '/articles/sample-2',
      },
    ];

    const filteredResults = q
      ? mockResults.filter(
          (item) =>
            item.title.toLowerCase().includes((q as string).toLowerCase()) ||
            item.description.toLowerCase().includes((q as string).toLowerCase())
        )
      : mockResults;

    res.status(200).json({
      query: q,
      results: filteredResults.slice(0, Number(limit)),
      total: filteredResults.length,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
