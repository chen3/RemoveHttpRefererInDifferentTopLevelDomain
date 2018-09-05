const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: "production",
    entry: {
        // 多入口文件
        background: "./src/background.ts",
        options: "./src/options.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // 打包多出口文件
        // 生成 background.js  options.js
        filename: "./[name].js"
    },
    resolve: {
        extensions: [".js", ".vue", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            "manifest.json",
            "./src/options.html"
        ])
    ]
}