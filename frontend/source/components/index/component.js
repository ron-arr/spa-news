import angular from "angular";
import template from "./tpl.html";
import url from "../../api-map.js";

class controller {
    constructor() {
        'ngInject';
    }

    $onInit() {

    }
}

const component = {
    controller,
    template,
    bindings: {
        news: '<'
    }
};

export const index = () => angular.module('app')
    .component('index', component)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state({
                name: 'index',
                url: '',
                parent: 'root',
                resolve: {
                    news: function (TransferService) {
                        return TransferService.Get(url.recent).then(function (data) {
                            return data['data'];
                        });
                    }
                },
                views: {
                    'body@root': 'index'
                }
            });
    });