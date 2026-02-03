import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Configuration, RuleSetRule } from 'webpack';
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: ['@storybook/addon-webpack5-compiler-babel', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },

  docs: {},

  webpackFinal: async (config: Configuration) => {
    const paths = {
      src: path.resolve(__dirname, '..', '..', 'src')
    };

    config.resolve = config.resolve || {};
    config.resolve.modules = config.resolve.modules || [];
    config.resolve.modules.push(paths.src);

    config.resolve.extensions = config.resolve.extensions || [];
    config.resolve.extensions.push('.ts', '.tsx');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': paths.src
    };

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Exclude SVG from default file loader
    config.module.rules = config.module.rules.map((rule) => {
      const ruleObj = rule as RuleSetRule;
      if (ruleObj && ruleObj.test && /svg/.test(ruleObj.test.toString())) {
        return { ...ruleObj, exclude: /\.svg$/i };
      }
      return rule;
    });

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __SUPABASE_URL__: JSON.stringify('https://test.supabase.co'),
        __SUPABASE_ANON_KEY__: JSON.stringify('test-anon-key'),
        __PROJECT__: JSON.stringify('storybook')
      })
    );

    return config;
  }
};

export default config;
