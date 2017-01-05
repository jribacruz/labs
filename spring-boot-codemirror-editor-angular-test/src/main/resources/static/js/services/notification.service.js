(function() {
	'use strict';

	angular.module("editorMD").factory('notificationSV', notificationSV);

	notificationSV.$inject = [ '$log', '$mdToast' ];

	/**
	 * 
	 * @param $log
	 * @param $mdToast
	 * @returns
	 */
	function notificationSV($log, $mdToast) {
		$log.debug('[notificationSV] Inicializando... ');

		var service = {
			show : show
		}
		
		/**
		 * Exibe a mensagem de notificação.
		 */
		function show(message) {
		   $log.debug('[notificationSV] show')
		   $mdToast.show(
		      $mdToast.simple()
		        .textContent(message)
		        .position('top right')
		        .hideDelay(3000)
		    );
		}

		return service;
	}

})();