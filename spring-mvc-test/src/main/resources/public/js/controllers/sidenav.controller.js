(function() {
	'use strict';

	angular.module('acompMD').controller('SidenavCT', SidenavCT);

	SidenavCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SidenavSV',
			'SecaoInfoFilterSV' ];

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
	function SidenavCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SidenavSV, SecaoInfoFilterSV) {
		$log.debug('[SidenavCT] Inicializando Controller...');
		var self = this;

		self.getTitle = getTitle;

		self.getSubtitle = getSubtitle;

		self.getVisibleId = getVisibleId;

		self.showDialogPTHistoricoConexoes = showDialogPTHistoricoConexoes;

		self.showDialogPTHorariosTransmissao = showDialogPTHorariosTransmissao;

		self.showDialogPTRegistroOcorrencias = showDialogPTRegistroOcorrencias;

		self.showDialogPTDetalhesPonto = showDialogPTDetalhesPonto;

		self.secaoFilterOptions = SecaoInfoFilterSV.filterOptions;
		
		self.updateSecaoFilterOptions = updateSecaoFilterOptions;
		
		self.selectPontoTransmissao = selectPontoTransmissao;
		
		self.selectMunicipio = selectMunicipio;
		
		self.toggle = toggle;

		function getTitle() {
			return SidenavSV.getTitle();
		}
		
		function _enableNotification(flag) {
			$scope.acompInfoCT.notificationGlobalEnabled = flag;
		}

		function getSubtitle() {
			return SidenavSV.getSubtitle();
		}

		function getVisibleId() {
			return SidenavSV.getVisibleId();
		}
		
		function selectPontoTransmissao() {
			SecaoInfoFilterSV.setMunicipioId(0);
			SecaoInfoFilterSV.setPontoTransmissaoId(SidenavSV.getContext().pt.idPontoTranmissao);
			//console.log(SecaoInfoFilterSV.getPontoTransmissaoId());
		}
		
		function selectMunicipio() {
			SecaoInfoFilterSV.setMunicipioId(SidenavSV.getContext().mu.idMunicipio);
			SecaoInfoFilterSV.setPontoTransmissaoId(0);
		}
		
		function toggle() {
			SidenavSV.toggle();
		}

		/**
		 * Exibe dialog de Histórico de Conexões de um Ponto de Transmissão.
		 */
		function showDialogPTHistoricoConexoes() {
			$log.debug('[ZonaInfoCT] Exibindo histórico de conexões...');
			var parentEl = angular.element(document.body);
			$scope.acompInfoCT.saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/pt.historico.conexoes.dlg.html',
				controller : 'PTHistoricoConexoesDlgCT',
				onRemoving : function() {
					$scope.acompInfoCT.enableNotification();
				},
				controllerAs : 'ptHistoricoConexoesDlgCT'
			});
			// SidenavSV.toggle();
		}

		/**
		 * Exibe dialog de Horários do Ponto de Transmissão.
		 */
		function showDialogPTHorariosTransmissao() {
			$log.debug('[ZonaInfoCT] Exibindo horários de transmissão...');
			var parentEl = angular.element(document.body);
			$scope.acompInfoCT.saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/pt.horarios.transmissao.dlg.html',
				controller : 'PTHorariosTransmissaoDlgCT',
				onRemoving : function() {
					$scope.acompInfoCT.enableNotification();
				},
				controllerAs : 'ptHorariosTransmissaoDlgCT'
			});
		}

		/**
		 * Exibe dialog de Registro de Ocorrências do Ponto de Transmissão.
		 */
		function showDialogPTRegistroOcorrencias() {
			$log.debug('[ZonaInfoCT] Exibindo registro de ocorrências...');
			var parentEl = angular.element(document.body);
			$scope.acompInfoCT.saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/pt.registro.ocorrencias.dlg.html',
				controller : 'PTRegistroOcorrenciasDlgCT',
				onRemoving : function() {
					$scope.acompInfoCT.enableNotification();
				},
				controllerAs : 'ptRegistroOcorrenciasDlgCT'
			});
		}

		/**
		 * Exibe dialog de Detalhamento do Ponto de Transmissão.
		 */
		function showDialogPTDetalhesPonto() {
			$log.debug('[ZonaInfoCT] Exibindo detalhes do ponto de transmissão...');
			var parentEl = angular.element(document.body);
			$scope.acompInfoCT.saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/pt.detalhes.ponto.dlg.html',
				controller : 'PTDetalhesPontoDlgCT',
				onRemoving : function() {
					$scope.acompInfoCT.enableNotification()
				},
				controllerAs : 'ptDetalhesPontoDlgCT'
			});
		}
		
		function updateSecaoFilterOptions() {
			$log.debug('[SidenavCT] Aplicando filtros...');
			SecaoInfoFilterSV.filterOptions['A'] = self.secaoFilterOptions['A'];
			SecaoInfoFilterSV.filterOptions['B'] = self.secaoFilterOptions['B'];
			SecaoInfoFilterSV.filterOptions['C'] = self.secaoFilterOptions['C'];
			SecaoInfoFilterSV.filterOptions['D'] = self.secaoFilterOptions['D'];
			SecaoInfoFilterSV.filterOptions['E'] = self.secaoFilterOptions['E'];
			
		}

	}
})();