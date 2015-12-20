/**Справочники**/

;(function(){
    'use strict';

    angular
        //Иницилизируем модуль
        .module('ngDirectories.directories', [
            'ngRoute',
            'ngResource',
            'ui.bootstrap'
        ])
        .controller('DirectoriesCtrl', DirectoriesCtrl)
        .factory('DirectoriesServices', DirectoriesServices);

    /**Контроллеры**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DirectoriesCtrl.$inject = [
        'DirectoriesServices'
    ];

    function DirectoriesCtrl(DirectoriesServices){
        //Работаем через объект
        var ds = this;
        ds.title = 'Справочники';
        //Получить все справочники
        DirectoriesServices.query().$promise.then(
            function(result) {
                ds.directories = result.response.directories;
                //console.log(result.response.directories)
            }
        );
    }

    /**Сервисы**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DirectoriesServices.$inject = [
        '$resource'
    ];

    //Получаем данные для таблицы
    function DirectoriesServices ($resource) {
        return $resource('sources/getDirectories.json', {}, {
            query: {
                method:'GET',
                isArray:false
            }
        });
    }

})();



/**Справочники**/

;(function(){
    'use strict';

    angular
        //Иницилизируем модуль
        .module('ngDirectories.directory', [
            'ngRoute',
            'ngResource',
            'ui.bootstrap'
        ])
        .controller('DirectoryCtrl', DirectoryCtrl)
        .factory('DirectoryServices', DirectoryServices);

    /**Контроллеры**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DirectoryCtrl.$inject = [
        '$routeParams',
        'DirectoryServices'
    ];

    function DirectoryCtrl($routeParams, DirectoryServices){
        //Работаем через объект
        var dy = this;
        DirectoryServices.query().$promise.then(
            function(result) {
                dy.directory = result.response.directory;
                console.log(result.response.directory)
            }
        );

    }

    /**Сервисы**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DirectoryServices.$inject = [
        '$resource'
    ];

    //Получаем данные для таблицы
    function DirectoryServices ($resource) {
        return $resource('sources/getDirectory.json', {}, {
            query: {
                method:'GET',
                isArray:false
            }
        });
    }

})();


