import angular from 'angular';
import template from './tpl.html';
import url from '../../api-map'

class controller {
    constructor(TransferService) {
        'ngInject';
        this.ts = TransferService.footerNews;
    }
    $onInit() { }
}

const component = {
    controller,
    template,
    bindings: {footerNews: '<'}
};

export const mainFooter = () => angular.module('app')
    .component('mainFooter', component); 

