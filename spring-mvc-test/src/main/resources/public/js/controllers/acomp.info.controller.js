(function() {
	'use strict';

	angular.module('acompMD').controller('AcompInfoCT', AcompInfoCT);

	AcompInfoCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', '$filter', 'SidenavSV',
			'ZonaInfoFilterSV', '$mdPanel', 'LocalVotacaoSV' ];

	/**
	 * Controller responsável por gerenciar a tela inicial do acompanhamento.
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param HighchartSV
	 * @param AcompInfoSV
	 * @returns
	 */
	function AcompInfoCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, $filter, SidenavSV, ZonaInfoFilterSV, $mdPanel, LocalVotacaoSV) {
		$log.debug('[AcompInfoCT] Inicializando Controller...');
		var self = this;

		$log.debug($cookies.get('t'))

		self.selectedZonaId = 0;

		self.acompInfoModel = {};
		
		self.showHorariosTransmissaoDlg = showHorariosTransmissaoDlg;
		
		self.showHistoricoConexoesDlg = showHistoricoConexoesDlg;

		self.showDialogOcorrencias = showDialogOcorrencias;

		self.showZonaInfoFilterDialog = showZonaInfoFilterDialog;
		
		self.showZonaInfoVisibleDialog = showZonaInfoVisibleDialog;

		self.toggleSidenavMunicipios = toggleSidenavMunicipios;
		
		self.toggleSidenavLocalVotacao = toggleSidenavLocalVotacao;

		self.toggleSidenavPontosTransmissaoOnline = toggleSidenavPontosTransmissaoOnline;

		self.toggleSidenavPontosTransmissaoConectadosHoje = toggleSidenavPontosTransmissaoConectadosHoje;

		self.toggleHighchart = toggleHighchart;
		
		self.fullScreenMode = fullScreenMode;

		self.showHighchart = true;

		self.notifications = [];

		self.getTurno = getTurno;
		
		self.getTipoExecucao = getTipoExecucao;

		self.isZonaInfoFiltered = isZonaInfoFiltered;

		self.filterCounter = 0;
		
		self.calcFilterCounter = calcFilterCounter;
		
		self.filterLabel = filterLabel;
		
		self.getFilterGroup1 = getFilterGroup1;
		
		self.resetFilter = resetFilter;
		
		self.notificationGlobalEnabled = true;
		
		self.notificationState = self.notificationGlobalEnabled;
		
		self.enableNotification = enableNotification;
		
		self.saveStateAndDisableNotification = saveStateAndDisableNotification;
		
		self.pontosTransmissaoConectadosHoje = [];
		
		self.pontosTransmissaoOnline = [];
		
		self.locaisVotacaoArray = [];

		/**
		 * Registra o callback responsável pela atualização da tela inicial do
		 * acompanhamento.
		 */
		$scope.$on(AcompCtx.UPDATE_EVENT_ID, _onUpdate);

		function isZonaInfoFiltered(zonaInfo) {
			return ZonaInfoFilterSV.isFiltered(zonaInfo);

		}
		
		function enableNotification() {
			$log.debug('[AcompInfoCT] Notification Enabled');
			//self.notificationGlobalEnabled = true;
			self.notificationGlobalEnabled = self.notificationState ;
		}
		
		function saveStateAndDisableNotification() {
			self.notificationState = self.notificationGlobalEnabled;
			self.notificationGlobalEnabled = false;
		}
		
		function getFilterGroup1() {
			return ZonaInfoFilterSV.filterOptions.group1;
		}
		
		function resetFilter() {
			ZonaInfoFilterSV.filterOptions.group1 = 'A';
			calcFilterCounter();
		}

		function calcFilterCounter() {
			self.filterCounter = 0;
			angular.forEach(self.acompInfoModel.zonasInfo, function(zonaInfo, idZona) {
				if (ZonaInfoFilterSV.isFiltered(zonaInfo)) {
					self.filterCounter++;
				}
			});
		}
		
		function filterLabel() {
			return ZonaInfoFilterSV.getFilterLabel();
		}
		
		function showHorariosTransmissaoDlg(historicoList) {
			var parentEl = angular.element(document.body);
			$log.debug('[AcompInfoCT] Inicializando Controller... showHorariosTransmissaoDlg.data: ' + JSON.stringify(historicoList));
			
			saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/horarios.transmissao.dlg.html',
				controller : 'HorariosTransmissaoDlgCT',
				controllerAs : 'horariosTransmissaoDlgCT',
				onRemoving: enableNotification,
				locals : {
					data : {
						'zonaInfo' : historicoList
					}
				}
			});
		}
		
		function showHistoricoConexoesDlg(historicoList) {
			var parentEl = angular.element(document.body);
			$log.debug('[AcompInfoCT] Inicializando Controller... showHistoricoConexoesDlg.data: ' + JSON.stringify(historicoList));
			
			saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/historico.conexoes.dlg.html',
				controller : 'HistoricoConexoesDlgCT',
				controllerAs : 'historicoConexoesDlgCT',
				onRemoving: enableNotification,
				locals : {
					data : {
						'zonaInfo' : historicoList
					}
				}
			});
		}
		
		function showDialogOcorrencias(numeroZona) {
			saveStateAndDisableNotification();
			$log.debug('[AcompInfoCT] Notification Disabled');
			var parentEl = angular.element(document.body);
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/ocorrencias.dlg.html',
				controller : 'OcorrenciaDialogCT',
				controllerAs : 'ocorrenciasDialogCT',
				onRemoving: enableNotification,
				locals : {
					data : {
						'numeroZona' : numeroZona
					}
				}
			});
		}

		function getTurno() {
			return $cookies.get('t') == 'PRIMEIRO' ? '1º' : '2º';
		}
		
		function getTipoExecucao() {
			return self.acompInfoModel.tipoExecucao;
		}

		function showZonaInfoFilterDialog() {
			var parentEl = angular.element(document.body);
			saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/zona.info.filter.dlg.html',
				controller : 'ZonaInfoFilterCT',
				controllerAs : 'zonaInfoFilterCT',
				onRemoving: enableNotification,
				scope : $scope,
				preserveScope : true,
				locals : {
					data : {
						'acompInfoModel' : self.acompInfoModel
					}
				}
			});
		}
		
		function showZonaInfoVisibleDialog() {
			var parentEl = angular.element(document.body);
			saveStateAndDisableNotification();
			$mdDialog.show({
				parent : parentEl,
				templateUrl : 'partials/dialogs/zona.info.visible.dlg.html',
				controller : 'ZonaInfoVisibleCT',
				controllerAs : 'zonaInfoVisibleCT',
				onRemoving: enableNotification,
				scope : $scope,
				preserveScope : true,
				locals : {
					data : {
						'acompInfoModel' : self.acompInfoModel
					}
				}
			});
		}

		function toggleSidenavLocalVotacao(zonaInfo) {
			$log.debug('[AcompInfoCT] toggleSidenavLocalVotacao numeroZona: '+JSON.stringify(zonaInfo.numeroZona));
			self.locaisVotacaoArray = [];
			var locaisVotacaoInfo = LocalVotacaoSV.resource.localvotacao({
				id: zonaInfo.numeroZona
			}, function() {
				angular.forEach(locaisVotacaoInfo, function(lvInfo, lvId) {
					if(lvInfo.id !== undefined) {
						self.locaisVotacaoArray.push(lvInfo);
					}
				});
			});
			
			SidenavSV.setTitle(zonaInfo.numeroZona + 'ª - ' + zonaInfo.nomeMunicipio);
			SidenavSV.setSubtitle("Locais de Votação");
			SidenavSV.setVisibleId("localvotacao_id");
			SidenavSV.toggle();
		}
		
		function toggleSidenavMunicipios(idZona) {
			$log.debug('[AcompInfoCT] toggleSidenavMunicipios ');
			self.selectedZonaId = idZona;
			SidenavSV.setTitle(self.acompInfoModel.zonasInfo[idZona].numeroZona + 'ª - '
					+ self.acompInfoModel.zonasInfo[idZona].nomeMunicipio);
			SidenavSV.setSubtitle("Municipios");
			SidenavSV.setVisibleId("municipios_id");
			SidenavSV.toggle();
		}

		function toggleSidenavPontosTransmissaoOnline(idZona, numeroZona) {
			self.selectedZonaId = idZona;
			self.pontosTransmissaoOnline = AcompInfoSV.resource.pontosonline({id: numeroZona});
			SidenavSV.setTitle(self.acompInfoModel.zonasInfo[idZona].numeroZona + 'ª - '
					+ self.acompInfoModel.zonasInfo[idZona].nomeMunicipio);
			SidenavSV.setSubtitle("Pontos de Transmissão Online");
			SidenavSV.setVisibleId("pontos_transmissao_online_id");
			SidenavSV.toggle();
		}

		function toggleSidenavPontosTransmissaoConectadosHoje(idZona, numeroZona) {
			self.selectedZonaId = idZona;
			self.pontosTransmissaoConectadosHoje = AcompInfoSV.resource.pontosconectadoshoje({id: numeroZona});
			SidenavSV.setTitle(self.acompInfoModel.zonasInfo[idZona].numeroZona + 'ª - '
					+ self.acompInfoModel.zonasInfo[idZona].nomeMunicipio);
			SidenavSV.setSubtitle("Pontos de Transmissão Conectados Hoje");
			SidenavSV.setVisibleId("pontos_transmissao_conectados_hoje_id");
			SidenavSV.toggle();
		}

		function toggleHighchart() {
			self.showHighchart = !self.showHighchart;
		}
		
		function fullScreenMode() {
			if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
			   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
			    if (document.documentElement.requestFullScreen) {  
			      document.documentElement.requestFullScreen();  
			    } else if (document.documentElement.mozRequestFullScreen) {  
			      document.documentElement.mozRequestFullScreen();  
			    } else if (document.documentElement.webkitRequestFullScreen) {  
			      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
			    }  
			  } else {  
			    if (document.cancelFullScreen) {  
			      document.cancelFullScreen();  
			    } else if (document.mozCancelFullScreen) {  
			      document.mozCancelFullScreen();  
			    } else if (document.webkitCancelFullScreen) {  
			      document.webkitCancelFullScreen();  
			    }  
			  } 
		}

		/**
		 * Callback responsável por atualizações da tela inicial do
		 * acompanhamento.
		 * 
		 */
		function _onUpdate() {
			$log.debug('[AcompInfoCT] onUpdate');

			/*
			 * Realiza uma requisição obtendo a versão mais atualizada do
			 * AcompInfoModel.
			 */
			var refreshAcompInfoModel = AcompInfoSV.resource.zonas(function() {
				$log.debug('[AcompInfoCT] resource.get callback');
				_updateNotifications(refreshAcompInfoModel);
				angular.forEach(refreshAcompInfoModel.zonasInfo, function(refreshZonaInfo, idZona) {
					_updateAcomInfoModel(refreshAcompInfoModel);
					_updateZonaInfo(refreshZonaInfo, idZona);
					calcFilterCounter();
				});
				_updateHighchart(refreshAcompInfoModel);
				if(self.notificationGlobalEnabled) {
					_showDialogNotification();
				}
				//_showPanelNotification();
			});

		}

		function _updateHighchart(refreshAcompInfoModel) {
			// Atualiza os dados do highcharts com informações novas.
			HighchartSV.updateData(refreshAcompInfoModel.zonasInfo);
			var qntTotalSecoesTotalizadas = $filter('number')(refreshAcompInfoModel.qntTotalSecoesTotalizadas);
			var qntTotalSecoes = $filter('number')(self.acompInfoModel.qntTotalSecoes);
			HighchartSV.setTitle('Total de Seções Apuradas: ' + qntTotalSecoesTotalizadas + ' de ' + qntTotalSecoes);
		}

		function _updateAcomInfoModel(refreshAcompInfoModel) {
			self.acompInfoModel.tipoExecucao = refreshAcompInfoModel.tipoExecucao;
			self.acompInfoModel.qntTotalZonas = refreshAcompInfoModel.qntTotalZonas;
			self.acompInfoModel.qntTotalLocaisVotacao = refreshAcompInfoModel.qntTotalLocaisVotacao;
			self.acompInfoModel.qntTotalSecoes = refreshAcompInfoModel.qntTotalSecoes
			self.acompInfoModel.qntTotalSecoesTotalizadas = refreshAcompInfoModel.qntTotalSecoesTotalizadas;
			self.acompInfoModel.qntTotalSecoesPendentes = refreshAcompInfoModel.qntTotalSecoesPendentes
			self.acompInfoModel.qntTotalSecoesNaoRecebida = refreshAcompInfoModel.qntTotalSecoesNaoRecebida
			self.acompInfoModel.qntTotalSecoesNaoTotalizada = refreshAcompInfoModel.qntTotalSecoesNaoTotalizada
			self.acompInfoModel.qntTotalSecoesRecebida = refreshAcompInfoModel.qntTotalSecoesRecebida
			self.acompInfoModel.percTotalSecoesTotalizadas = refreshAcompInfoModel.percTotalSecoesTotalizadas;
		}

		function _updateZonaInfo(refreshZonaInfo, idZona) {
			self.acompInfoModel.zonasInfo[idZona].qntSecoes = refreshZonaInfo.qntSecoes;
			self.acompInfoModel.zonasInfo[idZona].qntSecoesTotalizadas = refreshZonaInfo.qntSecoesTotalizadas;
			self.acompInfoModel.zonasInfo[idZona].qntSecoesPendentes = refreshZonaInfo.qntSecoesPendentes;
			self.acompInfoModel.zonasInfo[idZona].qntSecoesNaoRecebida = refreshZonaInfo.qntSecoesNaoRecebida;
			self.acompInfoModel.zonasInfo[idZona].qntSecoesNaoTotalizada = refreshZonaInfo.qntSecoesNaoTotalizada;
			self.acompInfoModel.zonasInfo[idZona].qntSecoesRecebida = refreshZonaInfo.qntSecoesRecebida;
			self.acompInfoModel.zonasInfo[idZona].percTotalSecoesTotalizadas = refreshZonaInfo.percTotalSecoesTotalizadas;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissao = refreshZonaInfo.qntPontosTransmissao;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissaoNaoTotalizada = refreshZonaInfo.qntPontosTransmissaoNaoTotalizada;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissaoTotalizadas = refreshZonaInfo.qntPontosTransmissaoTotalizadas;
			self.acompInfoModel.zonasInfo[idZona].percPontosTransmissaoTotalizadas = refreshZonaInfo.percPontosTransmissaoTotalizadas;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissaoConectadosHoje = refreshZonaInfo.qntPontosTransmissaoConectadosHoje;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissaoOnline = refreshZonaInfo.qntPontosTransmissaoOnline;
			self.acompInfoModel.zonasInfo[idZona].qntPontosTransmissaoNaoIniciados = refreshZonaInfo.qntPontosTransmissaoNaoIniciados;
			self.acompInfoModel.zonasInfo[idZona].qntOcorrencias = refreshZonaInfo.qntOcorrencias;
			self.acompInfoModel.zonasInfo[idZona].municipiosInfo = refreshZonaInfo.municipiosInfo;
			self.acompInfoModel.zonasInfo[idZona].ocorrenciaInfo = refreshZonaInfo.ocorrenciaInfo;
			self.acompInfoModel.zonasInfo[idZona].pontosTransmissaoOnlineInfo = refreshZonaInfo.pontosTransmissaoOnlineInfo;
			self.acompInfoModel.zonasInfo[idZona].pontosTransmissaoConectadoHojeInfo = refreshZonaInfo.pontosTransmissaoConectadoHojeInfo;
			self.acompInfoModel.zonasInfo[idZona].secoesInfo = refreshZonaInfo.secoesInfo;
		}

		function _updateNotifications(refreshAcompInfoModel) {
			$log.debug('[AcompInfoCT] Atualizando notificações...');
			self.notifications = [];
			angular.forEach(refreshAcompInfoModel.zonasInfo, function(zonaInfo, idZona) {
				var newPerc = zonaInfo.percTotalSecoesTotalizadas;
				var oldPerc = self.acompInfoModel.zonasInfo[idZona].percTotalSecoesTotalizadas;
				// $log.debug('ZE: ' + zonaInfo.numeroZona + ' newPerc: ' +
				// newPerc + ' oldPerc: ' + oldPerc);
				// 100% das seções totalizadas
				if (newPerc == 100 && oldPerc < 100) {
					self.notifications.push({
						ze : zonaInfo.numeroZona+'ª '+zonaInfo.nomeMunicipio,
						n: zonaInfo.numeroZona,
						valor : 100
					});
					// Zona chegou a 25%
				} else if ((newPerc >= 25 && newPerc < 50) && oldPerc < 25) {
					self.notifications.push({
						ze : zonaInfo.numeroZona+'ª '+zonaInfo.nomeMunicipio,
						n: zonaInfo.numeroZona,
						valor : 25
					});
					// Zona chegou a 50%
				} else if ((newPerc >= 50 && newPerc < 75) && oldPerc < 50) {
					self.notifications.push({
						ze : zonaInfo.numeroZona+'ª '+zonaInfo.nomeMunicipio,
						n: zonaInfo.numeroZona,
						valor : 50
					});
					// Zona chegou a 75%
				} else if ((newPerc >= 75 && newPerc < 100) && oldPerc < 75) {
					self.notifications.push({
						ze : zonaInfo.numeroZona+'ª '+zonaInfo.nomeMunicipio,
						n: zonaInfo.numeroZona,
						valor : 75
					});

				}
			});
			// $log.debug(JSON.stringify(self.notifications));
		}
		
		//@Deprecated
		function _showDialogNotification() {
			if (self.notifications.length > 0) {
				self.notificationState = self.notificationGlobalEnabled;
				self.notificationGlobalEnabled = false;
				var parentEl = angular.element(document.body);
				$mdDialog.show({
					parent : parentEl,
					templateUrl : 'partials/dialogs/notification.dlg.html',
					controller : 'NotificationDlgCT',
					controllerAs : 'notificationDlgCT',
					onRemoving: enableNotification,
					locals : {
						data : {
							notifications : self.notifications
						}
					}
				});
			}
		}
		
		function _showPanelNotification() {
			if (self.notifications.length > 0) {
				var panelPosition = $mdPanel.newPanelPosition()
			      .absolute()
			      .center();
				var config = {
				    attachTo: angular.element(document.body),
				    controller: 'NotificationPanelCT',
				    controllerAs: 'notificationPanelCT',
				    templateUrl: 'partials/panels/notification.html',
				    position: panelPosition,
				    trapFocus: true,
				    zIndex: 150,
				    clickOutsideToClose: false,
				    clickEscapeToClose: true,
				    hasBackdrop: true,
				    locals : {
						data : {
							notifications : self.notifications
						}
					}
				  };
				$mdPanel.open(config);
			}
		}
		

		/**
		 * Callback chamado quando o DOM estiver pronto.
		 */
		$(document).ready(function() {
			$log.debug('[AcompInfoCT] $(document).ready(function()...');
			self.acompInfoModel = AcompInfoSV.resource.zonas(function() {
				HighchartSV.init(self.acompInfoModel.zonasInfo);
				var qntTotalSecoesTotalizadas = $filter('number')(self.acompInfoModel.qntTotalSecoesTotalizadas);
				var qntTotalSecoes = $filter('number')(self.acompInfoModel.qntTotalSecoes);
				HighchartSV.setTitle('Total de Seções Apuradas: ' + qntTotalSecoesTotalizadas + ' de ' + qntTotalSecoes);
				ZonaInfoFilterSV.initVisibleZonas(self.acompInfoModel.zonasInfo);
				calcFilterCounter();
			});

		});

	}
})();