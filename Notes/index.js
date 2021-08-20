Parse.initialize(config.APP_ID, config.JAVASCRIPT_KEY); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = config.SERVER_URL

if (!Parse.User.current()) {
    window.location.href = "file:///C:/Users/alden/Programs/notesweb/Login/index.html";
}

function appendNote(title, body, isPinned, i) {
    let divToAppend = $("<div />", { html: '<p class="note-title-notes">' + title + '</p><p class="note-body-notes">' + body + '</p>' }).addClass("card-display-note")
    if (i % 2 === 1) {
        divToAppend.appendTo("#pinned-notes-1")
    } else {
        divToAppend.appendTo("#pinned-notes-2")
    }
}

appendNote("sagsfdgh", "fasfgefh", true, 1)
appendNote("sags fpsg gggg gggg gggz fdgh", "fasgiuoaaaa aaaaa  aaaaaalm mmf gefh", true, 2)

// console.log(Parse.User.current().get("username"))

let newNoteOpen = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openDialog() {
    // Showing popup
    $("#add-note-dialog-notes").css("display", "block")
    // Function used to asynchronously show animation
    sleep(0).then(() => {
        $("#card-dialog").addClass("show");
        $("#add-note-dialog-notes").addClass("show");
    });
    newNoteOpen = true
}

function closeDialog() {
    $("#card-dialog").removeClass("show");
    $("#add-note-dialog-notes").removeClass("show");
    sleep(500).then(() => {
        $("#add-note-dialog-notes").removeAttr('style')
    });
    newNoteOpen = false
    sleep(0.5).then(() => {
        noteBodyDivPlaceholder.removeClass("hide")
        $("#note-body-notes").text("")
        $("#note-title-notes").val("")
    })

}

function showSnackbar(text) {
    let snackbar = $("#snackbar")
    snackbar.addClass("show")
    snackbar.text(text)
    setTimeout(function () { snackbar.removeClass("show") }, 3000);
}

function saveNote(note) {
    const Note = Parse.Object.extend("Notes");
    const noteObject = new Note();
    noteObject.set("note", note.body);
    noteObject.set("title", note.title);
    noteObject.set("username", Parse.User.current().get("username"));
    noteObject.set("isPinned", note.pinned);
    noteObject.save().then(() => {
        // Successful 
    }, (error) => {
        // If error encountered
        // Showing a snackbar to the user saying that the item was not added
    });
}

function createNote(pinned) {
    let noteBody = $("#note-body-notes").text()
    let noteTitle = $("#note-title-notes").val()
    if (noteTitle === "" && noteBody === "") {
        showSnackbar("Note cannot be empty")
        return
    }
    let note = {
        title: noteTitle,
        body: noteBody,
        pinned: pinned
    }
    saveNote(note)
    closeDialog()
}

// Called when the FloatingActionButton is clicked
$("#fab-add-note").click(function (e) {
    openDialog()
});

let noteBodyDiv = $("#note-body-notes");
let noteBodyDivPlaceholder = $("#note-body-placeholder-notes")

noteBodyDiv.on('input', function () {
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
    sleep(500).then(() => {
        $("#add-note-dialog-notes").removeAttr('style')
        $("#card-dialog").removeAttr('style')
    });
    newNoteOpen = false
    sleep(0.5).then(() => {
        noteBodyDivPlaceholder.removeClass("hide")
        $("#note-body-notes").text("")
        $("#note-title-notes").val("")
    })
})


// Called when save note button is clicked
$("#fab-save-note").on("click", function () {
    createNote(false)
})

// Called when pin note button is pressed
$("#fab-pin-note").on("click", function () {
    createNote(true)
})

// Used to detect back button pressed on mobile devices
$(window).on("navigate", function (event, data) {
    let direction = data.state.direction;
    if (direction == 'back') {
        if (newNoteOpen)
            $("#add-note-dialog-notes").removeAttr('style')
    }
    if (direction == 'forward') {
        // do something else
    }
});