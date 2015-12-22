/**DateTimePiker Bootstrap справочника**/
;(function(){
    'use strict';

    angular
        //Иницилизируем модуль
        .module('ngDirectories.dateTimePiker', [
            'ui.bootstrap'
        ])
        .controller('DateTimePikerCtrl', DateTimePikerCtrl);

    /**Контроллеры**/
    //Инжектим названия зависисмостей, что бы не пропали при минификации
    DateTimePikerCtrl.$inject = [
        '$log'
    ];

    function DateTimePikerCtrl($log){
        //Работаем через объект
        var calendar = this;

        calendar.today = function() {
            calendar.dt = new Date();
        };
        calendar.today();

        calendar.clear = function () {
            calendar.dt = null;
        };

        // Disable weekend selection
        calendar.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        calendar.toggleMin = function() {
            calendar.minDate = calendar.minDate ? null : new Date();
        };
        calendar.toggleMin();
        calendar.maxDate = new Date(2020, 5, 22);

        calendar.open = function($event) {
            calendar.status.opened = true;
        };

       /* calendar.setDate = function(year, month, day) {
            calendar.dt = new Date(year, month, day);
        };*/
        calendar.setDate = function(date) {
            calendar.dt = new Date(date)
        };

        calendar.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        calendar.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        calendar.format = calendar.formats[2];

        calendar.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        calendar.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        calendar.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<calendar.events.length;i++){
                    var currentDay = new Date(calendar.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return calendar.events[i].status;
                    }
                }
            }

            return '';
        };

    }

})();



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
        '$log',
        'DirectoriesServices'
    ];

    function DirectoriesCtrl($log, DirectoriesServices){
        //Работаем через объект
        var ds = this;
        ds.title = 'Справочники';
        //Получить все справочники
        DirectoriesServices.query().$promise.then(
            function(result) {
                ds.directories = result.response.directories;
                $log.debug('Справочники ', result.response.directories);
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


