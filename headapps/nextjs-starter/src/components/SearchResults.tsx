import { useState, useEffect } from 'react';
import {
  Context,
  getWidgetData,
  SearchWidgetItem,
  WidgetRequestData,
  widgetView,
} from '@sitecore-cloudsdk/search/browser';

interface ContentItem {
  id: string;
  description: string;
  title?: string;
  url?: string;
}

interface SearchResultsProps {
  widgetId?: string;
  sources?: string[];
  limit?: number;
  className?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  widgetId = 'rfkid_7',
  sources = ['1183579'],
  limit = 10,
  className = '',
}) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const widgetRequest = new SearchWidgetItem('content', widgetId);
        widgetRequest.content = {};
        widgetRequest.limit = limit;
        if (sources.length > 0) {
          widgetRequest.sources = sources as [string, ...string[]];
        }

        const context = new Context({
          locale: { language: 'EN', country: 'us' },
        });

        const response = await getWidgetData(new WidgetRequestData([widgetRequest]), context);

        if (!response) {
          setError('No search results found.');
          return;
        }

        const currentContent = (response.widgets?.[0]?.content || []) as ContentItem[];
        setContentItems(currentContent);

        // Track widget view for analytics
        widgetView({
          request: {},
          entities: currentContent.map((content: ContentItem) => ({
            entity: 'content',
            id: content.id,
          })),
          pathname: window.location.pathname,
          widgetId: widgetId,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An error occurred while fetching search results.'
        );
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [widgetId, sources, limit]);

  if (loading) {
    return (
      <div className={`search-results ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading search results...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`search-results ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!contentItems.length) {
    return (
      <div className={`search-results ${className}`}>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No search results found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results ${className}`}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
        <p className="text-gray-600">Found {contentItems.length} results</p>
      </div>

      <div className="space-y-4">
        {contentItems.map((content: ContentItem) => (
          <div
            key={content.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            {content.title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {content.url ? (
                  <a
                    href={content.url}
                    className="text-primary-600 hover:text-primary-800 hover:underline"
                  >
                    {content.title}
                  </a>
                ) : (
                  content.title
                )}
              </h3>
            )}

            {content.description && (
              <p className="text-gray-700 leading-relaxed">{content.description}</p>
            )}

            {content.url && (
              <div className="mt-3">
                <a
                  href={content.url}
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                >
                  View Details
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
