const gulp = require('gulp');
const gh = require('gulp-gh-pages');
const webpack = require('webpack');
const gutil = require('gulp-util');
const pkg = require('./package.json');
/**
 * Push build to gh-pages
 */

gulp.task('build', callback => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString());

        callback();
    });
});

gulp.task('versioning', ['build'], () => {
    const v = pkg.version;
    return gulp.src(['lib/*.*']).pipe(gulp.dest(`lib/${v}`));
});

gulp.task('deploy', ['versioning'], () =>
    gulp.src(['./lib/**/*', './CNAME']).pipe(gh({ force: true }))
);

gulp.task('deploy-prod', ['versioning'], () =>
    gulp
        .src(['./lib/**/*', './CNAME'])
        .pipe(gh({ force: true, origin: 'upstream' }))
);
