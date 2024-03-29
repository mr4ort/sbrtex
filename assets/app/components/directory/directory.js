/**Елементы справочника**/

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
        '$log',
        '$routeParams',
        'DirectoryServices'
    ];

    function DirectoryCtrl($log, $routeParams, DirectoryServices){
        //Работаем через объект
        var dy = this;
        DirectoryServices.get().$promise.then(
            function(result) {
                dy.directory = result.response.directory;
                $log.debug('Элементы справочника ', result.response.directory);
            }
        );
    }

    /**Сервисы**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DirectoryServices.$inject = [
        '$resource'
    ];

    //Получаем данные об 1 справочнике
    function DirectoryServices ($resource) {
        return $resource('sources/getDirectory.json', {}, {
            get: {
                method:'GET',
                isArray:false
            }

        });
    }

})();


