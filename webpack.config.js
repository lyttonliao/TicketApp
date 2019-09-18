const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/ticketapp_part3.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map'
};