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


