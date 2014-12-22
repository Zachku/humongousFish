$(document).ready(function() {
    $("#dialog").dialog({
        modal: true,
        bgiframe: true,
        width: 500,
        height: 200,
        autoOpen: false
    });


    $("#delete").click(function(e) {

        e.preventDefault();
        var theHREF = $(this).attr("href");

        $("#dialog").dialog('option', 'buttons', {
            "Confirm" : function() {
                window.location.href = theHREF;
            },
            "Cancel" : function() {
                $(this).dialog("close");
            }
        });

        $("#dialog").dialog("open");

    });

});