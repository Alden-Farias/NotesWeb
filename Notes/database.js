// Function that retrieves all the notes of the current user from the database
function getNotes() {
    const Note = Parse.Object.extend("Notes")
    const query = new Parse.Query(Note);
    query.equalTo("username", Parse.User.current().get("username"));
    query.descending("createdAt")
    query.find().then((notes) => {
        pinnedNotes = []
        otherNotes = []
        notes.forEach(element => {
            const isPinned = element.get("isPinned")
            if (isPinned)
                pinnedNotes.push(element)
            else
                otherNotes.push(element)
        });
        noteViewUpdater()
    }, (error) => {
        showSnackbar(error.message)
    });
}


//
function saveNote(note) {
    const Note = Parse.Object.extend("Notes");
    const noteObject = new Note();
    noteObject.set("note", note.body);
    noteObject.set("title", note.title);
    noteObject.set("username", Parse.User.current().get("username"));
    noteObject.set("isPinned", note.pinned);
    noteObject.save().then((object) => {
        // Successful 
        if (note.pinned) {
            pinnedNotes = [object].concat(pinnedNotes)
        } else {
            otherNotes = [object].concat(otherNotes)
        }
        noteViewUpdater()
    }, (error) => {
        // If error encountered
        // Showing a snackbar to the user saying that the item was not added
    });
}


function updateNote(noteObject, note) {
    const isPinned = noteObject.get("isPinned")
    if (isPinned && !note.pinned) {
        const Note = Parse.Object.extend("Notes");
        const newNoteObject = new Note();
        newNoteObject.set("note", note.body);
        newNoteObject.set("title", note.title);
        newNoteObject.set("username", Parse.User.current().get("username"));
        newNoteObject.set("isPinned", note.pinned);
        newNoteObject.save().then((object) => {
            noteObject.destroy().then(() => {
                const index = pinnedNotes.indexOf(noteObject);
                pinnedNotes.splice(index, 1);
                otherNotes = [object].concat(otherNotes)
                noteViewUpdater()
            }, (error) => {

            })
        }, (error) => {
            // If error encountered
            // Showing a snackbar to the user saying that the item was not added
        });

    } else if (!isPinned && note.pinned) {
        const Note = Parse.Object.extend("Notes");
        const newNoteObject = new Note();
        newNoteObject.set("note", note.body);
        newNoteObject.set("title", note.title);
        newNoteObject.set("username", Parse.User.current().get("username"));
        newNoteObject.set("isPinned", note.pinned);
        newNoteObject.save().then((object) => {
            noteObject.destroy().then(() => {
                const index = otherNotes.indexOf(noteObject);
                otherNotes.splice(index, 1);
                pinnedNotes = [object].concat(pinnedNotes)
                noteViewUpdater()
            }, (error) => {

            })
        }, (error) => {
            // If error encountered
            // Showing a snackbar to the user saying that the item was not added
        });
    } else {
        noteObject.set("note", note.body);
        noteObject.set("title", note.title);
        noteObject.set("isPinned", note.pinned);
        noteObject.save().then((object) => {
            noteViewUpdater()
        }, (error) => {
            // Handle error
        })
    }
}