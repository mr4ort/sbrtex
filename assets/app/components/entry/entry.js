/**Елемент справочника**/
;(function(){
    'use strict';
    
    angular
        //Иницилизируем модуль
        .module('ngDirectories.entry', [
            'ngRoute',
            'ngResource',
            'ui.bootstrap'
        ])
        .controller('EntryCtrl', EntryCtrl)
        .factory('EntryServices', EntryServices);

    /**Контроллеры**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    EntryCtrl.$inject = [
        '$log',
        '$routeParams',
        'EntryServices'
    ];

    function EntryCtrl($log, $routeParams, EntryServices){
        //Работаем через объект
        var en = this;
        en.widthAuto = '0';
        en.date = function(date){
            return new Date(date);
        };

        EntryServices.get().$promise.then(
            function(result) {
                en.entry = result.response.entry;
                $log.debug('Элемент справочника ', result.response.entry);
            }
        );
    }

    /**Сервисы**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    EntryServices.$inject = [
        '$resource'
    ];

    //Получаем данные об 1 справочнике
    function EntryServices ($resource) {
        return $resource('sources/getEntry.json', {}, {
            get: {
                method:'GET',
                isArray:false
            }

        });
    }

})();


