function deleteNote(noteId) {
    fetch('/delete-note',{

        method: 'POST',
        body: JSON.stringify({noteId: noteId}),
    }).then((_res)=> {
        window.location.href = "/";
    });

    

};

function update(noteId, update_note) {
    const data = {
        noteId: noteId,
        data: document.getElementById(`update_note_${update_note}`).value
    };

    fetch('/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        window.location.href = "/";
    });
}


$(document).ready(function(){ 
    
    $(document).click(function (ev) {
        if($('div').length < 3) {
            $("body").append(            
                $('<div></div>').css({
                    position: 'absolute',
                    top: ev.pageY + 'px',
                    left: ev.pageX + 'px',
                    width: '10px',
                    height: '10px',
                    background: '#000000'
                })              
            );
        }
    });
    
});

// function that hides the update text field and button

let isClicked = {}; 

function showOrHide(noteId) {
    const formId = `showOrHide_${noteId}`;
    const divContainer = document.getElementById(formId);

    if (!isClicked[formId]) {
        divContainer.style.display = "block";
        isClicked[formId] = true;
    } else {
        divContainer.style.display = "none";
        isClicked[formId] = false;
    }
}


function recreateForm() {
 
const formContainer = $('#formContainer');
const fromHTML = `
<div class="shotgrouptarget">
 
  <div class="target"><img src="../static/images/B23-1.jpg"></div>
  <form id="bzo-grouping" class="shotform">
    <td><input type="text" placeholder="Elevation"></td> <br>
    <td><input type="text" placeholder="Windage"></td> <br> 
  </form>
</div>
` ;
formContainer.append(fromHTML);

}

function deleteForm() {
    const deleteForm = document.querySelector('.shotgrouptarget');
    deleteForm.remove();
}

