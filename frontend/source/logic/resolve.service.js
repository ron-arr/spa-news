import angular from "angular";
import {assign} from "lodash";

export const catchErrors = (response, $q, successEvent) => {
    let deferred = $q.defer(),
        errorsStatus = new Set([404, 500, 502]);

    if (errorsStatus.has(response.status)) {
        deferred.reject({status: response.status});
    } else {
        deferred.resolve(successEvent(response.data));
    }

    return deferred.promise;
};

class ResolveService {
    constructor($q, TransferService, Stores) {
        'ngInject';
        assign(this, {
            $q,
            TransferService,
            Stores
        });
    }

    getDataFromResolve(currentItem, errorCode = 404) {
        return currentItem ? this.$q.resolve(currentItem) : this.$q.reject({status: errorCode});
    }

    loadEvent(storeName, url, error, id, dataChangeMethod, notCheckStore) {
        let getDataFromAPI = () => this.TransferService.Get(url)
            .then((response) =>
                (error)
                    ? catchErrors(response, this.$q, ((response) => this.Stores.updatingStore(storeName, response, dataChangeMethod)))
                    : this.$q.when(this.Stores.updatingStore(storeName, response.data, dataChangeMethod))
            );

        return (!notCheckStore)
            ? (this.Stores.fetchesStore(storeName, id)
                ? this.$q.when(this.Stores.getStoreData(storeName))
                : getDataFromAPI())
            : getDataFromAPI();
    }

    continuousLoading(storeName, url, error, dataChangeMethod) {
        return this.TransferService.Get(url)
            .then((response) =>
                (error)
                    ? catchErrors(response, this.$q, (response) => this.Stores.updatingStore(storeName, response, dataChangeMethod))
                    : this.$q.when(this.Stores.updatingStore(storeName, response.data, dataChangeMethod))
            );
    }
}

const SERVICE_NAME = 'ResolveService';

export const resolveService = () => angular.module('app')
    .service(SERVICE_NAME, ResolveService);