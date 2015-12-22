;(function(){
    'use strict';

    angular
        //Иницилизируем модуль
        .module('ngDirectories', [
            'ngDirectories.directories',
            'ngDirectories.directory',
            'ngDirectories.entry',
            'ngDirectories.dateTimePiker',
            'ngRoute',
            'ngResource',
            'ui.bootstrap'
            ]
        )
        //Подключаем конфиги
        .config(Config);

    Config.$inject = [
        '$routeProvider',
        '$logProvider'
    ];

    function Config($routeProvider,$logProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/components/directories/directories.html',
                controller: 'DirectoriesCtrl',
                controllerAs:'ds'
            })
            .when('/directory/:Id', {
                templateUrl: 'app/components/directory/directory.html',
                controller: 'DirectoryCtrl',
                controllerAs:'dy'
            })
            .when('/entry/:Id', {
                templateUrl: 'app/components/entry/entry.html',
                controller: 'EntryCtrl',
                controllerAs:'en'
            })
            .otherwise({
                redirectTo: '/'
            });

        //Включаем логирование
        $logProvider.debugEnabled(true);
    }

})();
