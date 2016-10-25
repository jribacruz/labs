(function() {
	'use strict';

	angular.module('acompMD').controller('ZonaInfoCT', ZonaInfoCT);

	ZonaInfoCT.$inject = [ '$scope', '$log', 'AcompCtx', 'AcompInfoSV', '$routeParams', 'SidenavSV', '$mdDialog', 'SecaoInfoFilterSV',
			'SecaoSV', 'LocalVotacaoSV' ];

	/**
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param AcompInfoSV
	 * @param $routeParams
	 * @returns
	 */
	function ZonaInfoCT($scope, $log, AcompCtx, AcompInfoSV, $routeParams, SidenavSV, $mdDialog, SecaoInfoFilterSV, SecaoSV, LocalVotacaoSV) {
		$log.debug('[ZonaInfoCT] Inicializando Controller. $routeParams: ' + JSON.stringify($routeParams));
		var self = this;

		/**
		 * Model principal da Tela de Zona
		 */
		self.zonaInfo = {}

		self.toggleSidenavFiltrarSecoes = toggleSidenavFiltrarSecoes;

		self.toggleSidenavOpcoesPontoTransmissao = toggleSidenavOpcoesPontoTransmissao;

		self.toggleSidenavOpcoesZona = toggleSidenavOpcoesZona;

		self.toggleSidenavOpcoesMunicipios = toggleSidenavOpcoesMunicipios;

		self.legendaSecoes = true;

		self.toggleLegendaSecoes = toggleLegendaSecoes;

		self.showDialogPendenciasSecao = showDialogPendenciasSecao;

		self.visibleSecoes = {};

		self.secoesInfoArray = [];

		self.resetFiltros = resetFiltros;

		self.countQtdPontosTransmissao = 0;

		self.isSecaoInfoFiltered = isSecaoInfoFiltered;

		self.getSelectedPontoTransmissaoId = getSelectedPontoTransmissaoId;
		
		self.getSelectedLocalVotacaoId = getSelectedLocalVotacaoId;

		self.getSelectedMunicipioId = getSelectedMunicipioId;

		self.getSecaoHeader = getSecaoHeader;

		self.showTodasSecoesLink = showTodasSecoesLink;

		self.resetSecoesFiltradas = resetSecoesFiltradas;

		self.filterCounter = 0;

		self.calcFilterCounter = calcFilterCounter;
		
		self.locaisVotacaoArray = [];
		
		self.requestLocaisVotacao = requestLocaisVotacao;
		
		self.clearLocaisVotacaoArray = clearLocaisVotacaoArray;
		
		self.toggleSidenavOpcoesLocaisVotacao = toggleSidenavOpcoesLocaisVotacao;

		self.filterSecoesOptions = {
			'totalizadas' : true,
			'nao_totalizadas' : true,
			'pendentes' : true,
			'recebidas' : true,
			'nao_recebidas' : true
		}

		/**
		 * <code>	
		 * 1 - NÃO RECEBIDA
		 * 2 - AGREGADA
		 * 3 - RECEBIDA
		 * 4 - TOTALIZADA
		 * 5 - PENDENTE
		 * </code>
		 */
		self.secaoStatusColor = {
			0 : {
				color : 'grey-400',
				label : ''
			},
			1 : {
				color : 'grey-400',
				label : 'Não Recebido'
			},
			2 : {
				color : 'grey-400',
				label : 'Agregada'
			},
			3 : {
				color : 'orange',
				label : 'recebida'
			},
			4 : {
				color : 'blue',
				label : 'Totalizada'
			},
			5 : {
				color : 'red',
				label : 'Com Pendência'
			}
		}

		$scope.$on(AcompCtx.UPDATE_EVENT_ID, _updateCallback);
		// Inicializa o controlle.
		_init();
		
		function requestLocaisVotacao() {
			var locaisVotacaoInfo = LocalVotacaoSV.resource.localvotacao({
				id: self.zonaInfo.numeroZona
			}, function() {
				angular.forEach(locaisVotacaoInfo, function(lvInfo, lvId) {
					if(lvInfo.id !== undefined) {
						self.locaisVotacaoArray.push(lvInfo);
					}
				});
			})
		}
		
		function clearLocaisVotacaoArray() {
			$log.debug("[ZonaInfoCT] Limpado Locais de Votação.");
			self.locaisVotacaoArray = [];
		}

		function calcFilterCounter() {
			self.filterCounter = 0;
			angular.forEach(self.secoesInfoArray, function(secaoInfo) {
				if (SecaoInfoFilterSV.isFiltered(secaoInfo)) {
					self.filterCounter++;
				}
			});
		}
		
		/**
		function _enableNotification(flag) {
			$scope.acompInfoCT.notificationGlobalEnabled = flag;
		}*/

		/**
		 * Exibe o Sidenav de Filtro de Seções.
		 */
		function toggleSidenavFiltrarSecoes() {
			SidenavSV.setTitle("Filtro de Seções");
			SidenavSV.setSubtitle("Selecione os filtros abaixo");
			SidenavSV.setVisibleId("filtro_secoes_id");
			SidenavSV.toggle();
		}

		function getSecaoHeader() {
			if (SecaoInfoFilterSV.getMunicipioId() != 0) {
				return 'SEÇÕES do MUNICÍPIO: ' + SidenavSV.getContext().mu.nomeMunicipio;
			}
			if (SecaoInfoFilterSV.getPontoTransmissaoId() != 0) {
				return 'SEÇÕES do PONTO DE TRANSMISSÃO: ' + SidenavSV.getContext().pt.nomePontoTransmissao;
			}
			
			if (SecaoInfoFilterSV.getLocalVotacaoId() != 0) {
				return 'SEÇÕES do LOCAL DE VOTAÇÃO: ' + SidenavSV.getContext().lv.nome;
			}
			return 'SEÇÕES da ZONA: ' + self.zonaInfo.numeroZona + 'ª ' + self.zonaInfo.nomeMunicipio;
		}

		function resetSecoesFiltradas() {
			SecaoInfoFilterSV.setMunicipioId(0);
			SecaoInfoFilterSV.setPontoTransmissaoId(0);
			SecaoInfoFilterSV.setLocalVotacaoId(0);
			SecaoInfoFilterSV.filterOptions['A'] = true;
			SecaoInfoFilterSV.filterOptions['B'] = true;
			SecaoInfoFilterSV.filterOptions['C'] = true;
			SecaoInfoFilterSV.filterOptions['D'] = true;
			SecaoInfoFilterSV.filterOptions['E'] = true;
			calcFilterCounter();
		}

		function showTodasSecoesLink() {
			return SecaoInfoFilterSV.getMunicipioId() == 0 && SecaoInfoFilterSV.getPontoTransmissaoId() == 0 &&  SecaoInfoFilterSV.getLocalVotacaoId() == 0;
		}

		function _calcCountQtdPontosTransmissao() {
			self.countQtdPontosTransmissao = Object.keys(self.zonaInfo.pontosTransmissaoInfo).length;
		}

		function isSecaoInfoFiltered(secaoInfo) {
			return SecaoInfoFilterSV.isFiltered(secaoInfo);
		}

		function getSelectedPontoTransmissaoId() {
			return SecaoInfoFilterSV.getPontoTransmissaoId();
		}

		function getSelectedMunicipioId() {
			return SecaoInfoFilterSV.getMunicipioId();
		}
		
		function getSelectedLocalVotacaoId() {
			return SecaoInfoFilterSV.getLocalVotacaoId();
		}

		/**
		 * Exibe o Sidenav com Opções dos Municipios
		 */
		function toggleSidenavOpcoesMunicipios(municipioSelected) {
			SidenavSV.setContext({
				mu : municipioSelected
			});
			SecaoInfoFilterSV.setPontoTransmissaoId(0);
			SecaoInfoFilterSV.setMunicipioId(municipioSelected.idMunicipio);
			SidenavSV.setTitle("Opções do Municipio");
			SidenavSV.setSubtitle(municipioSelected.nomeMunicipio);
			SidenavSV.setVisibleId("opcoes_municipio_id");
			// SidenavSV.toggle();
			calcFilterCounter();
		}
		
		
		function toggleSidenavOpcoesLocaisVotacao(locaisVotacaoSelected) {
			SidenavSV.setContext({
				lv : locaisVotacaoSelected
			});
			SecaoInfoFilterSV.setLocalVotacaoId(locaisVotacaoSelected.id);
			SecaoInfoFilterSV.setPontoTransmissaoId(0);
			SecaoInfoFilterSV.setMunicipioId(0);
			calcFilterCounter();
		}
		

		/**
		 * Exibe o Sidenav com Opções da Zona
		 */
		function toggleSidenavOpcoesZona() {
			SidenavSV.setContext({
				ze : self.zonaInfo
			});
			SecaoInfoFilterSV.setMunicipioId(0);
			SecaoInfoFilterSV.setPontoTransmissaoId(0);
			SidenavSV.setTitle("Opções da Zona");
			SidenavSV.setSubtitle(self.zonaInfo.numeroZona + "ª - " + self.zonaInfo.nomeMunicipio);
			SidenavSV.setVisibleId("opcoes_zona_id");
			SidenavSV.toggle();
			calcFilterCounter();
		}

		/**
		 * Exibe o Sidenav de Opções de Pontos de Transmissão. Passa como
		 * parâmentro o ponto de transmissão selecionado.
		 */
		function toggleSidenavOpcoesPontoTransmissao(pontoTransmissaoSelected) {
			SidenavSV.setContext({
				pt : pontoTransmissaoSelected
			});
			SecaoInfoFilterSV.setMunicipioId(0);
			SecaoInfoFilterSV.setPontoTransmissaoId(SidenavSV.getContext().pt.idPontoTranmissao);
			// SecaoInfoFilterSV.setPontoTransmissaoId(pontoTransmissaoSelected.idPontoTranmissao);
			// SecaoInfoFilterSV.setMunicipioId(0);
			SidenavSV.setTitle("Opções do Ponto");
			SidenavSV.setSubtitle(pontoTransmissaoSelected.nomePontoTransmissao);
			SidenavSV.setVisibleId("opcoes_ponto_transmissao_id");
			SidenavSV.toggle();
			calcFilterCounter();
		}

		/**
		 * Exibe o dialog de pendencias.
		 */
		function showDialogPendenciasSecao(secaoInfo) {
			var parentEl = angular.element(document.body);
			SecaoSV.setContext({
				se : secaoInfo
			});
			$scope.acompInfoCT.saveStateAndDisableNotification();
			//_enableNotification(false);
			$mdDialog.show({
				parent : parentEl,
				openFrom : angular.element(document.querySelector('#secao_' + secaoInfo.idSecao + '_id')),
				closeTo : angular.element(document.querySelector('#secao_' + secaoInfo.idSecao + '_id')),
				templateUrl : 'partials/dialogs/pendencias.secao.dlg.html',
				clickOutsideToClose : true,
				fullscreen : true,
				autoWrap : false,
				onRemoving : function() {
					$scope.acompInfoCT.enableNotification()
				},
				controller : 'PendenciasSecaoDlgCT',
				controllerAs : 'pendenciasSecaoDlgCT'
			});
		}

		/**
		 * Exibe/Esconde as legendas das seções.
		 */
		function toggleLegendaSecoes() {
			self.legendaSecoes = !self.legendaSecoes;
		}

		function resetFiltros() {
			self.secoesInfoArray = [];
			angular.forEach(self.zonaInfo.secoesInfo, function(secaoInfo, idSecao) {
				self.visibleSecoes[idSecao] = true;
				self.secoesInfoArray.push(secaoInfo);
			});
			calcFilterCounter();
		}

		function _updateCallback() {
			$log.debug('[ZonaInfoCT] updateCallback');
			var refreshZonaInfo = AcompInfoSV.resource.zonas({
				id : $routeParams.idze
			}, function() {
				_updateZonaInfo(refreshZonaInfo);
				_updatePontosTransmissaoInfo(refreshZonaInfo);
				_updateSecoesInfo(refreshZonaInfo);
				calcFilterCounter();
			});
			_updateLocaisVotacao();
		}
		
		function _updateLocaisVotacao() {
			if(self.locaisVotacaoArray.length > 0) {
				$log.debug('[ZonaInfoCT] Iniciando atualização dos Locais de Votação.');
				var locaisVotacaoInfo = LocalVotacaoSV.resource.localvotacao({
					id: self.zonaInfo.numeroZona
				}, function() {
					angular.forEach(self.locaisVotacaoArray, function(lv) {
						lv.qtdSecoesTotalizadas = locaisVotacaoInfo[lv.id].qtdSecoesTotalizadas;
						lv.percTotalSecoesTotalizadas = locaisVotacaoInfo[lv.id].percTotalSecoesTotalizadas;
					});
				})
			}
		}

		/**
		 * Método responsável por atualizar o ZonaInfo
		 */
		function _updateZonaInfo(refreshZonaInfo) {
			self.zonaInfo.qntSecoesTotalizadas = refreshZonaInfo.qntSecoesTotalizadas;
			self.zonaInfo.qntSecoesPendentes = refreshZonaInfo.qntSecoesPendentes;
			self.zonaInfo.qntSecoesNaoRecebida = refreshZonaInfo.qntSecoesNaoRecebida;
			self.zonaInfo.qntSecoesNaoTotalizada = refreshZonaInfo.qntSecoesNaoTotalizada;
			self.zonaInfo.qntSecoesRecebida = refreshZonaInfo.qntSecoesRecebida;
			self.zonaInfo.percTotalSecoesTotalizadas = refreshZonaInfo.percTotalSecoesTotalizadas;
			self.zonaInfo.qntPontosTransmissaoNaoTotalizada = refreshZonaInfo.qntPontosTransmissaoNaoTotalizada;
			self.zonaInfo.qntPontosTransmissaoTotalizadas = refreshZonaInfo.qntPontosTransmissaoTotalizadas;
			self.zonaInfo.percPontosTransmissaoTotalizadas = refreshZonaInfo.percPontosTransmissaoTotalizadas;
			self.zonaInfo.qntPontosTransmissaoConectadosHoje = refreshZonaInfo.qntPontosTransmissaoConectadosHoje;
			self.zonaInfo.qntPontosTransmissaoOnline = refreshZonaInfo.qntPontosTransmissaoOnline;
			self.zonaInfo.qntOcorrencias = refreshZonaInfo.qntOcorrencias;
		}

		function _updatePontosTransmissaoInfo(refreshZonaInfo) {
			angular
					.forEach(
							refreshZonaInfo.pontosTransmissaoInfo,
							function(pontoTransmissaoInfo, idPonto) {
								self.zonaInfo.pontosTransmissaoInfo[idPonto].qntSecoesTotalizadas = refreshZonaInfo.pontosTransmissaoInfo[idPonto].qntSecoesTotalizadas;
								self.zonaInfo.pontosTransmissaoInfo[idPonto].percSecoesTotalizadas = refreshZonaInfo.pontosTransmissaoInfo[idPonto].percSecoesTotalizadas;
								self.zonaInfo.pontosTransmissaoInfo[idPonto].conectadoHoje = refreshZonaInfo.pontosTransmissaoInfo[idPonto].conectadoHoje;
								self.zonaInfo.pontosTransmissaoInfo[idPonto].online = refreshZonaInfo.pontosTransmissaoInfo[idPonto].online;
							});
		}

		function _updateSecoesInfo(refreshZonaInfo) {
			angular.forEach(refreshZonaInfo.secoesInfo, function(secaoInfo, idSecao) {
				self.zonaInfo.secoesInfo[idSecao].situacao = refreshZonaInfo.secoesInfo[idSecao].situacao;
			});
		}

		/**
		 * Realiza a requisição REST da zona especifica.
		 */
		function _init() {
			resetSecoesFiltradas();
			self.zonaInfo = AcompInfoSV.resource.zonas({
				id : $routeParams.idze
			}, function() {
				// Inicializa o filtro de seções.
				angular.forEach(self.zonaInfo.secoesInfo, function(secaoInfo, idSecao) {
					self.visibleSecoes[idSecao] = true;
					self.secoesInfoArray.push(secaoInfo);
				});
				_calcCountQtdPontosTransmissao();
				calcFilterCounter();
			});
		}

	}
})();