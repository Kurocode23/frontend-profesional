var gulp = require('gulp')
var postcss = require('gulp-postcss')
var browserSync = require('browser-sync').create()
var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')

// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

// Tarea para procesar el CSS
gulp.task('css', function () {
  var processors = [
    autoprefixer({
      // dar soporte a navegadores con mas de 5% de uso, tambien a ie8
      browsers: ['> 5%', 'ie 8']
    }),
    cssnested
  ]

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})


gulp.task('default', ['watch', 'serve'])







