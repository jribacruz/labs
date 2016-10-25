(function() {
	'use strict';

	angular.module("acompMD").factory('SecaoInfoFilterSV', SecaoInfoFilterSV);

	SecaoInfoFilterSV.$inject = [ 'AcompCtx', '$log', '$resource', '$cookies' ];

	/**
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @param $cookies
	 * @returns
	 */
	function SecaoInfoFilterSV(AcompCtx, $log, $resource, $cookies) {
		$log.debug('[SecaoInfoFilterSV] Inicializando... ');

		var filterOptions = {
			'A' : true,
			'B' : true,
			'C' : true,
			'D' : true,
			'E' : true
		}

		var municipioId = 0;

		var pontoTransmissaoId = 0;
		
		var localVotacaoId = 0;

		var service = {
			filterOptions : filterOptions,
			isFiltered : isFiltered,
			setMunicipioId : setMunicipioId,
			getMunicipioId : getMunicipioId,
			setPontoTransmissaoId : setPontoTransmissaoId,
			getPontoTransmissaoId : getPontoTransmissaoId,
			setLocalVotacaoId: setLocalVotacaoId,
			getLocalVotacaoId: getLocalVotacaoId
		}

		function setMunicipioId(_municipioId) {
			municipioId = _municipioId;
		}

		function getMunicipioId() {
			return municipioId;
		}

		function setPontoTransmissaoId(_pontoTransmissaoId) {
			pontoTransmissaoId = _pontoTransmissaoId;
		}

		function getPontoTransmissaoId() {
			return pontoTransmissaoId;
		}
		
		function setLocalVotacaoId(_localVotacaoId) {
			localVotacaoId = _localVotacaoId;
		}

		function getLocalVotacaoId() {
			return localVotacaoId;
		}
		
		function clear() {
			municipioId = 0;
			pontoTransmissaoId = 0;
			localVotacaoId = 0;
		}

		function isFiltered(secaoInfo) {

			var filteredByPontoOrMunicipio = municipioId != 0 || pontoTransmissaoId != 0 || localVotacaoId != 0 ;

			var r_totalizadas = false;
			var r_naoTotalizadas = false;
			var r_pendentes = false;
			var r_recebidas = false;
			var r_naoRecebidas = false;

			if (filterOptions['A']) {
				r_totalizadas = _totalizadas(secaoInfo);
			}

			if (filterOptions['B']) {
				r_naoTotalizadas = _naoTotalizadas(secaoInfo);
			}

			if (filterOptions['C']) {
				r_pendentes = _pendendes(secaoInfo);
			}

			if (filterOptions['D']) {
				r_recebidas = _recebidas(secaoInfo);
			}

			if (filterOptions['E']) {
				r_naoRecebidas = _naoRecebidas(secaoInfo);
			}

			if (filteredByPontoOrMunicipio == false) {
				return r_totalizadas || r_naoTotalizadas || r_pendentes || r_recebidas || r_naoRecebidas;
			}
			if(municipioId != 0) {
				return secaoInfo.idMunicipio == municipioId && (r_totalizadas || r_naoTotalizadas || r_pendentes || r_recebidas || r_naoRecebidas);
			}
			
			if(pontoTransmissaoId != 0) {
				return secaoInfo.idPontoTranmissao == pontoTransmissaoId && (r_totalizadas || r_naoTotalizadas || r_pendentes || r_recebidas || r_naoRecebidas);
			}
			
			if(localVotacaoId != 0) {
				return secaoInfo.idLocalVotacao == localVotacaoId && (r_totalizadas || r_naoTotalizadas || r_pendentes || r_recebidas || r_naoRecebidas);
			}
		}

		function _totalizadas(secaoInfo) {
			return secaoInfo.situacao == 4;
		}

		function _naoTotalizadas(secaoInfo) {
			return secaoInfo.situacao != 4;
		}

		function _pendendes(secaoInfo) {
			return secaoInfo.situacao == 5;
		}

		function _recebidas(secaoInfo) {
			return secaoInfo.situacao == 3;
		}

		function _naoRecebidas(secaoInfo) {
			return secaoInfo.situacao == 1;
		}

		return service;
	}

})();