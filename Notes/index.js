Parse.initialize(config.APP_ID, config.JAVASCRIPT_KEY); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = config.SERVER_URL

if (!Parse.User.current()) {
    window.location.href = config.LOGIN_PATH;
}


var leftPosFixed
var leftPosVariable
var difference
function setVars() {
    leftPosFixed = $(".header-notes-fixed").get(0).getBoundingClientRect().left
    leftPosVariable = $(".header-notes").get(0).getBoundingClientRect().left
    difference = leftPosVariable - leftPosFixed
}
$( window ).on("resize", function() {
    leftPosFixed = $(".header-notes-fixed").get(0).getBoundingClientRect().left
    leftPosVariable = $(".header-notes").get(0).getBoundingClientRect().left
    difference = leftPosVariable - leftPosFixed
})

window.onload = setVars

window.onscroll = function () { scrollFunction() };
// 0.125 * window.innerWidth is 80px in 640px viewport height (Moto G4) and looks good hence 0.125 pr 12.5% of viewport height
function scrollFunction() {
    let bodyTop = $("body").get(0).getBoundingClientRect().top
    let headerTop = $(".header-notes").get(0).getBoundingClientRect().top
    // Length of the "Notes" text from its top to the top of the page and subtracting 12.5% of the viewport's height and subtracting 10 which is the bottom padding of the section 
    let lengthFromTop = Math.abs(bodyTop - headerTop) - (0.125 * window.innerHeight) - 10/* bottom padding of header-section*/
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (scroll > lengthFromTop && scroll < lengthFromTop + (0.125 * window.innerHeight)) {
        let diff = scroll - lengthFromTop
        $(".header-notes").css("font-size", "" + 15/* initial font size i.e. 15vw */ - (((15 - 5.5555556/* final/desired font size i.e. 5.5555556vw */) / (0.125 * window.innerHeight)) * (scroll - lengthFromTop)) + "vw")
        $(".header-notes").css("left", "" + leftPosVariable - ((difference / (0.125 * window.innerHeight)) * diff) + "px")
        $(".header-section-fixed").removeClass("show")
        $(".header-notes").css("visibility", "visible")
    } else if (scroll < lengthFromTop) {
        $(".header-notes").removeAttr('style')
        $(".header-section-fixed").removeClass("show")
        $(".header-notes").css("visibility", "visible")
    } else if (scroll > lengthFromTop + (0.125 * window.innerHeight)) {
        $(".header-notes").css("font-size", "" + 5.55556 + "vw")
        $(".header-notes").css("visibility", "hidden")
        sleep(0).then(() => {
            $(".header-section-fixed").addClass("show")
        })
    }
    // console.log(scroll)
}

function appendNote(title, body, isPinned, i) {
    let divToAppend = $("<div />", { html: '<p class="note-title-notes">' + title + '</p><p class="note-body-notes">' + body + '</p>' }).addClass("card-display-note")
    if (isPinned) {
        if (i % 2 === 1) {
            divToAppend.appendTo("#pinned-notes-1")
        } else {
            divToAppend.appendTo("#pinned-notes-2")
        }
    } else {
        if (i % 2 === 1) {
            divToAppend.appendTo("#other-notes-1")
        } else {
            divToAppend.appendTo("#other-notes-2")
        }
    }
}

appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", true, 1)
appendNote("Title", "Note", true, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)
appendNote("Title", "Note", false, 1)
appendNote("Title", "Note", false, 2)

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