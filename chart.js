Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.VBox', 'Ext.fx.target.Sprite', 'Ext.window.MessageBox']);

Ext.onReady(function () {

    var radarChart = Ext.create('Ext.chart.Chart', {
			title: 'Radar Chart',
			flex: 1,
			plugins: [Ext.create('Ext.ux.chart.ThresholdLineRange', {
				lines: [{
					position: 'left',
					color: '#000',
					dash: '4,4',
					value: 50,
					width: 3,
					label: {
						text: 'Goal',
						showValue: true
					}
				}],
				ranges: [{
					opacity: 0.1,
					from: 0,
					to: 50,
					color: '#FF0000'
				}, {
					opacity: 0.1,
					from: 50,
					to: 75,
					color: '#FFFF00'
				}, {
					opacity: 0.1,
					from: 75,
					to: 100,
					color: '#00FF00'
				}]
			})],
            style: 'background:#fff',
            animate: true,
            store: store1,
            insetPadding: 20,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
				steps: 4,
				maximum: 100,
                label: {
                    display: true
                }
            }],
			series: [{
				type: 'radar',
				xField: 'name',
				yField: 'data1',
				showInLegend: true,
				showMarkers: true,
				markerConfig: {
					radius: 5,
					size: 5
				},
				style: {
					'stroke-width': 2,
					fill: 'none'
				}
			}]
        });
	var cartesianChart = Ext.create('Ext.chart.Chart', {
			title: 'Cartesian Chart',
			flex: 1,
			plugins: [Ext.create('Ext.ux.chart.ThresholdLineRange', {
				lines: [{
					position: 'left',
					color: '#000',
					value: 30,
					width: 3,
					dash: '4,4',
					label: {
						text: 'Goal',
						showValue: false
					}
				}, {
					position: 'right',
					value: 70,
					color: '#ff0000',
					width: 3,
					label: {
						text: 'Threshold 2'
					}
				}],
				ranges: [{
					opacity: 0.1,
					from: 0,
					to: 70,
					color: '#FF0000'
				}, {
					opacity: 0.1,
					from: 70,
					to: 90,
					color: '#FFFF00'
				}, {
					opacity: 0.1,
					from: 90,
					to: 100,
					color: '#00FF00'
				}]
			})],
            style: 'background:#fff',
            animate: false,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }, {
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
			    },
                title: 'Number of Hits',
                minimum: 0
            }],
			series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
                  }
                },
                label: {
					display: 'insideEnd',
					'text-anchor': 'middle',
					field: 'data1',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
                },
                xField: 'name',
                yField: 'data1'				
            }]
        });
    
	var win = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 550,
        hidden: false,
        maximizable: true,
        title: 'Threshold Line and Range Plugin Charts',
        renderTo: Ext.getBody(),
        layout: {
			type: 'vbox',
			align: 'stretch'
		},
        tbar: [{
            text: 'Save Chart',
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chart.save({
                            type: 'image/png'
                        });
                    }
                });
            }
        }, {
            text: 'Reload Data',
            handler: function() {
                store1.loadData(generateData());
            }
        }],
        items: [radarChart, cartesianChart]
    });
});
