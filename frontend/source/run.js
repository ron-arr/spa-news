import * as vis from "@uirouter/visualizer";

const DEBUG = false;

export const run = ($state, $uiRouter, $transitions, $document) => {
    'ngInject';
    if (DEBUG) {
        // not for production
        vis.visualizer($uiRouter);
    }
    $transitions.onSuccess({}, trans => {
        if (!trans.to().data || (!!trans.to().data && !trans.to().data.scrollTop)) {
            $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
        }
    }, {priority: 6});

    $transitions.onError({}, transition => {
        transition.promise.catch($error$ => {
            if ($error$ && $error$.detail && ($error$.detail.status === 404 || $error$.detail.status === 500)) {
                $state.go('system.error', null, {location: false});
            }
        });
    }, {priority: 4});

};