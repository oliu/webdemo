var IndexCharts = function () {
    return {
        //main function to initiate the module
        initCharts: function (guessOfficalQuestionData,guessCustomQuestionData,guessCommentData,guessOptionViewtData) {
            if (!jQuery.plot) {
                return;
            }

            //Interactive Chart
            function chart2() {guessOfficalQuestionData,guessCustomQuestionData,guessCommentData,guessOptionViewtData
                var plot = $.plot($("#chart_2"), [{
                            data: guessOfficalQuestionData,
                            label: "官方猜"
                        }, {
                            data: guessCustomQuestionData,
                            label: "用户猜"
			            }, {
			            	data: guessCommentData,
			            	label: "评论"
				        }, {
				        	data: guessOptionViewtData,
				        	label: "答题"
				        }
                    ], {
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                            opacity: 0.05
                                        }, {
                                            opacity: 0.01
                                        }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136", "#8a2be2"],
                        xaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        },
                        yaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        }
                    });


                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y + 5,
                            left: x + 15,
                            border: '1px solid #333',
                            padding: '4px',
                            color: '#fff',
                            'border-radius': '3px',
                            'background-color': '#333',
                            opacity: 0.80
                        }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_2").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0],
                                y = item.datapoint[1];
                            showTooltip(item.pageX, item.pageY, item.series.label + " 在 " + x + "时 有 " + y+" 条记录");
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            }

            //graph
            chart2();
        },
        
    };

}();