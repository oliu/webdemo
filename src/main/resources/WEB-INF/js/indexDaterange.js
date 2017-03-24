var Index = function () {
    return {
    	  initDaterange: function () {
              $('#dashboard-report-range').daterangepicker({
                  ranges: {
                      '过去 7 天': [Date.today().add({days: -6}), 'today'],
                      '过去 30 天': [Date.today().add({days: -29}), 'today'],
                      '这个月': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                      '上个月': [Date.today().moveToFirstDayOfMonth().add({
                              months: -1
                          }), Date.today().moveToFirstDayOfMonth().add({
                              days: -1
                          })]
                  },
                  opens: (App.isRTL() ? 'right' : 'left'),
                  format: 'MM/dd/yyyy',
                  separator: ' to ',
                  startDate: Date.today().add({
                      days: -29
                  }),
                  endDate: Date.today(),
                  minDate: '09/09/2014',
                  locale: {
                      applyLabel: '提交',
                      fromLabel: '从',
                      toLabel: '到',
                      customRangeLabel: '自定义日期范围',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  },
                  showWeekNumbers: true,
                  buttonClasses: ['btn-danger']
              },

              function (start, end) {
                  App.blockUI(jQuery("#dashboard"));
                  setTimeout(function () {
                      App.unblockUI(jQuery("#dashboard"));
                      App.scrollTo();
                  }, 1000);
                  $('#dashboard-report-range span').html(start.toString('MM/dd/yyyy') + ' - ' + end.toString('MM/dd/yyyy'));
                  var resultSysBaseDataList=""
                      $.ajax({
                          type:'post',
                          url:'./././searchCountData?startTime=' +start.toString('yyyyMMdd') + '&endTime=' + end.toString('yyyyMMdd'),
                          dataType:'json',
                          beforeSend:function(){
                              $("#resultSysBaseData span").empty();
                          } ,
                          success:function(map){
                              $(map).each(function(){
                            	  resultSysBaseDataList+="从 "+start.toString('yyyy-MM-dd')+" 到 "+end.toString('yyyy-MM-dd')+"&nbsp;&nbsp;&nbsp;用户猜题数："+this.memberGuessSum+"&nbsp;&nbsp;&nbsp;官方猜题数："+this.officialGuessSum+"&nbsp;&nbsp;&nbsp;评论数："+this.commentSum+"&nbsp;&nbsp;&nbsp;普通答题数："+this.guessOptionSum+"&nbsp;&nbsp;&nbsp;验证答题数："+this.validGuessOptionSum+"&nbsp;&nbsp;&nbsp;新增用户数："+this.newMemberSum+"&nbsp;&nbsp;&nbsp;活跃用户数："+this.loginMemberSum
                              });

                              if(resultSysBaseDataList!=""){
                            	  $("#resultSysBaseData span").html(resultSysBaseDataList);
                              }else{
                            	  $("#resultSysBaseData span").html("没有记录");
                              }
                          },
                          error:function(){
                          }
                      })
              });

              $('#dashboard-report-range').show();

              $('#dashboard-report-range span').html(Date.today().add({
                  days: -29
              }).toString('MM/dd/yyyy') + ' - ' + Date.today().toString('MM/dd/yyyy'));
          },
    };

}();