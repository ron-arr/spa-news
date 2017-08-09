import angular from "angular";
import template from "./tpl.html";
import url from "../../api-map.js";

class controller {
    constructor() {
        'ngInject';
    }

    $onInit() { }
}

const component = {
    controller,
    template,
    bindings: {
        news: '<'
    }
};

export const newsDetail = () => angular.module('app')
    .component('newsDetail', component)
    .config($stateProvider => {
        'ngInject';

        $stateProvider.state({
            name: 'detail',
            parent: 'root',
            url: 'news/{news_id}',
            resolve: {
                news: function (TransferService, $transition$) {
                    return TransferService.Get(
                        url.detail + $transition$.params()['news_id'] + '/'
                    ).then(function (data) {
                        return data['data'];
                    });
                }
            },
            views: {
                'body@root': 'newsDetail'
            }
        });
    });

