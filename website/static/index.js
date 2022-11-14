function deleteNote(noteId) {
    fetch('/delete-note',{

        method: 'POST',
        body: JSON.stringify({noteId: noteId}),
    }).then((_res)=> {
        window.location.href = "/";
    });

    

};

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

