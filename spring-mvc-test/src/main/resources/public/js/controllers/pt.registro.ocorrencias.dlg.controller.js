(function() {
	'use strict';

	angular.module('acompMD').controller('PTRegistroOcorrenciasDlgCT', PTRegistroOcorrenciasDlgCT);

	PTRegistroOcorrenciasDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SidenavSV', '$mdToast' ];

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
	function PTRegistroOcorrenciasDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SidenavSV, $mdToast) {
		$log.debug('[PTRegistroOcorrenciasDlgCT] Inicializando Controller... SidenaveSV.context.pt: ' + JSON.stringify(SidenavSV.getContext().pt));
		$log.debug('[PTRegistroOcorrenciasDlgCT] Inicializando Controller... SidenaveSV.context: ' + JSON.stringify(SidenavSV.getContext()));
		var self = this;

		self.hide = hide;
		
		self.pontoInfoModel = SidenavSV.getContext().pt;
		
		self.ocorrencia = {
				dtOcorrencia: new Date(),
				descricao: '',
				turnoType: '',
				usuarioOcorrencia: '',
				pontoTransmissao:{
					id: 0
				}
				
		};
		
		self.showDialogOcorrenciaRegistro = showDialogOcorrenciaRegistro;
		
		self.enviar = enviar;

		self.ocorrenciaRegistroVisibilidade = false;
		
		function hide() {
			$mdDialog.hide();
		}
		
		function enviar() {
			AcompInfoSV.resource.ocorrenciaInsert(self.ocorrencia, 
			function(){
				$log.debug('[PTRegistroOcorrenciasDlgCT] Inicializando Controller... self.ocorrencia: ' + JSON.stringify(self.ocorrencia));
				var copia = JSON.parse(JSON.stringify(self.ocorrencia));
				$log.debug('[PTRegistroOcorrenciasDlgCT] Inicializando Controller... copia' + JSON.stringify(copia));
				self.pontoInfoModel.ocorrenciaInfo.push(copia);
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
				self.ocorrencia.pontoTransmissao.id = self.pontoInfoModel.idPontoTranmissao;
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