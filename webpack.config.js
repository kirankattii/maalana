const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: false,
			generateStatsFile: true,
			statsOptions: { source: false },
		}),
	],
}
