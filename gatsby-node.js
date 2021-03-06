/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const PostCssNormalize = require('postcss-normalize');

exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) => {
    const isEnvProduction = stage !== 'develop' && stage !== 'develop-html';
    const isSSR = stage.includes('html');
    function getStyleLoaders(isModule) {
        return [
            !isSSR && loaders.miniCssExtract({ hmr: false }),
            {
                loader: 'css-loader',
                options: {
                    modules: isModule,
                    importLoaders: 2,
                    localIdentName: isEnvProduction
                        ? '[contenthash:8]'
                        : '[local]_[contenthash:4]',
                    sourceMap: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox: 'no-2009',
                            },
                            stage: 3,
                        }),
                        // Adds PostCSS Normalize as the reset css with default options,
                        // so that it honors browserslist config in package.json
                        // which in turn let's users customize the target behavior as per their needs.
                        PostCssNormalize(),
                    ],
                    sourceMap: true,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            },
        ].filter(Boolean);
    }

    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.module\.(scss|sass)$/,
                            use: getStyleLoaders(true),
                        },
                        {
                            test: /.(scss|sass)$/,
                            use: getStyleLoaders(false),
                            sideEffects: true,
                        },
                    ]
                }
            ],
        },
    })
}