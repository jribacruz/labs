(function() {
	'use strict';

	angular.module('acompMD').controller('OcorrenciaDialogCT', OcorrenciaDialogCT);

	OcorrenciaDialogCT.$inject = [ '$scope', '$log', 'AcompCtx', 'AcompInfoSV', '$mdDialog', 'data', '$cookies', '$mdToast' ];

	/**
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param AcompInfoSV
	 * @param $mdDialog
	 * @param data
	 * @returns
	 */
	function OcorrenciaDialogCT($scope, $log, AcompCtx, AcompInfoSV, $mdDialog, data, $cookies, $mdToast) {
		$log.debug('[OcorrenciaDialogCT] Inicializando Controller. data: ' + JSON.stringify(data));
		var self = this;

		self.hideDialogOcorrencias = hideDialogOcorrencias;

		self.ocorrencias = {};
		
		self.ocorrencia = {
				dtOcorrencia: new Date(),
				descricao: '',
				turnoType: '',
				usuarioOcorrencia: '',
				zona: {
					numero: 0
				}
				
		};
		
		self.showDialogOcorrenciaRegistro = showDialogOcorrenciaRegistro;
		
		self.enviar = enviar;

		self.ocorrenciaRegistroVisibilidade = false;
		
		$scope.$on(AcompCtx.UPDATE_EVENT_ID, _updateCallback);

		_init();

		function hideDialogOcorrencias() {
			$mdDialog.hide();
		}

		function _updateCallback() {
			console.log('[OcorrenciaDialogCT] updateCallback');
		}

		function _init() {
			self.ocorrencias = AcompInfoSV.resource.ocorrencias({
				id : data.numeroZona
			});
			self.ocorrencia = {
					dtOcorrencia: new Date(),
					descricao: '',
					turnoType: '',
					usuarioOcorrencia: '',
					zona: {
						numero: 0
					}
					
			};
		}
		
		function enviar() {
			AcompInfoSV.resource.ocorrenciaInsert(self.ocorrencia, 
			function(){
				var copia = JSON.parse(JSON.stringify(self.ocorrencia));
				self.ocorrencias.ocorrenciaInfo.push(copia);
				_showApplyFeedback('Ocorrência Registrada com sucesso');
				showDialogOcorrenciaRegistro();
			}, 
			function(){
				_showApplyFeedback('Erro ao Registrar Ocorrência tente mais tarde');
			});
		}
		
		function showDialogOcorrenciaRegistro() {
			if (self.ocorrenciaRegistroVisibilidade ) {
				self.ocorrenciaRegistroVisibilidade = false;
			}else {
				self.ocorrenciaRegistroVisibilidade = true;
				self.ocorrencia.descricao = '';
				self.ocorrencia.dtOcorrencia = new Date();
				self.ocorrencia.usuarioOcorrencia = decodeURI($cookies.get('user')).replace(/\++/g, ' ');
				self.ocorrencia.turnoType = decodeURI($cookies.get('t'));
				self.ocorrencia.zona.numero = self.ocorrencias.numeroZona;
				$('#ocorrencia_descricao_id').focus();
			}
			
		}
		
		function _showApplyFeedback(mensagem) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent(mensagem)
		        .position('bottom right')
		        .hideDelay(3000)
		    );
		}
	}
})();