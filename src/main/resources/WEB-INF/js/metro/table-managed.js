var TableManaged = function() {

	return {

		// main function to initiate the module
		init : function() {

			if (!jQuery().dataTable) {
				return;
			}

			// begin first table
			$('#sample_1')
					.dataTable(
							{
								"aLengthMenu" : [
										[ 10, 20, 50, 100, -1 ],
										[ '10条记录', '20条记录', '50条记录', '100条记录',
												'所有记录' ] // change per page
															// values here
								],
								// set the initial value
								"iDisplayLength" : 10,
								"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
								"sPaginationType" : "bootstrap",
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
								},
								"aoColumnDefs" : [ {
									'bSortable' : false,
									'aTargets' : [ 0 ]
								} ]
							});

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

			jQuery('#sample_1_wrapper .dataTables_filter input').addClass(
					"m-wrap medium"); // modify table search input
			jQuery('#sample_1_wrapper .dataTables_length select').addClass(
					"m-wrap small"); // modify table per page dropdown
			// jQuery('#sample_1_wrapper .dataTables_length select').select2();
			// // initialzie select2 dropdown

			// begin second table
			$('#sample_2')
					.dataTable(
							{
								"aLengthMenu" : [ [ 10, 20, 50, -1 ],
										[ 10, 20, 50, "All" ] // change per
																// page values
																// here
								],
								// set the initial value
								"iDisplayLength" : 10,
								"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
								"sPaginationType" : "bootstrap",
								"oLanguage" : {
									"sLengthMenu" : "_MENU_ ",
									"oPaginate" : {
										"sPrevious" : "上一页",
										"sNext" : "下一页",
									},
									"sSearch" : "搜索："
								},
								"aoColumnDefs" : [ {
									'bSortable' : false,
									'aTargets' : [ 0 ]
								} ]
							});

			jQuery('#sample_2 .group-checkable').change(function() {
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

			jQuery('#sample_2_wrapper .dataTables_filter input').addClass(
					"m-wrap small"); // modify table search input
			jQuery('#sample_2_wrapper .dataTables_length select').addClass(
					"m-wrap small"); // modify table per page dropdown
			jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialzie
																				// select2
																				// dropdown

			// begin: third table
			$('#sample_3')
					.dataTable(
							{
								"aLengthMenu" : [ [ 5, 15, 20, -1 ],
										[ 5, 15, 20, "All" ] // change per
																// page values
																// here
								],
								// set the initial value
								"iDisplayLength" : 5,
								"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
								"sPaginationType" : "bootstrap",
								"oLanguage" : {
									"sLengthMenu" : "_MENU_ per page",
									"oPaginate" : {
										"sPrevious" : "Prev",
										"sNext" : "Next"
									}
								},
								"aoColumnDefs" : [ {
									'bSortable' : false,
									'aTargets' : [ 0 ]
								} ]
							});

			jQuery('#sample_3 .group-checkable').change(function() {
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

			jQuery('#sample_3_wrapper .dataTables_filter input').addClass(
					"m-wrap small"); // modify table search input
			jQuery('#sample_3_wrapper .dataTables_length select').addClass(
					"m-wrap small"); // modify table per page dropdown
			jQuery('#sample_3_wrapper .dataTables_length select').select2(); // initialzie
																				// select2
																				// dropdown

		}

	};

}();