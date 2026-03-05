import { useState } from 'react';
import SearchResults from './SearchResults';

interface SearchPageProps {
  widgetId?: string;
  sources?: string[];
  limit?: number;
}

const SearchPage: React.FC<SearchPageProps> = ({
  widgetId = 'rfkid_7',
  sources = ['1183579'],
  limit = 10,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search</h1>
          <p className="text-lg text-gray-600">
            Find content across our platform using Sitecore Search
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search terms..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Results */}
        {showResults && (
          <div className="mt-8">
            <SearchResults
              widgetId={widgetId}
              sources={sources}
              limit={limit}
              className="animate-fade-in"
            />
          </div>
        )}

        {/* Search Tips */}
        {!showResults && (
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Tips:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Use specific keywords for better results
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Try different variations of your search terms
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Search results are powered by Sitecore Search AI
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
