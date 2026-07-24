import './styles/globals.scss';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';

const links: Route.LinksFunction = () => [
  {
    href: '/favicon-96x96.png',
    rel: 'icon',
    sizes: '96x96',
    type: 'image/png',
  },
  { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
  { href: '/favicon.ico', rel: 'shortcut icon' },
  { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
  { href: '/site.webmanifest', rel: 'manifest' },
];

const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps): React.JSX.Element => {
  let message = 'Something went wrong';
  let details = 'An unexpected error occurred...';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = `Error ${String(error.status)}`;
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
};

const Layout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const meta = (): Route.MetaDescriptors => {
  return [
    { title: 'ShopLife' },
    { content: 'ShopLife - Online Retail for You', name: 'description' },
    { content: '#000000', name: 'theme-color' },
    { content: 'ShopLife', name: 'apple-mobile-web-app-title' },
  ];
};

const App = (): React.JSX.Element => {
  return <Outlet />;
};

export { ErrorBoundary, Layout, links, meta };
export default App;
