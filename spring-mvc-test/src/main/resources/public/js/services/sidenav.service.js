(function() {
	'use strict';

	angular.module("acompMD").factory('SidenavSV', SidenavSV);

	SidenavSV.$inject = [ 'AcompCtx', '$log', '$mdSidenav' ];

	/**
	 * Service responsável pelo serviço REST da tela inicial do acompanhamento
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function SidenavSV(AcompCtx, $log, $mdSidenav) {
		$log.debug('[SidenavSV] Inicializando... ');

		var title = "";

		var subtitle = "";

		var visibleId = "";

		var context = {};

		var service = {
			setTitle : setTitle,
			getTitle : getTitle,

			setSubtitle : setSubtitle,
			getSubtitle : getSubtitle,

			setVisibleId : setVisibleId,
			getVisibleId : getVisibleId,

			toggle : toggle,

			setContext : setContext,
			getContext : getContext
		}

		return service;

		function setTitle(_title) {
			title = _title;
		}

		function getTitle() {
			return title;
		}

		function setSubtitle(_subtitle) {
			subtitle = _subtitle;
		}

		function getSubtitle() {
			return subtitle;
		}

		function setVisibleId(id) {
			visibleId = id;
		}

		function getVisibleId() {
			return visibleId;
		}

		function toggle() {
			$mdSidenav('right').toggle();
		}

		function setContext(_context) {
			context = _context;
		}

		function getContext() {
			return context;
		}

	}

})();