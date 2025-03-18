let my_ataque = "";
let enemigo_ataque = "";
let typesAtk= []
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");


    let btnSelect = document.querySelector("#btn-selecion");
    btnSelect.addEventListener("click", handleButtonClick);

    let btnfight = document.querySelectorAll("button[name=btn-atk]");

    for(let i = 0; i < btnfight.length; i=i+1)
    {
        btnfight[i].addEventListener("click" , atk);
        typesAtk[i] = btnfight[i].value
    }

});    // fin de la carga del DOM

function handleButtonClick(event) {


    let list = event.target.parentElement.querySelectorAll("input[name=mascota]");
    let myPet = document.querySelector ("#my-pet");
    let hisPet = document.querySelector ("#his-pet");
    let selected = false;
    for( let i = 0; i < list.length; i=i+1) 
        // recorro la lista de mascotas y ver si se seleciono una y selecionar una a su vez aleatoria para el enemigo
        {
            if(list[i].checked)
            {
                // console.log(`selecionaste a ${list[i].value}`);
                // console.log(myPet);
                myPet.textContent = list[i].value;
                hisPet.textContent = list[aleatorio(0, list.length-1)].value;
                selected = true;

                break;
            }
        }
    if(!selected)
    // si no se seleciono ninguna mascota
    {             
        console.log("No seleccionaste ninguna mascota");
    }

    // console.log(event.target.parentElement,event.target.parentNode);

};
function atk(event){
    my_ataque = event.target.value;
    // console.log(`atacaste con ${my_ataque}`);
    enemigo_ataque = enemigoAtk();
}

function enemigoAtk(){
    return typesAtk[aleatorio(0,typesAtk.length-1)];
}
let aleatorio = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;