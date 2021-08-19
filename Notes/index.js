let newNoteOpen = false

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

let noteBodyDiv = $("#note-body-notes");
let noteBodyDivPlaceholder = $("#note-body-placeholder-notes")

noteBodyDiv.on('input', function() {
    if (noteBodyDiv.text() !== "") {
        noteBodyDivPlaceholder.addClass("hide")
    } else {
        noteBodyDivPlaceholder.removeClass("hide")
    }
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