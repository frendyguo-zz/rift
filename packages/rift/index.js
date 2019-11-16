module.exports = {
  _app: require('./build/_app')._app,
  _document: require('./build/_document')._document,
  asyncComponent: require('./build/asyncComponent').asyncComponent,
  getInitialData: require('./build/getInitialData').getInitialData,
  initProxy: require('./build/initProxy').initProxy,
  renderer: require('./build/renderer').renderer,
};
