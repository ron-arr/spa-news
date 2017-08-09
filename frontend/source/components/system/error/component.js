import angular from 'angular';
import template from './tpl.html';

class controller {
    constructor () {
        'ngInject';
    }

    $onInit () {
        this.data = {
            title: 'shit happens ;)'
        };
    }
}

const component = {
    controller,
    template
};

export const systemError = () => angular.module('app')
    .component('systemError', component)
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state({
                name: 'system.error',
                url: '/error',
                views: {
                    'body@root': `systemError`
                }
            });
    });

