// vue.config.js
const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
            },
        },
    },
    configureWebpack: (config) => {
        config.output.filename = '[name].[hash:8].js';
        config.output.chunkFilename = '[name].[hash:8].js';
    },
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
            },
            scss: {
                prependData: '@import "~@/assets/colors.scss";',
            },
        },
    },
};
