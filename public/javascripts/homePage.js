/*
This file will  contain all nessasary javascript function for home page
*/

/*
this function should be called on page load
*/
onPageLoad = ()=>{
    
    console.log('open page load')
    /*
        this part will set action listener for modal (for closing purpose)
    */
    // Get the modal
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            closeLoginModal();
        }
    }

    /*
        login modal part end
    */
};

/*
this function will open login modal
*/
openLoginModal = ()=>{

    document.getElementById('id01').style.display='block'
};

/*
this function will close login modal
*/
closeLoginModal = ()=>{
    var modal = document.getElementById('id01');
    modal.style.display = "none";
};