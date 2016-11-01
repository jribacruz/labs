(function() {
	'use strict';

	angular.module('acompMD').directive('auto-focus', autoFocus);

	function autoFocus($parse) {
		var directive = {
			link : {
				pre : function preLink(scope, element, attr) {
					console.debug('prelink called');
					// this fails since the element hasn't rendered
					// element[0].focus();
				},
				post : function postLink(scope, element, attr) {
					console.debug('postlink called');
					// this succeeds since the element has been rendered
					element[0].focus();
				}
			}
		}
		return directive;
	}

})();