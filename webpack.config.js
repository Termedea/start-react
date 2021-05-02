const path = require('path');
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
];

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader?url=false',
                    {
                        loader: 'postcss-loader',
                        options: { postcssOptions: { plugins: postCSSPlugins } }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    watch: true,
    devServer: {
        before: function (app, server) {
            server._watch('./public/**/*.html');
        },
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        hot: true,
        port: 3001,
        open: true
    }
};
