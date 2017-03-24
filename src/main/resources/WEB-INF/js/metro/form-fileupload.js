var FormFileUpload = function () {


    return {
        //main function to initiate the module
        init: function () {

            // Initialize the jQuery File Upload widget:

            // Load existing files:
            // Demo settings:
            $.ajax({
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
                url: $('#fileupload').fileupload('option', 'url'),
                dataType: 'json',
                context: $('#fileupload')[0],
                maxFileSize: 5000000,
                process: [{
                        action: 'load',
                        maxFileSize: 20000000 // 20MB
                    }, {
                        action: 'resize',
                        maxWidth: 1440,
                        maxHeight: 900
                    }, {
                        action: 'save'
                    }
                ]
            }).done(function (result) {
                $(this).fileupload('option', 'done')
                    .call(this, null, {
                    result: result
                });
            });

            // initialize uniform checkboxes  
            App.initUniform('.fileupload-toggle-checkbox');
        }

    };

}();