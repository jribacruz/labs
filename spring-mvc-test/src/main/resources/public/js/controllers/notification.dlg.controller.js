(function() {
	'use strict';

	angular.module('acompMD').controller('NotificationDlgCT', NotificationDlgCT);

	NotificationDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SidenavSV', 'data', '$interval' ];

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
	function NotificationDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SidenavSV, data, $interval) {
		$log.debug('[NotificationDlgCT] Inicializando Controller... SidenaveSV.context: ' + JSON.stringify(SidenavSV.getContext()));
		var self = this;

		self.hide = hide;

		self.notifications = [];
		
		self.notificationsQueue = [];
		
		self.progressValue = 0;
		
		// Tempo de exibição de cada panel 10s
		var unitTick = 10000;
		
		var qtdItemByPanel = 6;
		
		var qtdPanels = 0;
		
		var panelCounter = 0;
		_init();
		
		function hide() {
			$log.debug('[NotificationDlgCT] hide');
			$mdDialog.hide();
		}
		
		function _updater() {
			if(panelCounter < qtdPanels) {
				$log.debug('[NotificationDlgCT] panelCounter: '+panelCounter);
				var idxStart = panelCounter*qtdItemByPanel;
				var idxEnd = (panelCounter*qtdItemByPanel)+qtdItemByPanel;
			
				$log.debug('[NotificationDlgCT] idxStart: '+idxStart);
				$log.debug('[NotificationDlgCT] idxEnd: '+idxEnd);
				
				self.notificationsQueue = self.notifications.slice(idxStart, idxEnd);
				
				panelCounter++;
			} else {
				hide();
			}
		}

		function _init() {
			self.notifications = data.notifications;
			
			$log.debug('[NotificationDlgCT] self.notifications.length: '+self.notifications.length);
			$log.debug('[NotificationDlgCT] qtdItemByPanel: '+qtdItemByPanel);
			
			qtdPanels = Math.ceil(self.notifications.length/qtdItemByPanel);
			$log.debug('[NotificationDlgCT] qtdPanels: '+qtdPanels);
			
			_updater();
			$interval(_updater, unitTick , qtdPanels+1);
			
		}
		
	
	}
})();