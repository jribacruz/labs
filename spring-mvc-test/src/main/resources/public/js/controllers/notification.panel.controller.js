(function() {
	'use strict';

	angular.module('acompMD').controller('NotificationPanelCT', NotificationPanelCT);

	NotificationPanelCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdPanel', 'SidenavSV', 'data', '$interval' ];

	/**
	 * Controller responsável pela filtragem de zonas da tela principal.
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param HighchartSV
	 * @param AcompInfoSV
	 * @returns
	 */
	function NotificationPanelCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdPanel, SidenavSV, data, $interval) {
		$log.debug('[NotificationPanelCT] Inicializando Controller... SidenaveSV.context: ' + JSON.stringify(SidenavSV.getContext()));
		var self = this;

		self.hide = hide;

		self.notifications = [];

		_init();
		
		$interval(hide, 10000 ,1);

		function hide() {
			$mdDialog.hide();
		}

		function _init() {
			self.notifications = data.notifications;
		}
	}
})();