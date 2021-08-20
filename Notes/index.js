let newNoteOpen = false

function openDialog() {
    // Showing popup
    $("#add-note-dialog-notes").css("display", "block")
    // Function used to asynchronously show animation
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(0).then(() => {
      $("#card-dialog").addClass("show");
      $("#add-note-dialog-notes").addClass("show");
    });
    newNoteOpen = true
}

function closeDialog() {
    $("#card-dialog").removeClass("show");
    $("#add-note-dialog-notes").removeClass("show");
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(500).then(() => {
      $("#add-note-dialog-notes").css("display", "none")
    });
    newNoteOpen = false
}

function saveNote(note) {

}

// Called when the FloatingActionButton is clicked
$("#fab-add-note").click(function (e) {
    openDialog()
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

$("#fab-close-note").on("click", function () {
    $("#card-dialog").removeClass("show");
    $("#card-dialog").css("transform", "translateY(-500%)")
    $("#add-note-dialog-notes").removeClass("show");
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(500).then(() => {
      $("#add-note-dialog-notes").css("display", "none")
      $("#card-dialog").removeAttr('style')
    });
    newNoteOpen = false
})


// Called when save note button is clicked
$("#fab-save-note").on("click", function () {
    let noteBody = $("#note-body-notes").text()
    let noteTitle = $("#note-title-notes").text()
    let note = {
        title: noteTitle,
        body: noteBody,
        pinned: false
    }
    saveNote(note)
    closeDialog()
})

// Called when pin note button is pressed
$("#fab-pin-note").on("click", function () {
    let noteBody = $("#note-body-notes").text()
    let noteTitle = $("#note-title-notes").text()
    let note = {
        title: noteTitle,
        body: noteBody,
        pinned: true
    }
    saveNote(note)
    closeDialog()
})

// Used to detect back button pressed on mobile devices
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