/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import '@sitecore-cloudsdk/personalize/browser';
import '@sitecore-cloudsdk/search/browser';
import {
  Context,
  getWidgetData,
  SearchWidgetItem,
  WidgetRequestData,
  widgetView,
} from '@sitecore-cloudsdk/search/browser';
import config from 'temp/config';
import Layout from 'src/Layout';
import { SitecorePageProps } from 'lib/page-props';
import { SitecoreContext, ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { componentBuilder } from 'temp/componentBuilder';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';

export default function SearchResultsPage(props: SitecorePageProps) {
  // Create a data state variable to store the received data:
  const [content, setContent] = useState<any[]>([]); // In production, replace `any[]` with the interface of your choice for your content
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure we're on the client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Perform the initial data request:
  useEffect(() => {
    if (!isClient || !router.isReady) return;

    // Initialize Cloud SDK first
    CloudSDK({
      sitecoreEdgeUrl: config.sitecoreEdgeUrl,
      sitecoreEdgeContextId: config.sitecoreEdgeContextId,
      siteName: config.sitecoreSiteName,
      enableBrowserCookie: true,
      cookieDomain: window.location.hostname.replace(/^www\./, ''),
    })
      .addEvents()
      .addPersonalize({ enablePersonalizeCookie: true, webPersonalization: true })
      .addSearch()
      .initialize();

    // Wait a moment for SDK to fully initialize
    setTimeout(async () => {
      await fetchData();
    }, 100);

    async function fetchData() {
      try {
        console.log('Initializing search with Context ID:', config.sitecoreEdgeContextId);

        const widgetRequest = new SearchWidgetItem('content', 'rfkid_7'); // Create a new widget request
        widgetRequest.content = {}; // Request all attributes for the entity
        widgetRequest.limit = 10; // Limit the number of results to 10

        const keyword = router.query.q as string;
        if (keyword) {
          widgetRequest.query = { keyphrase: keyword };
        }

        // widgetRequest.sources = ["12345"]; // Optionally, return results only from specific sources

        // Create a new context with the locale set to "EN" and "us".
        // Depending on your Sitecore Search configuration, using `Context` might be optional:
        const context = new Context({
          locale: { language: 'EN', country: 'us' },
        });

        console.log('Making search request...');

        // Call the `getWidgetData` function with the widget request and the context to request the data:
        const response = await getWidgetData(new WidgetRequestData([widgetRequest]), context);

        console.log('Search response:', response);

        if (!response) {
          console.warn('No search results found.');
          setContent([
            { id: 'no-results', name: 'No search results found. This might be because:' },
          ]);
          return;
        }

        // Set the received data to the state variable:
        const currentContent = response.widgets?.[0]?.content || [];

        if (currentContent.length === 0) {
          setContent([
            {
              id: 'empty-results',
              name: 'Search API responded but returned no content. Check your Sitecore Search configuration.',
            },
          ]);
        } else {
          setContent(currentContent);

          // Only track widget view if we have actual content
          widgetView({
            request: {},
            entities: currentContent.map((contentItem: any) => ({
              entity: 'content',
              id: contentItem.id,
            })),
            pathname: '/search',
            widgetId: 'rfkid_7',
          });
        }
      } catch (error) {
        console.error('Search error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setContent([
          {
            id: 'error',
            name: `Search failed: ${errorMessage}. Check console for details.`,
          },
        ]);
      }
    }
  }, [isClient, router.isReady, router.query.q]);

  // Use Sitecore-provided layout data (header/footer, etc.) and clear the main placeholder
  const layoutData = props.layoutData;

  if (layoutData?.sitecore?.route?.placeholders) {
    layoutData.sitecore.route.placeholders['headless-main'] = [];

    // Inject Bajaj components over default generic Sitecore placeholder for the search route
    layoutData.sitecore.route.placeholders['headless-header'] = [
      {
        uid: 'search-topbar',
        componentName: 'BajajTopBar',
        dataSource: '',
        params: {},
        fields: {
          DealerLocatorLink: { value: { href: '/dealer-locator', text: 'Dealer Locator' } },
          ServiceCentresLink: { value: { href: '/service-centres', text: 'Service Centres' } }
        }
      },
      {
        uid: 'search-header',
        componentName: 'BajajHeader',
        dataSource: '',
        params: {},
        fields: {
          CTALink: { value: { href: '/book-test-drive', text: 'Book Test Drive' } }
        }
      }
    ];

    layoutData.sitecore.route.placeholders['headless-footer'] = [
      {
        uid: 'search-footer',
        componentName: 'BajajFooter',
        dataSource: '',
        params: {},
        fields: {}
      }
    ];
  }

  return (
    <ComponentPropsContext value={props.componentProps || {}}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing: false })}
        layoutData={layoutData}
      >
        <>
          <Head>
            <title>Search Results | {config.sitecoreSiteName}</title>
            <meta name="description" content="Search results powered by Sitecore Search" />
          </Head>
          <Layout layoutData={layoutData} headLinks={[]}>
            <div
              className="container mx-auto px-4 py-8"
              style={{ position: 'relative', zIndex: 10, backgroundColor: 'white' }}
            >
              <h1 className="text-3xl font-bold mb-2 mt-8">Search Listing</h1>
              {router.query.q && (
                <p className="text-gray-600 mb-6">Showing results for &quot;{router.query.q}&quot;</p>
              )}
              {!isClient ? (
                <div className="text-center py-8">
                  <p>Loading search functionality...</p>
                </div>
              ) : content && content.length > 0 ? (
                <ul className="space-y-6">
                  {content.map((contentItem: any) => (
                    <li key={contentItem.id} className="border-b pb-4">
                      <a
                        href={contentItem.url || `/${contentItem.name?.toLowerCase() || 'about'}`}
                        target="_blank"
                        className="text-blue-600 hover:underline text-xl font-medium block mb-2"
                      >
                        {contentItem.name || 'About'}
                      </a>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {contentItem.description || 'Daily description'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No search results found.</p>
                </div>
              )}
            </div>
          </Layout>
        </>
      </SitecoreContext>
    </ComponentPropsContext>
  );
}

// Provide server-side props for proper Sitecore integration (header/footer, etc.)
export const getServerSideProps: GetServerSideProps<SitecorePageProps> = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  return {
    props,
  };
};
