(function() {
	'use strict';

	angular.module('editorMD').controller('ActionEditorCT', ActionEditorCT);

	ActionEditorCT.$inject = [ '$scope', '$log', 'notificationSV' ];

	/**
	 * 
	 * @param $scope
	 * @param $log
	 * @param ProjectSV
	 * @param $mdDialog
	 * @param $http
	 * @param HttpSV
	 * @returns
	 */
	function ActionEditorCT($scope, $log, notificationSV) {
		$log.debug('[ActionEditorCT] Inicializando...');
		var self = this;

		var editors = {};
		
		self.execute = execute;

		init();
		
		var templates = {
			"daoTemplate" : {
				"content": "<h1>{{data}}</h1>"
			}	
		};

		function init() {
			editors['fnExecute'] = CodeMirror(document.getElementById('fnExecuteEditor'),{
				  value: "$notification.show('Funcionou')",
				  mode:  "javascript",
				  lineNumbers: true,
				  gutters: ["CodeMirror-lint-markers"],
				  lint: true,
				  autoCloseBrackets: true,
				  extraKeys: {"Ctrl-Space": "autocomplete"},
				  matchBrackets: false,
				  theme: 'eclipse',
				  indentUnit: 4
				});
		}
		
		function execute() {
			$log.debug('Executando fn.')
			//notificationSV.show('Teste Fora')
			var $notification = notificationSV;
			var fn = new Function('templates', '$notification',editors['fnExecute'].getValue());
			var afn = angular.bind(this, fn, templates, $notification);
			afn();
		}
	}
})();
