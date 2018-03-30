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
    var modal2 = document.getElementById('id02');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal2) {
            closeReportModal();
        }
    }
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
    const modal = document.getElementById('id01');
    modal.style.display = "none";
};

openReportModal = ()=>{
    document.getElementById('id02').style.display='block'
};


closeReportModal = ()=>{
    const modal = document.getElementById('id02');
    modal.style.display = "none";
};