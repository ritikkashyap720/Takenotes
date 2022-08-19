let body = document.querySelector("body");
const lightBtn = document.getElementById("light-mode");
const darkBtn = document.getElementById("dark-mode");
const addNote = document.getElementById("addnote");
const notesContainer = document.getElementById("notes-container");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const colorP = document.getElementById("color-giver");
const editColorP = document.getElementById("edit-color-giver");
const addNotePickedColor = document.getElementById("picked-color");
const editNotePickedColor = document.getElementById("edit-picked-color");
// for edit purpose
const editNoteCcontainer = document.getElementById("editnote")
// opening
let openContainer = document.getElementById("open-note");
let openId = document.getElementById("open-id-passer");


showNotes();
checkTheme();
// checking themes
function checkTheme(){
  let theme = localStorage.getItem("notesTheme")
  if(theme=="dark"){
    darkMode();
  }
  else{
    lightMode();
  }
}

// delete all notes
function deleteAllNotes() {
    localStorage.clear()
    console.log("working");
    showNotes();
}
// button functions 
function lightMode() {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme");
    lightBtn.style.display = "none";
    darkBtn.style.display = "block";
    localStorage.setItem("notesTheme","light")

}
function darkMode() {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    lightBtn.style.display = "block";
    darkBtn.style.display = "none";
    localStorage.setItem("notesTheme","dark")
}

function addnote() {
    addNote.style.display = "flex";
    notesContainer.style.display = "none";
    closeBtn.style.display = "block"
    addBtn.style.display = "none"
    openContainer.style.display="none";

}
function closenote() {

    addNote.style.display = "none";
    notesContainer.style.display = "grid";
    addBtn.style.display = "block"
    closeBtn.style.display = "none"
    editNoteCcontainer.style.display = "none";
    openContainer.style.display="none";
    showNotes();
}




// giving color


function giveColor(color) {
    colorP.innerHTML = color;
    addNotePickedColor.classList.add("addcolor");
    addNotePickedColor.style.backgroundColor = color;
    addNotePickedColor.innerHTML = " ";
    addNotePickedColor.style.boxShadow = "none";
    // edit color giver
    editColorP.innerHTML = color;
    editNotePickedColor.classList.add("addcolor");
    editNotePickedColor.style.backgroundColor = color;
    editNotePickedColor.innerHTML = " ";
    editNotePickedColor.style.boxShadow = "none";
    // passing color to open note
   
}

// adding note

let saveBtn = document.getElementById("savenote");
saveBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    let titleColor = colorP.innerHTML;
    console.log(titleColor);
    if (titleColor == "") {
        titleColor = "var(--navbar)";
        console.log(titleColor);

    }
    else {
        console.log("not empty");

    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value,
        color: titleColor
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    console.log(notesObj);
    closenote();
    showNotes();
})

// editnote button function
const idPasser = document.getElementById("id-passer");
function editnoteBtn(id) {
    notesContainer.style.display = "none";
    editNoteCcontainer.style.display = "flex";
    closeBtn.style.display = "block";
    addBtn.style.display = "none";
    openContainer.style.display="none";
    idPasser.innerHTML = id;

    let editTitle = document.getElementById("editTitle");
    let editText = document.getElementById("editText");
    let notes = localStorage.getItem("notes");


    let titleColor;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    editTitle.value = notesObj[id].title;
    editText.value = notesObj[id].text;
    titleColor = notesObj[id].color;
    // for changing color of the edit title input 
    editNotePickedColor.classList.add("addcolor");
    editNotePickedColor.style.backgroundColor = titleColor;
    editNotePickedColor.innerHTML = " ";
    editNotePickedColor.style.boxShadow = "none";
    editColorP.innerHTML = titleColor;

    console.log(editTitle.value)
    console.log(editText.value)
    console.log(titleColor)
    // console.log(notesObj[id].color)
    showNotes();
}
// function run on pressing save button


function editNote() {
    console.log(idPasser.innerHTML);
    let id = idPasser.innerHTML;


    let editTitle = document.getElementById("editTitle");
    let editText = document.getElementById("editText");
    let notes = localStorage.getItem("notes");
    let titleColor = editColorP.innerHTML ;

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }


  
    if (titleColor == " ") {
        titleColor = "var(--navbar)";
        console.log(titleColor);

    }
    else {
        console.log("not empty");

    }

    notesObj[id].title = editTitle.value;
    notesObj[id].text = editText.value;
    notesObj[id].color =titleColor
   
    localStorage.setItem("notes", JSON.stringify(notesObj));
    editText.value = "";
    editTitle.value = "";
    closenote();
    showNotes();
}



