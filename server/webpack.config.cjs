const path = require('path');

module.exports = {
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false, // use an empty module for 'fs' if you don't need it
            "util": require.resolve("util/"),
            "string_decoder": require.resolve("string_decoder/"),
            "stream": require.resolve("stream-browserify")
        }
    },
};
