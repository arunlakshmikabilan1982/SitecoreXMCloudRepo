import type { NextApiRequest, NextApiResponse } from 'next';
import { NativeDataFetcher, GraphQLSitemapXmlService } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

const ABSOLUTE_URL_REGEXP = '^(?:[a-z]+:)?//';

// Define external URLs to include in the sitemap
const externalUrls = [
  'https://www.bajajauto.com/bikes/dominar/dominar-250-price',
  'https://www.bajajauto.com/bikes/avenger/avenger-street-160-price',
  'https://www.bajajauto.com/bikes/avenger/avenger-cruise-220-price',
  'https://www.bajajauto.com/bikes/dominar/dominar-400-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-125-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-150-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-n160-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-ns125-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-ns200-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-rs200-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-ns160-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-n250-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-220f-price',
  'https://www.bajajauto.com/bikes/pulsar/pulsar-ns400z-price',
  'https://www.bajajauto.com/careers/why-us',
  'https://www.bajajauto.com/careers/offroad',
  'https://www.bajajauto.com/corporate/key-policies',
  'https://www.bajajauto.com/investors/policies-codes',
  'https://www.bajajauto.com/corporate/corporate-social-responsibility',
  'https://www.bajajauto.com/investors/stock-exchange-intimations',
  'https://www.bajajauto.com/about-us/about-bajaj-group',
];

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { id },
  } = req;

  // Resolve site based on hostname
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);

  // create sitemap graphql service
  const sitemapXmlService = new GraphQLSitemapXmlService({
    clientFactory,
    siteName: site.name,
  });

  // if url has sitemap-{n}.xml type. The id - can be null if it's sitemap.xml request
  const sitemapPath = await sitemapXmlService.getSitemap(id as string);

  // if sitemap is match otherwise redirect to 404 page
  if (sitemapPath) {
    const isAbsoluteUrl = sitemapPath.match(ABSOLUTE_URL_REGEXP);
    const sitemapUrl = isAbsoluteUrl ? sitemapPath : `${config.sitecoreApiHost}${sitemapPath}`;
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');

    try {
      const fetcher = new NativeDataFetcher();
      const xmlResponse = await fetcher.fetch<string>(sitemapUrl);

      // Append external URLs to the sitemap XML
      let modifiedXml = xmlResponse.data;
      if (externalUrls.length > 0) {
        const additionalUrls = externalUrls
          .map(
            (url) =>
              `<url>
                <loc>${url}</loc>
                <lastmod>2026-03-09</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.5</priority>
              </url>`
          )
          .join('');
        modifiedXml = modifiedXml.replace('</urlset>', `${additionalUrls}</urlset>`);
      }

      return res.send(modifiedXml);
    } catch (error) {
      return res.redirect('/404');
    }
  }

  // this approache if user go to /sitemap.xml - under it generate xml page with list of sitemaps
  const sitemaps = await sitemapXmlService.fetchSitemaps();

  if (!sitemaps.length) {
    return res.redirect('/404');
  }

  const reqtHost = req.headers.host;
  const reqProtocol = req.headers['x-forwarded-proto'] || 'https';
  const SitemapLinks = sitemaps
    .map((item: string) => {
      const parseUrl = item.split('/');
      const lastSegment = parseUrl[parseUrl.length - 1];

      return `<sitemap>
        <loc>${reqProtocol}://${reqtHost}/${lastSegment}</loc>
      </sitemap>`;
    })
    .join('');

  res.setHeader('Content-Type', 'text/xml;charset=utf-8');

  return res.send(`
  <sitemapindex xmlns="http://sitemaps.org/schemas/sitemap/0.9" encoding="UTF-8">${SitemapLinks}</sitemapindex>
  `);
};

export default sitemapApi;
