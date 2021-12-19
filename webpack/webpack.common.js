// Includes the code that's "common" between the other configurations
// Gets merged into the other configurations

const path = require("path");

module.exports = {
    watch: true,
    // mode: "development", // Stop minifying
    entry: ["./public/js/app.js"],
    output: {
        path: path.join(__dirname, "../public"),
        filename: "app.bundle.js",
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: process.env,
        //     template: "./resources/index.html",
        // }), // Used to generate a HTML file when hashing filenames etc
    ],
    resolve: {
        modules: [__dirname, "resources", "node_modules"],
        extensions: ["*", ".js", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
