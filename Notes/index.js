var newNoteOpen = false

$("#fab-add-note").click(function (e) {
    $("#add-note-dialog-notes").css("display", "block")
    newNoteOpen = true
});

$(window).on("navigate", function (event, data) {
    var direction = data.state.direction;
    if (direction == 'back') {
        // do something
    }
    if (direction == 'forward') {
        // do something else
    }
});let newNoteOpen = false

$("#fab-add-note").click(function (e) {
    $("#add-note-dialog-notes").css("display", "block")
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(0).then(() => {
        $("#card-dialog").addClass("show");
        $("#add-note-dialog-notes").addClass("show");
    });
    newNoteOpen = true
});

$(window).on("navigate", function (event, data) {
    let direction = data.state.direction;
    if (direction == 'back') {
        if (newNoteOpen)
            $("#add-note-dialog-notes").css("display", "none")
    }
    if (direction == 'forward') {
        // do something else
    }
});