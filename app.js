
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");


    let btnSelect = document.querySelector("#btn-selecion");
    btnSelect.addEventListener("click", handleButtonClick);

});    

function handleButtonClick(event) {


    let list = event.target.parentNode.querySelectorAll("input[name=mascota]");

    for( let i = 0; i < list.length; i=i+1)
        {
            if(list[i].checked)
            {
                console.log(list[i].value);
                break;
            }
        }
    // console.log("Button was clicked!");

};

// document.parentNode