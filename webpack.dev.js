const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Mode
    mode: 'development',
    // Devtool
    devtool: 'inline-source-map'
});