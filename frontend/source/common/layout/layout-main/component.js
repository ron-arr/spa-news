import angular from 'angular';
import template from './tpl.html';

class controller {
    constructor() {
        'ngInject';

    }

    $onInit() {

    }
}

const component = {
    template,
    controller
};

export const layoutMain = () => angular.module('app')
    .component('layoutMain', component);

