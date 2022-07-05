//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function() {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});
// // file = dataTransfer.files;
// let a = files.src;
// console.log(a);

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    let link = file.src;
    showFile(); //calling function
});



function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        var fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            var fileURL = fileReader.result; //passing user file source in fileURL variable
            var imgTag = `<img src="${fileURL}" alt="" id="profil">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container

        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}

var btncreate = document.querySelector(".button1");
let form = document.querySelector("form");

btncreate.addEventListener("click", (e) => {
    e.preventDefault();

    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById('nom').value;
    let telephone = document.getElementById("telephone").value;
    let groupe = document.getElementById("groupe").value;
    let email = document.getElementById("email").value;
    let bio = document.getElementById("bio").value;
    let photo = document.getElementById("profil").src;


    let content = `
    <div class="content2">
        <div class="photo_contact">
        <img src="${photo}" alt="" class="image">
        </div>
        <div class="infos">
            <div class="infos_content">
                <div class="infos1">
                    <p id="newprenom">${prenom}</p>
                    <p id="newnom">${nom}</p>
                    <p id="newgroupe">${groupe}</p>
                </div>
                <div class="icons">
                    <button id="update" onClick="onUpdate(this)"></button>
                    <button id="delete" onClick="onDelete(this)"></button>
                </div>
            </div>
            <div class="infos2">
                <p id="newtelephone">${telephone}</p>
                <p id="newemail">${email}</p>
            </div>
            <p id="newbio">${bio}</p>
        </div>
    </div>

        `

    let contact = document.querySelector(".container2");
    contact.innerHTML += content;
    form.reset();
    document.querySelector("#profil").src = "";

});

function onDelete(td) {

    rw = td.parentElement.parentElement.parentElement.parentElement;
    rw.remove();


}

function onUpdate(tr) {

    change = tr.parentElement.parentElement.parentElement.parentElement;
    document.getElementById("prenom").value = change.querySelector("#newprenom").innerHTML;
    document.getElementById("nom").value = change.querySelector('#newnom').innerHTML;
    document.getElementById("telephone").value = change.querySelector("#newtelephone").innerHTML;
    document.getElementById("groupe").value = change.querySelector("#newgroupe").innerHTML;
    document.getElementById("email").value = change.querySelector("#newemail").innerHTML;
    document.getElementById("bio").value = change.querySelector("#newbio").innerHTML;
    document.querySelector("#profil").src = change.querySelector(".image").src;
    document.querySelector(".button1").textContent = 'Modifier';
    change.remove();

}