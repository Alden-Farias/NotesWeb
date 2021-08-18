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
  });