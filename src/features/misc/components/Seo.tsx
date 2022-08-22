import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/app';
import { capitalize } from '@/utils/capitalize';

export const Seo = () => {
  const router = useRouter();
  const pageName = router.asPath.split('/').pop();
  const title = [capitalize(pageName), 'Twitter'].filter(Boolean).join(' / ');

  return (
    <>
      <DefaultSeo
        defaultTitle={title}
        description="Twitter Clone App"
        openGraph={{
          type: 'website',
          title: 'Twitter Clone App',
          description: 'Twitter Clone App',
          site_name: 'Twitter Clone App',
          url: API_URL,
          images: [
            {
              url: '',
              width: 512,
              height: 512,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          { rel: 'icon', href: `/favicon.ico` },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `/favicons/favicon-16x16.png`,
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `/favicons/favicon-32x32.png`,
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: `/favicons/apple-touch-icon-180x180.png`,
          },
          {
            rel: 'mask-icon',
            href: `/favicons/safari-pinned-tab.svg`,
            color: '#5bbad5',
          },
        ]}
      />
    </>
  );
};
