let notes = JSON.parse(localStorage.getItem("notes")) || [
    "Uyan"
];

let listEl = document.querySelector(".liste");
let row = "";

// Array elementlerini <li> ile sar.
for(let note of notes){
    row += `<li>${note}</li>`;
}

// Sarılmış array elementlerini ul'a geçir
listEl.innerHTML = row;

let inputEl = document.getElementById("newInput");

document.getElementById("addBtn").addEventListener("click", () => {

    // Validation
    if(!inputEl.value){
        inputEl.focus();
        return;
    }

    // Listeye input ekle
    listEl.innerHTML += `<li>${inputEl.value}</li>`;
    // Input'u Array'e ekle
    notes.push(inputEl.value);

    // Local Storage kaydet
    localStorage.setItem("notes", JSON.stringify(notes));

    // Card kısmında tüm notları göster
    showResult(notes);

    // Input sıfırla
    inputEl.value = "";
    inputEl.focus();

});

document.getElementById("removeBtn").addEventListener("click", () => {

    // Validation
    if(notes.length === 0){
        alert("Liste boş");
        return;
    } else{


        // List elementi boşalt
        listEl.value="";
        // Array'deki son elementi çıkar
        notes.pop();
        // Local Storage kaydet
        localStorage.setItem("notes", JSON.stringify(notes));
        
        showResult(notes);
        // Son elementi sil
        listEl.removeChild(listEl.lastElementChild);

    }

});

const showResult = (arr) => {
    // Validataion
    if(arr.length === 0){
        document.getElementById("cardMenu").innerHTML = `<b>Silinecek not kalmadı</b>`;
    } else{
        document.getElementById("cardMenu").innerHTML = arr.join(" - ");
    }
}