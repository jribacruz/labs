(function() {
	'use strict';

	angular.module("acompMD").factory('HighchartSV', HighchartSV);

	HighchartSV.$inject = [ 'AcompCtx', '$log', '$resource' ];

	function HighchartSV(AcompCtx, $log, $resource) {
		$log.debug('[HighchartSV] Inicializando... ');

		var highchart;
		
		var nomeMunicipioByNumZona = {};

		var service = {
			init : init,
			updateData : updateData,
			setTitle : setTitle
		}

		/**
		 * Opções do gráfico highchart
		 */
		var options = {
			chart : {
				renderTo : 'highchart_container_id',
				type : 'column',
				backgroundColor : '#f9f9f9'
			},
			title : {
				text : 'Total Apurado: 0 seções de 0'
			},
			subtitle : {
				text : 'Gráfico Percentual de Seções Totalizadas por Zona'
			},
			yAxis : {
				min : 0,
				max : 100,
				title : {
					text : null
				},
				tickInterval : 25
			},
			xAxis : {
				type : 'category',
				title : {
					text : null
				},
				labels : {
					rotation : -70,
					style : {
						fontSize : '10px'
					}
				},
				tickInterval : 1
			},
			legend : {
				enabled : false
			},
			plotOptions : {

			},
			tooltip : {
				formatter : function() {
					//console.log(this.point.name)
					return '<b>' + this.point.name + ' ZE - '+ nomeMunicipioByNumZona[this.point.name] +' </b> <br/>Percentual apurado: <b>' + this.y + '%</b>';
				}
			},
			series : [ {
				data : [],
				zones : [ {
					value : 100,
					color : 'rgba(255, 152, 0, 1)'
				}, {
					color : 'rgba(3, 169, 244, 1)'
				} ]
			} ]
		}

		/**
		 * Inicializa o highchart.
		 */
		function init(zonasInfo) {
			options.series[0].data = transformZonaInfoIntoHighchartData(zonasInfo);
			highchart = new Highcharts.Chart(options);
			$log.debug('[HighchartSV] Highchart inicializado...');
		}

		function setTitle(title) {
			highchart.setTitle({
				text : title
			});
		}

		/**
		 * Atualiza os dados do highchart.
		 */
		function updateData(zonasInfo) {
			highchart.series[0].setData(transformZonaInfoIntoHighchartData(zonasInfo));
		}

		function transformZonaInfoIntoHighchartData(zonasInfo) {
			var highchartData = [];
			angular.forEach(zonasInfo, function(zonaInfo, idZona) {
				highchartData.push([ zonaInfo.numeroZona + 'ª', zonaInfo.percTotalSecoesTotalizadas ]);
				nomeMunicipioByNumZona[zonaInfo.numeroZona+'ª'] = zonaInfo.nomeMunicipio;
			});
			return highchartData;
		}

		return service;
	}

})();