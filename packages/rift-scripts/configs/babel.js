const preset = {
  presets: [
    [require.resolve('@babel/preset-env'), { modules: false }],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-transform-async-to-generator'),
    require.resolve('@babel/plugin-transform-runtime'),
    require.resolve('@babel/plugin-transform-react-jsx-source'),
  ],
};

module.exports = () => preset;
