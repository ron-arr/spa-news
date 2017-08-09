import angular from "angular";
import {run} from "./run";
//LOGIC
import {transferService} from "./logic/transfer.service";
import {resolveService} from "./logic/resolve.service";
//COMMON
import {layoutMain} from "./common/layout/layout-main/component";
import {mainFooter} from "./common/main-footer/component";
import {mainHeader} from "./common/main-header/component";
import {root} from "./components/root/component";
import {archived} from "./components/archived/component";
import {index} from "./components/index/component";
import {newsDetail} from "./components/detail/component";

import {systemCommonState} from "./components/system/state";
import {systemError} from "./components/system/error/component";

angular.module('app', [
    'ui.router',
    'ngSanitize'
]).config(($interpolateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $compileProvider) => {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}).run(run);

transferService();
resolveService();

layoutMain();
mainFooter();
mainHeader();


root();
archived();
index();
newsDetail();

systemCommonState();
systemError();