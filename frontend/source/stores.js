import {assign, merge, isArray, compact, map, keyBy, cloneDeep, isPlainObject, orderBy, replace} from 'lodash';

const storeSchema = {
    data: null
};

const initStores = names =>
    isArray(names)
        ? keyBy(compact(map(names, n => !!n ? createBySchema(n) : undefined)), 'name')
        : {};

const createBySchema = name =>
    merge({}, cloneDeep(storeSchema), {name: name});

const createStore = (name, stores) =>
    !!stores[name]
        ? stores[name]
        : createBySchema(name);

export class Stores {
    constructor(names) {
        assign(this, {
            stores: !!names && isArray(names) ? this.initStores(names) : {}
        });
    }

    initStores(names) {
        this.stores = initStores(names);
    }

    createStore(name) {
        this.stores[name] = createStore(name, this.stores);
    }

    clearStore(name) {
        this.stores[name] = createBySchema(name);
    }

    updatingStore(name, data, dataChangeMethod) { 
        let newData = {
            data: dataChangeMethod
                ? dataChangeMethod(cloneDeep(data))
                : cloneDeep(data)
        };

        newData.data = !isPlainObject(newData.data)
            ? orderBy(newData.data, ['order'], ['asc'])
            : newData.data;

        if (isPlainObject(newData.data) && !!newData.data.id) {
            newData.id = newData.data.id;
        }

        this.stores[name] = assign(createBySchema(name), newData);

        return this.getStoreData(name);
    }

    getStoreData(name) {
        return !!this.stores[name] && !!this.stores[name].data
            ? cloneDeep(this.stores[name].data)
            : null;
    }

    getStore(name) {
        return !!this.stores[name] ? this.stores[name] : null;
    }

    getAllStores() {
        return cloneDeep(this.stores);
    }

    fetchesStore(name, id) {
        return (id
            ? (!!this.stores[name] && !!this.stores[name].id === id && !!this.stores[name].data)
            : (!!this.stores[name] && !!this.stores[name].data)) ? this.stores[name] : null;
    }

    static create(names) {
        return new Stores(names);
    }

    $get() {
        return {
            initStores   : names => this.initStores(names),
            clearStore   : name => this.clearStore(name),
            updatingStore: (name, data, dataChangeMethod) => this.updatingStore(name, data, dataChangeMethod),
            getStore     : name => this.getStore(name),
            getStoreData : name => this.getStoreData(name),
            getAllStores : () => this.getAllStores(),
            fetchesStore : (name, id) => this.fetchesStore(name, id),
        };
    }
}