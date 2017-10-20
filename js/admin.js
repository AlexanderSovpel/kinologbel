/**
 * Created by Alexander on 17.04.15.
 */
var current = document.querySelector('#current');
var notes_list = document.querySelector('#notes_list');
var notes = notes_list.children;
var current_id = document.querySelector('#current_id');
var current_title = document.querySelector('#current_title');
var current_text = document.querySelector('#current_text');
var current_tags = document.querySelector('#current_tags');

var current_gallery = document.querySelector('#current_gallery');
var gallery_list = document.querySelector('#gallery_list');
var gallery = gallery_list.children;
var current_gallery_id = document.querySelector('#current_gallery_id');
var current_gallery_title = document.querySelector('#current_gallery_title');
var current_files = document.querySelector('#current_files');

document.body.onload = loadAll;
function loadAll() {
    loadNotes();
    loadGallery();
}

function loadNotes() {
    $.get("php/main.php?action=load_all_articles", function(data) {
        notes_list.innerHTML = data;
        addEditNoteHandlers();
    });
}

function loadGallery() {
    $.get("php/main.php?action=load_all_gallery", function(data) {
        gallery_list.innerHTML = data;
        addEditGalleryHandlers();
    });
}

function addEditNoteHandlers() {
    for (var i = 0; i < notes.length; ++i) {
        notes[i].addEventListener("click", function(event) {
            if (current.className == 'no_current_note')
                current.className = 'current_note';

            current_id.value = event.currentTarget.children[0].value;
            current_title.value = event.currentTarget.children[1].innerHTML;
            current_text.value = event.currentTarget.children[3].innerHTML;

            var tagsRaw = "";
            var tagsCount = event.currentTarget.children[4].children.length;
            for (var i = 0; i < tagsCount - 1; ++i) {
                tagsRaw += event.currentTarget.children[4].children[i].innerHTML + ", ";
            }
            tagsRaw += event.currentTarget.children[4].children[tagsCount - 1].innerHTML;
            current_tags.value = tagsRaw;
        });
    }
}

function addEditGalleryHandlers() {
    for (var i = 0; i < gallery.length; ++i) {
        gallery[i].addEventListener("click", function(event) {
            if (current_gallery.className == 'no_current_note')
                current_gallery.className = 'current_note';

            current_gallery_id.value = event.currentTarget.children[0].value;
            current_gallery_title.value = event.currentTarget.children[1].innerHTML;
            var filesList = event.currentTarget.children[3];
        });
    }
}

function saveNote() {
    var params = "action=save_article&" +
        "current_id=" + current_id.value + "&" +
        "current_title=" + current_title.value + "&" +
        "current_text=" + current_text.value + "&" +
        "current_tags=" + current_tags.value;

    $.get("php/main.php?" + params, function(data) {
        loadNotes();
    });
}

function saveGallery(event) {
    event.preventDefault();
    var data = new FormData();
    $.each(files, function(key, value)
    {
        data.append(key, value);
    });

    $.ajax({
        url: 'php/loadGallery.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                alert(data);
            }
            else
            {
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log('ERRORS: ' + textStatus);
        }
    });
}

var files;

$('input[type=file]').on('change', prepareUpload);

function prepareUpload(event)
{
    files = event.target.files;
}

function deleteNote() {
    var params = "action=delete_article&" +
        "current_id=" + current_id.value;

    $.get("php/main.php?" + params, function(data) {
        loadNotes();
        clearNoteEditor();
    });
}

function addNewNote () {
    if ($('.tab-pane.active').attr('id') == "notes_list_container") {
        current.className = 'current_note';
        clearNoteEditor();
    }
    else {
        current_gallery.className = 'current_note';
        clearGalleryEditor();
    }
}

function clearNoteEditor() {
    current_id.value = "";
    current_title.value = "";
    current_text.value = "";
    current_tags.value = "";
}

function clearGalleryEditor() {
    current_gallery_id.value = "";
    current_gallery_title.value = "";
    current_files.value = "";
}

$('#logout').click(logout);
function logout() {
    var params = "action=logout";
    $.get("php/main.php?" + params, function(data) {
            location.href = "index.html";
        });
}
