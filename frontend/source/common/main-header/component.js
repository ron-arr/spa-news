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
    controller,
    template
};

export const mainHeader = () => angular.module('app')
    .component('mainHeader', component);