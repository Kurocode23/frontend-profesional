import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import store from './store';
import messages from './messages.json';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

function requestHandler(req, res) {
  const context = createServerRenderContext();

  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';

  res.setHeader('Content-Type', 'text/html');

  let html = renderToString(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <ServerRouter location={req.url} context={context}>
          <Pages />
        </ServerRouter>
      </IntlProvider>
    </Provider>,
  );

  const result = context.getResult();

  if (result.redirect) {
    res.writeHead(301, {
      Location: result.redirect.pathname,
    });

    res.end();
  }

  if (result.missed) {
    res.writeHead(404);

    html = renderToString(
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <ServerRouter location={req.url} context={context}>
            <Pages />
          </ServerRouter>
        </IntlProvider>
      </Provider>,
    );
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicacion"
        content={html}
      />,
    ),
  );
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(8080);
