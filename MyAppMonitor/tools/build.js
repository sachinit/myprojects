import webpack from 'webpack';
import webpackConfig from '../webpack.prod';
import colors from 'colors';

process.env.NODE_ENV ='production';

console.log('Generating minified bundle for production via Webpack.'.blue);

webpack(webpackConfig).run((err, stats) => {
    if(err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if(jsonStats.hasWarnings) {
        console.log('Warnings!'.bold.yellow);
        return jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    console.log('Application has been compiled in production mode and exported to /dist folder.'.bold.green);

    return 0;
});