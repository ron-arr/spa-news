import angular from "angular";
import template from "./tpl.html";
import url from "../../api-map";

export const component = {
    template
};

export const root = () => angular.module('app')
    .component('root', component)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';

        $stateProvider
            .state({
                name: 'root',
                url: '/',
                resolve: {
                    footerNews: function (TransferService) {
                        return TransferService.Get(url.footerNews).then(function (data) {
                            return data['data'];
                        });
                    }
                },
                redirectTo: 'index',
                views: {
                    $default: 'layoutMain',
                    'header@root': 'mainHeader',
                    'body@root': {
                        template: '<ui-view />'
                    },
                    'footer@root': 'mainFooter'
                }
            });

        $urlRouterProvider.otherwise($injector =>
            $injector.get('$state').go('system.error', null, {location: false})
        );

    });