// Инициализируем плагины
var gulp = require('gulp'), // Сообственно Gulp JS
    stylus = require('gulp-stylus'), // Плагин для Stylus
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'), // Склейка файлов
    server = require('browser-sync').create(); // Веб сервер

//Описываем какие CSS войдут в проект
var css_other =[
    './assets/bower/bootstrap/dist/css/bootstrap.css',
    './assets/bower/font-awesome/css/font-awesome.min.css'
];

//Описываем какие JS войдут в проект
var js_lib =[
    './assets/bower/angular/angular.js',
    './assets/bower/angular-route/angular-route.js',
    './assets/bower/angular-resource/angular-resource.js',
    './assets/bower/jquery/dist/jquery.js',
    './assets/bower/bootstrap/dist/js/bootstrap.min.js',
    './assets/bower/angular-bootstrap/ui-bootstrap.min.js'
];

//Components JS
var components_js =[
    './assets/app/components/**/*.js'
];

var app_js =[
    './assets/app/app.js',
    './assets/app/controllers.js',
    './assets/app/directives.js',
    './assets/app/filters.js',
    './assets/app/services.js'
];

//Шрифты
var fonts =[
    './assets/fonts/**/*',
    './assets/bower/font-awesome/fonts/**/*'
];

// Собираем Stylus
gulp.task('stylus', function() {
    gulp.src('./assets/stylus/main.styl')
        .pipe(stylus()) // собираем stylus
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/')) // записываем css
        .pipe(server.stream());
});

// Собираем все остальные CSS в 1 файл
gulp.task('css', function() {
    gulp.src(css_other)
        .pipe(concat('other.css'))
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('../public/css/')) // записываем css
        .pipe(server.stream());
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
        .pipe(server.stream());
});

// Переносим все JS в папку public/js
gulp.task('js', function() {
    gulp.src(js_lib)
        .pipe(gulp.dest('public/js'))
        .pipe(server.stream());
});

// Переносим все HTML public/app/
gulp.task('html', function() {
    gulp.src('./assets/app/*.html')
        .pipe(gulp.dest('public/'))
        .pipe(server.stream());
});

// Переносим все HTML public/
gulp.task('html_components', function() {
    gulp.src('./assets/app/components/**/*.html')
        .pipe(gulp.dest('public/app/components'))
        .pipe(server.stream());
});

// Переносим все components_js в папку public/js
gulp.task('components_js', function() {
    gulp.src(components_js)
        .pipe(concat('components.js'))
        .pipe(gulp.dest('public/app'))
        .pipe(server.stream());
});

// Переносим все app_js в папку public/js
gulp.task('app_js', function() {
    gulp.src(app_js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/app'))
        .pipe(server.stream());
});

// Копируем все шрифты в папку public/fonts
gulp.task('fonts', function() {
    gulp.src(fonts)
        .pipe(gulp.dest('public/fonts'))
        .pipe(server.stream());
});

// Копируем все Sources в папку public/sources
gulp.task('sources', function() {
    gulp.src('./assets/sources/**/*')
        .pipe(gulp.dest('public/sources'))
        .pipe(server.stream());
});

// Запуск сервера разработки gulp watch
gulp.task('watch', ['stylus','css','js', 'html', 'html_components','components_js','app_js', 'fonts'], function() {

    server.init({
        server: "public/"
        //proxy: "http://localhost:5000/admin/"
    });

    gulp.on('error', console.log);

    // Предварительная сборка проекта
    gulp.watch('assets/stylus/**/*.styl', ['stylus']);
    gulp.watch('assets/css/**/*.css', ['css']);
    gulp.watch('assets/app/**/*.html', ['html', 'html_components']);
    gulp.watch('assets/css/**/*.css', ['css']);
    gulp.watch('assets/img/**/*', ['images']);
    gulp.watch('assets/js/**/*', ['js']);
    gulp.watch('assets/app/**/*.js', ['components_js','app_js']);
    gulp.watch('assets/fonts/**/*', ['fonts']);

});

//Собираем билд
gulp.task('start', function() {
    // stylus
    gulp.src('./assets/stylus/main.styl')
        .pipe(stylus()) // собираем stylus
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/')); // записываем css

    // css
    gulp.src(css_other)
        .pipe(concat('other.css'))
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('public/css/')); // записываем css

    //images
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));

    //js
    gulp.src(js_lib)
        .pipe(gulp.dest('public/js'));

    //fonts
    gulp.src(fonts)
        .pipe(gulp.dest('public/fonts'));

    // Переносим все components_js в папку public/js
    gulp.src(components_js)
        .pipe(concat('components.js'))
        .pipe(gulp.dest('public/app'));

    // Переносим все app_js в папку public/js
    gulp.src(app_js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/app'));

    // Переносим все HTML в public/app/
    gulp.src(['./assets/app/*.html'])
        .pipe(gulp.dest('public/'));

    // Переносим все HTML public/
    gulp.src(['./assets/app/components/**/*.html'])
        .pipe(gulp.dest('public/app/components'));

    // Копируем все Sources в папку public/sources
    gulp.src('./assets/sources/**/*')
        .pipe(gulp.dest('public/sources'));
});


gulp.task('default', ['watch']);