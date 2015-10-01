//overall app logic and loader...
function travelNotes() {
  "use strict";

  //manage input field and new note output
  function createNote() {
    //object that wraps each note and its delete link
    var $note_div = $("<div/>")
    //object for wrapper html for note
    var $note = $("<p>");
    //define input field
    var $note_text = $(".note-input input");

    //conditional check for input field
    if ($note_text.val() !== "") {
      //select the delete-all button
      var $deleteAllButton = $("#delete-all")
      //create a delete link for each added note
      var $delLink = $('<a>delete</a>').attr({ 
        href: "#",
        class: "del-link"
      });
      //adds a click listener to the delete link
      $delLink.on("click", function () {
        deleteNote(this); 
      });

      //set content for note
      $note.html($note_text.val());
      //append note and delete link to note_div
      $note_div.append($note);
      $note_div.append($delLink);
      //hide new note_div to setup fadeIn...
      $note_div.hide();
      //append note_div to note-output
      $(".note-output").append($note_div);

      //fadeIn hidden new note_div and conditionally 
      // the deleteAllButton
      if ($deleteAllButton.is(":hidden"))
        $deleteAllButton.fadeIn("slow");
      $note_div.fadeIn("slow");
      $note_text.val("");
    }
  }

  function deleteNote(e) {
    var $note_output = $(".note-output");
    var $note_div = $(e.parentNode);
    $note_div.fadeOut("slow", function () {
      $note_div.remove();
      if ($note_output.children().length == 0)
        $("#delete-all").hide();
    });
  }

  function deleteAllNotesButton() {
    $(".note-output").fadeOut("slow", function () {
      //remove all children from the note-output after fadding out
      // then show the empty note-output again
      $(this).empty().show();
      //hide the delete-all button
      $("#delete-all").hide();
    });
  }

  //handle user event for `add` button click
  $(".note-input button").on("click", function(e) {
    createNote();
    $(".note-input input").focus();
  });

  //handle user event for keyboard press
  $(".note-input input").on("keypress", function(e){
    //check code for keyboard press
    if (e.keyCode === 13) {
      createNote();
    }
  });

  $("#delete-all").on("click", function(e) {
    deleteAllNotesButton();
  });

};

$(document).ready(travelNotes);
