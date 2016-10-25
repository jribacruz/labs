(function() {
	'use strict';

	angular.module("acompMD").factory('AcompInfoSV', AcompInfoSV);

	AcompInfoSV.$inject = [ 'AcompCtx', '$log', '$resource', '$cookies' ];

	/**
	 * Service responsável pelo serviço REST da tela inicial do acompanhamento
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function AcompInfoSV(AcompCtx, $log, $resource, $cookies) {
		$log.debug('[AcompInfoSV] Inicializando... ');

		var api = {
			zonas : {
				method : 'GET',
				url : AcompCtx.URL_ROOT + '/services/zonas/:id',
				isArray : false,
				params : {
					t : $cookies.get('t')
				}
			},
			ocorrencias: {
				method : 'GET',
				url : AcompCtx.URL_ROOT + '/services/zonas/:id/ocorrencias',
				isArray : false,
				params : {
					t : $cookies.get('t')
				}
			},
			ocorrenciaInsert: {
				method : 'POST',
				url : AcompCtx.URL_ROOT + '/services/zonas/ocorrencia'
			},
			pontosconectadoshoje : {
				method : 'GET',
				url : AcompCtx.URL_ROOT + '/services/zonas/:id/pontosconectadoshoje',
				isArray : true,
				params : {
					t : $cookies.get('t')
				}
			},
			pontosonline : {
				method : 'GET',
				url : AcompCtx.URL_ROOT + '/services/zonas/:id/pontosonline',
				isArray : true,
				params : {
					t : $cookies.get('t')
				}
			}
		}

		var resource = $resource(AcompCtx.URL_ROOT + '/services/zonas/:id', {
			id : '@id'
		}, api);

		var service = {
			resource : resource
		}

		return service;
	}

})();