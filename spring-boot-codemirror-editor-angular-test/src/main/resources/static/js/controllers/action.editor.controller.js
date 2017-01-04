(function() {
	'use strict';

	angular.module('editorMD').controller('ActionEditorCT', ActionEditorCT);

	ActionEditorCT.$inject = [ '$scope', '$log' ];

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
	function ActionEditorCT($scope, $log) {
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
				  value: "function myScript(){\n\treturn 100;\n}\n",
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
			var fn = new Function('templates',editors['fnExecute'].getValue());
			var afn = angular.bind(this, fn, templates);
			afn();
		}
	}
})();
