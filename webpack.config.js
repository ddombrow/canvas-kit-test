const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.join(process.cwd(), "/src/index.js"),
    output: {
        filename: "main.js",
        path: path.resolve(process.cwd(), "public"),
        publicPath: "/"
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /(\.jsx$|\.js$)/,
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }
        },
        {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"],
            include: [path.resolve(__dirname, "./")]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs'
        }),
        new CopyWebpackPlugin([
            { 
                from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm',
                to: __dirname + "/public"
            }
        ])
    ],
    resolve: {
        alias: {
            react: path.join(process.cwd(), "node_modules", "react")
        },
        extensions: [".jsx", ".js"]
    },
    devtool: "source-map",
    node: {
        fs: 'empty'
    }
};