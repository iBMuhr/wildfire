$(document).ready(function() {
    var socket = io.connect();

    $(".new_group_link").on('click', function(e) {
        var old_html = $(this).html();
        var elem = $(this);
        elem.html("<form class='new_group_form'><input type='text' class='new_group_input' placeholder='Title...'></form>");
        $(".new_group_input").focus();
        $(".new_group_form").submit(function(e) {
            e.preventDefault();
            if ($(".new_group_input").val().trim().length == 0) {
                elem.html(old_html);
                return;
            }
            socket.emit("group", {
                title: $(".new_group_input").val().trim()
            });
            $(".new_group_input").val("");
            elem.html(old_html);
        });
    });

    
});