// showing notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }
    let note = "";
    notesObj.forEach(function (element, index) {

        note += ` 
        
        <div class="notes-body" >
            <div class="notes-option" style="background-color:${element.color}">
             <h3 class="title" >${element.title}</h3>
              <li class="options-btn">
                <span class="material-symbols-outlined opt-btn">more_vert</span>
                <ul class="options">
                    <li onclick="editnoteBtn(this.id)" id="${index}" class="edit-note"><span class="material-symbols-outlined">edit_note</span></li>
                    <li class="color-pick">
                        <span class="material-symbols-outlined">palette</span>
                        <ul class="color-option">
                            <li id="${index}" onclick="getColor(this.id,'0')" class="color color-1"></li>
                            <li id="${index}" onclick="getColor(this.id,'1')" class="color color-2"></li>
                            <li id="${index}" onclick="getColor(this.id,'2')" class="color color-3"></li>
                            <li id="${index}" onclick="getColor(this.id,'3')" class="color color-4"></li>
                            <li id="${index}" onclick="getColor(this.id,'4')" class="color color-5"></li>
                        </ul>
                    </li>
                    <li  id="${index}" onclick="deleteNote(this.id)" class="delete-note"><span class="material-symbols-outlined ">delete</span></li>
                </ul>
            </li>
        </div>
        
        <p onclick="openNoteBtn(${index}) "> ${element.text}</p>
    </div>
    `
    })


    if (notesObj.length != 0) {
        notesContainer.innerHTML = note;
        notesContainer.style.display = "grid";

    } else {
        notesContainer.style.display = "block";
        notesContainer.innerHTML = `<div id="intro" class="intro"">
        <div class="details">
            <h1>Hey, welcome to Takenotes 😊.</h1>
            <p>You can add notes your here.</p>
            <p>Add yor first note by clicking on <strong>Add</strong> note icon.</p>
            <p>Your added notes will appear here.</p>
        </div>
    </div>`;
       
    }


}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    closeOpenNote()
    showNotes();

}

// get color 

function getColor(id, no) {
    console.log(id);
    console.log(no);

    const colors = ["#fb8ba7", "#4fc1ff", "#00bb79", "#ab5ba7", "#ffbc59"];

   

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
  
    notesObj[id].color= colors[no];
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
    console.log(notesObj[0].color);

    showNotes();
}

// open note


function openNoteBtn(id){
   openId.innerHTML = id;
   openContainer.style.display ="flex";
   openNote();
   showNotes();
}

function openNote(){
    let shortTitle = document.getElementById("short-title");
    let longTitle = document.getElementById("long-title");
    let openNoteText = document.getElementById("open-note-text");
    let titlebar = document.getElementById("titlebar")
    id = openId.innerHTML;


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    shortTitle.innerHTML = notesObj[id].title;
    longTitle.innerHTML = notesObj[id].title;
    openNoteText.innerHTML = notesObj[id].text;
    titlebar.style.backgroundColor= notesObj[id].color;

  
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    showNotes();
}
function openColor(color){
    id = openId.innerHTML;
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj[id].color= color;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    openNote();
}
// deleting notes from open

function deleteNoteOpen(){
    id = openId.innerHTML;
    deleteNote(id);
    closeOpenNote();
    openContainer.style.display ="none";
    showNotes();
}

function closeOpenNote(){
    openContainer.style.display="none";
    notesContainer.style.display="grid";
    showNotes();
}

function editOpenNote(){
    id = openId.innerHTML;

    openContainer.style.display="none";
    notesContainer.style.display="grid";
    editnoteBtn(id);
    showNotes();
}

// search function 
const search = document.getElementById("search");
const openSearchBtn = document.getElementById("open-search")
const closeSearchBtn = document.getElementById("close-search")
function openSearch(){
    search.style.display="flex";
    openSearchBtn.style.display="none";
    closeSearchBtn.style.display="block";
}
function closeSearch(){
    closeSearchBtn.style.display="none";
    openSearchBtn.style.display="block";
    search.style.display="none";

}

let searchText = document.getElementById('searchTxt');
searchText.addEventListener("input", function(){

    let inputVal = searchText.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notes-body');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h3")[0].innerText;
        if(cardTxt.includes(inputVal)||cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
      
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
