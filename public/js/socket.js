$(document).ready(function() {

    var socket = io.connect();

    $(".interact").submit("click", function(e) {
        var form = $(this);
        e.preventDefault();
        if ($(".input").val().length !== 0) {
            socket.emit('message', {
                msg: $(".input").val(),
                group: form.data('id')
            });
        }
        $(".input").val("");
    });

    socket.on('message', function(message) {
        $(".messages").append("<div class='other'>" + message.msg + "</div>");
        scrollToBottom();
    });
});

function scrollToBottom() {
    var div = $('.messages');
    div.scrollTop(div.prop("scrollHeight") - div.height());
}
