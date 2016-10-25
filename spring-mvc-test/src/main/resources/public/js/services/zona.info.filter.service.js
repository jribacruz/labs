(function() {
	'use strict';

	angular.module("acompMD").factory('ZonaInfoFilterSV', ZonaInfoFilterSV);

	ZonaInfoFilterSV.$inject = [ 'AcompCtx', '$log', '$resource', '$cookies' ];

	/**
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @param $cookies
	 * @returns
	 */
	function ZonaInfoFilterSV(AcompCtx, $log, $resource, $cookies) {
		$log.debug('[ZonaInfoFilterSV] Inicializando... ');

		var zonasInfo = {};

		var filterOptions = {
			group1 : 'A'
		};

		var visibleZonas = {};
		
		var selectAll = true;

		var filterOptionsMap = {
			'A' : {
				fn : _todasAsZonas,
				label : 'Todas as Zonas Eleitorais'
			},
			'B' : {
				fn : _zonasNaoIniciadas,
				label : 'Zonas Eleitorais NÃO iniciadas'
			},
			'C' : {
				fn : _zonasNaoConcluidas,
				label : 'Zonas Eleitorais NÃO concluídas'
			},
			'D' : {
				fn : _zonasConcluidas,
				label : 'Zonas Eleitorais concluídas'
			},
			'E' : {
				fn : _zonasComPTNaoIniciadas,
				label : 'Zonas Eleitorais com pontos NÃO iniciadas'
			},
			'F' : {
				fn : _zonasComPTNaoConcluidos,
				label : 'Zonas Eleitorais com pontos NÃO concluídos'
			},
			'G' : {
				fn : _zonasComPTConcluidos,
				label : 'Zonas Eleitorais COM pontos concluídos'
			},
			'H' : {
				fn : _zonasComPT,
				label : 'Zonas Eleitorais COM pontos'
			},
			'I' : {
				fn : _zonasComPTSemConexaoHj,
				label : 'Zonas Eleitorais com pontos SEM conexão hoje'
			},
			'J' : {
				fn : _zonasComPTComConexaoHj,
				label : 'Zonas Eleitorais com pontos COM conexão hoje'
			},
			'L': {
				fn : _zonasComPTBGANSemConexaoHj,
				label : 'Zonas Eleitorais com pontos BGAN SEM conexão hoje'
			},
			'M': {
				fn : _zonasComPTJECSemConexaoHj,
				label : 'Zonas Eleitorais com pontos JEC SEM conexão hoje'
			}
		}

		var service = {
			filterOptions : filterOptions,
			initZonasInfo : initZonasInfo,
			isFiltered : isFiltered,
			getFilterLabel : getFilterLabel,
			initVisibleZonas : initVisibleZonas,
			visibleZonas : visibleZonas,
			toggleAll: toggleAll,
			selectAll: selectAll
		}

		function initVisibleZonas(_zonasInfo) {
			$log.debug('[ZonaInfoFilterSV] Inicializado Visible Zonas...');
			angular.forEach(_zonasInfo, function(zonaInfo) {
				visibleZonas[zonaInfo.idZona] = {
					nome : zonaInfo.numeroZona + 'ª ZE - ' + zonaInfo.nomeMunicipio,
					visible : true
				};
			});
		}
		
		function toggleAll() {
			angular.forEach(visibleZonas, function(visibleZona, idZona) {
				visibleZona.visible = selectAll;
			});
		}

		function getFilterLabel() {
			return filterOptionsMap[filterOptions.group1].label;
		}

		function initZonasInfo(_zonasInfo) {
			zonasInfo = _zonasInfo;
		}

		function isFiltered(zonaInfo) {
			var fnFilter = filterOptionsMap[filterOptions.group1].fn;
			return _isVisible(zonaInfo) && fnFilter(zonaInfo);
		}

		function _isVisible(zonaInfo) {
			return visibleZonas[zonaInfo.idZona].visible;
		}

		function _todasAsZonas(zonaInfo) {
			return true;
		}

		function _zonasNaoIniciadas(zonaInfo) {
			return zonaInfo.percTotalSecoesTotalizadas == 0;
		}

		function _zonasNaoConcluidas(zonaInfo) {
			return zonaInfo.percTotalSecoesTotalizadas < 100;
		}

		function _zonasConcluidas(zonaInfo) {
			return zonaInfo.percTotalSecoesTotalizadas == 100;
		}

		function _zonasComPTNaoIniciadas(zonaInfo) {

		}

		function _zonasComPTNaoConcluidos(zonaInfo) {
			return zonaInfo.qntPontosTransmissao > 0 && zonaInfo.percPontosTransmissaoTotalizadas < 100;
		}

		function _zonasComPTConcluidos(zonaInfo) {
			return zonaInfo.qntPontosTransmissao > 0 && zonaInfo.percPontosTransmissaoTotalizadas == 100;
		}

		function _zonasComPT(zonaInfo) {
			return zonaInfo.qntPontosTransmissao > 0;
		}

		function _zonasComPTSemConexaoHj(zonaInfo) {
			return zonaInfo.qntPontosTransmissao > 0 && zonaInfo.qntPontosTransmissaoConectadosHoje < zonaInfo.qntPontosTransmissao;
		}

		function _zonasComPTComConexaoHj(zonaInfo) {
			return zonaInfo.qntPontosTransmissao > 0 && zonaInfo.qntPontosTransmissaoConectadosHoje > 0;
		}
		
		function _zonasComPTBGANSemConexaoHj(zonaInfo) {
			return !zonaInfo.conectadoHojeBgan && zonaInfo.hasBgan;
		}
		
		function _zonasComPTJECSemConexaoHj(zonaInfo) {
			return !zonaInfo.conectadoHojeJec && zonaInfo.hasJec;
		}

		return service;
	}

})();