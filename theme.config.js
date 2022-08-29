import Logo from './components/logo'
export default {
  github: 'https://github.com/surf0/wiki',
  docsRepositoryBase: 'https://github.com/surf0/wiki',
  titleSuffix: ' – surf0 wiki',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline"><Logo width="70px"/></span>
      <span className="text-gray-600 font-normal hidden md:inline">
        wiki
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="surf0 wiki" />
      <meta name="og:description" content="surf0 wiki" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="logo.png" />
      <meta name="twitter:site:domain" content="nextra.vercel.app" />
      <meta name="twitter:url" content="https://wiki.surf0.net/" />
      <meta name="og:title" content="surf0 wiki" />
      <meta name="og:image" content="logo.png" />
      <meta name="apple-mobile-web-app-title" content="surf0 wiki" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>MIT {new Date().getFullYear()} © surf0.</>,
  // unstable_faviconGlyph: '👋',
}
