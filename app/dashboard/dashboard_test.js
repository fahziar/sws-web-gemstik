/**
 * Created by henry on 25/10/2015.
 */

'use strict';

describe('myApp.dashboard module', function() {

    beforeEach(module('myApp.dashboard'));

    describe('dashboard controller', function() {

        it('should ....', inject(function($controller) {
            // spec body
            var dashboardCtrl = $controller('DashboardCtrl');
            expect(dashboardCtrl).toBeDefined();
        }));
    });
});