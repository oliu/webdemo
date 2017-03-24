var TableAdvanced = function() {
	var initTable1 = function() {
		/* Formating function for row details */
		function fnFormatDetails(oTable, nTr) {
			var aData = oTable.fnGetData(nTr);
			var sOut = '<table>';
			sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
			sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
			sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
			sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
			sOut += '</table>';
			return sOut;
		}
		/*
		 * Insert a 'details' column to the table
		 */
		var nCloneTh = document.createElement('th');
		var nCloneTd = document.createElement('td');
		nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

		jQuery('#sample_1_wrapper .dataTables_filter input').addClass(
				"m-wrap small"); // modify table search input
		jQuery('#sample_1_wrapper .dataTables_length select').addClass(
				"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown

		/*
		 * Add event listener for opening and closing details Note that the
		 * indicator for showing which row is open is not controlled by
		 * DataTables, rather it is done here
		 */
		jQuery('#sample_1 .group-checkable').change(function() {
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			jQuery(set).each(function() {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
			jQuery.uniform.update(set);
		});
	};
	
	var initTable11 = function() {
		/* Formating function for row details */
		function fnFormatDetails(oTable, nTr) {
			var aData = oTable.fnGetData(nTr);
			var sOut = '<table>';
			sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
			sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
			sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
			sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
			sOut += '</table>';
			return sOut;
		}
		/*
		 * Insert a 'details' column to the table
		 */
		var nCloneTh = document.createElement('th');
		var nCloneTd = document.createElement('td');
		nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

		/*
		 * Initialse DataTables, with no sorting on the 'details' column
		 */
		var oTable = $('#sample_11').dataTable(
				{
					"aoColumnDefs" : [ {
						'bSortable' : false,
						"aTargets" : [ 0 ]
					} ],
					"aaSorting" : [ [ 1, 'desc' ] ],
					"aLengthMenu" : [ [ 20, 50, 100, -1 ],
							['20条记录', '50条记录', '100条记录', '所有记录' ] // change
					// per
					// page
					// values
					// here
					],
					// set the initial value
					"iDisplayLength" : 20,
					"oLanguage" : {
						"sProcessing" : "正在加载中......",
						"sLengthMenu" : " _MENU_ ",
						"sZeroRecords" : "对不起，查询不到相关数据！",
						"sEmptyTable" : "表中无数据存在！",
						"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
						"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
						"sSearch" : "搜索",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "上一页",
							"sNext" : "下一页",
							"sLast" : "末页"
						}
					}
				});

		jQuery('#sample_11_wrapper .dataTables_filter input').addClass(
				"m-wrap small"); // modify table search input
		jQuery('#sample_11_wrapper .dataTables_length select').addClass(
				"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_11_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown

		/*
		 * Add event listener for opening and closing details Note that the
		 * indicator for showing which row is open is not controlled by
		 * DataTables, rather it is done here
		 */
		jQuery('#sample_11 .group-checkable').change(function() {
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			jQuery(set).each(function() {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
			jQuery.uniform.update(set);
		});
		$('#sample_11_column_toggler input[type="checkbox"]').change(function() {
			/*
			 * Get the DataTables object again - this is not a recreation, just
			 * a get of the object
			 */
			var iCol = parseInt($(this).attr("data-column"));
			var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
			oTable.fnSetColumnVis(iCol, (bVis ? false : true));
		});
	};

	var initTable22 = function() {
		/* Formating function for row details */
		function fnFormatDetails(oTable, nTr) {
			var aData = oTable.fnGetData(nTr);
			var sOut = '<table>';
			sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
			sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
			sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
			sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
			sOut += '</table>';
			return sOut;
		}
		/*
		 * Insert a 'details' column to the table
		 */
		var nCloneTh = document.createElement('th');
		var nCloneTd = document.createElement('td');
		nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

		jQuery('#sample_22_wrapper .dataTables_filter input').addClass(
			"m-wrap small"); // modify table search input
		jQuery('#sample_22_wrapper .dataTables_length select').addClass(
			"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_22_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown

		/*
		 * Add event listener for opening and closing details Note that the
		 * indicator for showing which row is open is not controlled by
		 * DataTables, rather it is done here
		 */
		jQuery('#sample_22 .group-checkable').change(function() {
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			jQuery(set).each(function() {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
			jQuery.uniform.update(set);
		});
	};

	var initTable2 = function() {
		var oTable = $('#sample_2').dataTable(
				{
					"aoColumnDefs" : [ {
						"aTargets" : [ 0 ]
					} ],
					"aaSorting" : [ [ 0, 'desc' ] ],
					"aLengthMenu" : [ [20, 50, 100, -1 ],
							['20条记录', '50条记录', '100条记录', '所有记录' ] // change
					// per
					// page
					// values
					// here
					],
					"bRetrieve":true,
					// set the initial value
					"iDisplayLength" : 20,
					"oLanguage" : {
						"sProcessing" : "正在加载中......",
						"sLengthMenu" : " _MENU_ ",
						"sZeroRecords" : "对不起，查询不到相关数据！",
						"sEmptyTable" : "表中无数据存在！",
						"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
						"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
						"sSearch" : "搜索",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "上一页",
							"sNext" : "下一页",
							"sLast" : "末页"
						}
					}
				});

		jQuery('#sample_2_wrapper .dataTables_filter input').addClass(
				"m-wrap small"); // modify table search input
		jQuery('#sample_2_wrapper .dataTables_length select').addClass(
				"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown

		$('#sample_2_column_toggler input[type="checkbox"]').change(function() {
			/*
			 * Get the DataTables object again - this is not a recreation, just
			 * a get of the object
			 */
			var iCol = parseInt($(this).attr("data-column"));
			var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
			oTable.fnSetColumnVis(iCol, (bVis ? false : true));
		});
	};
	var initTable3 = function() {
		var oTable = $('#sample_3').dataTable(
				{
					"aoColumnDefs" : [ {
						"aTargets" : [ 0 ]
					} ],
					"aaSorting" : [ [ 0, 'desc' ] ],
					"aLengthMenu" : [ [20, 50, 100, -1 ],
					                  ['20条记录', '50条记录', '100条记录', '所有记录' ] // change
					// per
					// page
					// values
					// here
					],
					// set the initial value
					"iDisplayLength" : 20,
					"oLanguage" : {
						"sProcessing" : "正在加载中......",
						"sLengthMenu" : " _MENU_ ",
						"sZeroRecords" : "对不起，查询不到相关数据！",
						"sEmptyTable" : "表中无数据存在！",
						"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
						"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
						"sSearch" : "搜索",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "上一页",
							"sNext" : "下一页",
							"sLast" : "末页"
						}
					}
				});
		
		jQuery('#sample_3_wrapper .dataTables_filter input').addClass(
		"m-wrap small"); // modify table search input
		jQuery('#sample_3_wrapper .dataTables_length select').addClass(
		"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_3_wrapper .dataTables_length select').select2(); // initialzie
		
		$('#sample_3_column_toggler input[type="checkbox"]').change(function() {
			var iCol = parseInt($(this).attr("data-column"));
			var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
			oTable.fnSetColumnVis(iCol, (bVis ? false : true));
		});
	};
	var initTable4 = function() {
		var oTable = $('#sample_4').dataTable(
				{
					"aoColumnDefs" : [ {
						"aTargets" : [ 0 ]
					} ],
					"aaSorting" : [ [ 0, 'desc' ] ],
					"aLengthMenu" : [ [20, 50, 100, -1 ],
							['20条记录', '50条记录', '100条记录', '所有记录' ] // change
					// per
					// page
					// values
					// here
					],
					// set the initial value
					"iDisplayLength" : 20,
					"oLanguage" : {
						"sProcessing" : "正在加载中......",
						"sLengthMenu" : " _MENU_ ",
						"sZeroRecords" : "对不起，查询不到相关数据！",
						"sEmptyTable" : "表中无数据存在！",
						"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
						"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
						"sSearch" : "搜索",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "上一页",
							"sNext" : "下一页",
							"sLast" : "末页"
						}
					}
				});

		jQuery('#sample_4_wrapper .dataTables_filter input').addClass(
				"m-wrap small"); // modify table search input
		jQuery('#sample_4_wrapper .dataTables_length select').addClass(
				"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_4_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown

		$('#sample_4_column_toggler input[type="checkbox"]').change(function() {
			/*
			 * Get the DataTables object again - this is not a recreation, just
			 * a get of the object
			 */
			var iCol = parseInt($(this).attr("data-column"));
			var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
			oTable.fnSetColumnVis(iCol, (bVis ? false : true));
		});
	};
	var initTable5 = function() {
		
		jQuery('#sample_5_wrapper .dataTables_filter input').addClass(
		"m-wrap small"); // modify table search input
		jQuery('#sample_5_wrapper .dataTables_length select').addClass(
		"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_5_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown
	};
	var initTable6 = function() {
		
		jQuery('#sample_6_wrapper .dataTables_filter input').addClass(
		"m-wrap small"); // modify table search input
		jQuery('#sample_6_wrapper .dataTables_length select').addClass(
		"m-wrap small"); // modify table per page dropdown
		jQuery('#sample_6_wrapper .dataTables_length select').select2(); // initialzie
		// select2
		// dropdown
	};
	return {

		// main function to initiate the module
		init : function() {
			if (!jQuery().dataTable) {
				return;
			}
			initTable1();
			initTable2();
			initTable3();
			initTable4();
			initTable5();
			initTable11();
			initTable22();
		}
	};
}();