const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/ticketapp.js',
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