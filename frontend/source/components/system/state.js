import angular from 'angular';

export const systemCommonState = () => angular.module('app')
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state({
                abstract: true,
                name: 'system',
                parent: 'root',
                url: 'system'
            });
    });