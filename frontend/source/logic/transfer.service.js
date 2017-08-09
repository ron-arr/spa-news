import angular from "angular";
import {assign} from "lodash";

const getParams = params => params ? params : {};

class TransferService {
    constructor($http) {
        'ngInject';
        assign(this, {$http});
    }

    Get(url, params) {
        return this.$http.get(url, getParams(params))
            .then(response => response)
            .catch(response => response);
    }


    Post(url, data, params) {
        return this.$http.post(url, data, getParams(params))
            .then(response => response)
            .catch(response => response);
    }

    Put(url, data, params) {
        return this.$http.put(url, data, getParams(params))
            .then(response => response)
            .catch(response => response);
    }

    Patch(url, data, params) {
        return this.$http.patch(url, data, getParams(params))
            .then(response => response)
            .catch(response => response);
    }

    Delete(url, params) {
        return this.$http.delete(url, getParams(params))
            .then(response => response)
            .catch(response => response);
    }
}

const SERVICE_NAME = 'TransferService';

export const transferService = () => angular.module('app')
    .service(SERVICE_NAME, TransferService);