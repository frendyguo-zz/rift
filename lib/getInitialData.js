import { matchPath } from 'react-router-dom';

export default async (routes, pathname, ctx) => {
  const promises = [];
  const matchedComponent = routes.find((route) => {
    const match = matchPath(pathname, route);
    if (match && route.component && route.component.getInitialProps) {
      const comp = route.component;

      promises.push(
        comp.load
          ? comp.load().then(() => comp.getInitialProps({ match, ...ctx }))
          : comp.getInitialProps({ match, ...ctx }),
      );
    }

    return !!match;
  });

  return {
    match: matchedComponent,
    data: (await Promise.all(promises))[0],
  };
};
