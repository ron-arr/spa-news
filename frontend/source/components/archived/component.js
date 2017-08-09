import angular from "angular";
import template from "./tpl.html";
import url from "../../api-map.js";
import {range} from "lodash";

class controller {
    constructor($scope) {
        'ngInject';
    }

    $onInit() {
        let count = this.data['count'];
        this.news = this.data['results'];
        this.pages = range(1, Math.ceil(count / 10) + 1);
    }
}

const component = {
    controller,
    template,
    bindings: {
        data: '<',
        page: '='
    }
};

export const archived = () => angular.module('app')
    .component('archived', component)
    .config($stateProvider => {
        'ngInject';
        $stateProvider.state({
            name: 'archived',
            url: 'archived?page',
            params: {
                page: {
                    value: '1',
                    squash: false
                }
            },
            parent: 'root',
            resolve: {
                data: function (TransferService, $transition$) {
                    return TransferService.Get(
                        url.archived,
                        {params: {page: $transition$.params()['page']}}
                    ).then(
                        function (response) {
                            return response['data'];
                        });
                }
            },
            views: {
                'body@root': 'archived'
            }
        });
    });


