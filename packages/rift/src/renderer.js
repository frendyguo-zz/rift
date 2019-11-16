import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import url from 'url';
import getInitialData from './getInitialData';
import RiftDocument from './_document';
import RiftApp from './_app';

export default async (options) => {
  const {
    req,
    res,
    routes,
    assets,
    ...rest
  } = options;
  const Doc = RiftDocument;
  const context = {};
  const renderPage = async () => {
    const content = (
      <StaticRouter location={req.url} context={context}>
        {
          // eslint-disable-next-line no-use-before-define
          <RiftApp routes={routes} data={data} />
        }
      </StaticRouter>
    );
    const html = ReactDOMServer.renderToString(content);
    const { statusCode, url: redirectTo } = context;
    if (redirectTo) {
      res.redirect(statusCode || 301, redirectTo);
    }

    if (statusCode) {
      res.statusCode(statusCode);
    }

    return { html };
  };

  const { match, data } = await getInitialData(
    routes,
    url.parse(req.url).pathname,
    { req, res, ...rest },
  );

  if (data) {
    const { redirectTo, statusCode } = data;
    if (statusCode) {
      context.statusCode = statusCode;
    }

    if (redirectTo) {
      res.redirect(statusCode || 301, redirectTo);
      return null;
    }
  }

  if (match && match.redirectTo && match.path) {
    res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
    return null;
  }

  const reactRouterMatch = matchPath(req.url, match);
  const { html, ...docProps } = await Doc.getInitialProps({
    req,
    res,
    assets,
    renderPage,
    data,
    match: reactRouterMatch,
    ...rest,
  });

  const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);
  return `<!doctype html>${doc.replace('REPLACE_THIS_IN_RENDERER_METHOD', html)}`;
};
