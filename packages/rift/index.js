module.exports = {
  _app: require('./build/RiftApp').RiftApp,
  _data: require('./build/RiftData').RiftData,
  _document: require('./build/Document').Document,
  asyncComponent: require('./build/asyncComponent').asyncComponent,
  getInitialData: require('./build/getInitialData').getInitialData,
  initProxy: require('./build/initProxy').initProxy,
  renderer: require('./build/renderer').renderer,
};
