// const withCss = require("@zeit/next-css");
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");
// const path = require("path");

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        // lessVarsFilePath: "./styles/custom-antd.less",
        modifyVars: {
          "@primary-color": "#9147FF",
          "@body-background": "#202022",
          "@component-background": "#000000",
          "@text-color": "#ffffff",
          "@tabs-card-head-background": "@body-background",
          "@tabs-card-height": "40px",
          "@tabs-card-active-color": "@text-color",
          "@tabs-ink-bar-color": "@body-background",
          "@tabs-highlight-color": "@primary-color",
          "@tabs-hover-color": "@primary-color",
          "@tabs-active-color": "@text-color",
          "@tabs-card-gutter": "0px",
          "@menu-bg": "#18171C",
        },
        lessVarsFilePathAppendToEndOfContent: false,
        cssLoaderOptions: {},
        webpack(config, { isServer }) {
          if (!isServer) {
            config.target = "electron-renderer";
          }
          return config;
        },

        // ONLY for Next.js 10, if you use Next.js 11, delete this block

        webpack5: false,
      },
    ],
    // [
    //   withCSS,
    //   {
    //     webpack5: false,
    //     webpack: (config, { isServer }) => {
    //       if (!isServer) {
    //         config.target = "electron-renderer";
    //       }

    //       if (isServer) {
    //         const antStyles = /antd\/.*?\/style\/css.*?/;
    //         const origExternals = [...config.externals];
    //         config.externals = [
    //           // eslint-disable-line
    //           (context, request, callback) => {
    //             // eslint-disable-line
    //             if (request.match(antStyles)) return callback();
    //             if (typeof origExternals[0] === "function") {
    //               origExternals[0](context, request, callback);
    //             } else {
    //               callback();
    //             }
    //           },
    //           ...(typeof origExternals[0] === "function" ? [] : origExternals),
    //         ];

    //         config.module.rules.unshift({
    //           test: antStyles,
    //           use: "null-loader",
    //         });
    //       }

    //       return config;
    //     },
    //   },
    // ],
  ],
  {
    /* global config here ... */
  }
);
