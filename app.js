// let msgSection;
const msgSection = document.querySelector("#msg");
const btnSelect = document.querySelector("#btn-selecion");
const btnfight = document.querySelectorAll("button[name=btn-atk]");
const btnReset = document.querySelector("#btn-reset");

const sectionAtk = document.querySelector("#tipo-ataque");

const dicCondition = 
{
    0:"perdiste",
    1:"ganaste",
    2:"empate"
}

let my_ataque = "";
let enemigo_ataque = "";
let typesAtk= []
let my_life = 3;
let his_life = 3;

let gameover = false
let selet_pet = false
document.addEventListener("DOMContentLoaded", function() {
    // console.log("DOM fully loaded and parsed");
    sectionAtk.style.display = "none";
    btnReset.style.display = "none";
    //add event 
    btnSelect.addEventListener("click", handleButtonClick);
    btnReset.addEventListener("click", handlereset);
    for(let i = 0; i < btnfight.length; i=i+1)
    {
        btnfight[i].addEventListener("click" , handleAtk);
        
        typesAtk[i] = btnfight[i].value

    }
    //



});    // fin de la carga del DOM
function handlereset(event){
    window.location.reload();
}
function handleButtonClick(event) {

    let list = event.target.parentElement.querySelectorAll("input[name=mascota]");
    let myPet = document.querySelector("#my-pet");
    let hisPet = document.querySelector("#his-pet");
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

    sectionAtk.style.display = ""
    btnSelect.parentElement.style.display = "none"
    selet_pet = selected;

};
function handleAtk(event){
    if (!selet_pet){
        console.log("No seleccionaste ninguna mascota");
        return
    }
    my_ataque = event.target.value;
    // console.log(`atacaste con ${my_ataque}`);
    enemigo_ataque = enemigoAtk();
   
    
    let msg = msg_consola();

    msgSection.appendChild(msg)
    updateLife(conditionWinner(my_ataque,enemigo_ataque))
    revisarconditionWin()
    if(gameover){
        btnReset.style.display = "block";
        for (let i = 0;i <= btnfight.length-1;i++)
        {
            btnfight[i].disabled = true;
            
        }
    }
}
function enemigoAtk(){
    return typesAtk[aleatorio(0,typesAtk.length-1)];
}
function conditionWinner(you_atk,his_atk) {

    let win = 0
    if (his_atk == you_atk){
        win = 2;
    }
    else if (his_atk == "fire" && you_atk == "weed"){
        win = 0;
    }
    else if (his_atk == "weed" && you_atk == "water")
    {
        win = 0;
    }
    else if (his_atk == "water" && you_atk == "fire"){
        win = 0
    } else {
        win = 1;
    }

    return win
}
function createParrafo(text,tipe = "")
{
    let parrafo;
    if (tipe == ""){
        parrafo = document.createElement("div");

    }else
    {
        parrafo = document.createElement(tipe);
    }
    parrafo.textContent  = text;
    
    return parrafo;
}
function updateLife(condition ) {

    let span_my_life = document.querySelector("#my-life");
    let span_his_life = document.querySelector("#his-life");

  
    if (condition == 1 && his_life >= 1){
            his_life -= 1;
        }else if(condition == 0 && my_life >= 1){
            my_life -=1;
        }
    span_his_life.textContent = his_life;
    span_my_life.textContent = my_life;
}
function revisarconditionWin(){
    let span_my_life = document.querySelector("#my-life").parentElement;
    let span_his_life = document.querySelector("#his-life").parentElement;
    console.log(span_his_life,span_my_life)
    let p;
    if (his_life < 1){
        p = createParrafo("GANASTE LA PARTIDA","div")
        p.setAttribute("value",dicCondition[1])
        gameover = true
        span_his_life.classList.add('dead');
        span_my_life.classList.add("life")

    }else if (my_life < 1 ){
        p = createParrafo("PERDISTE BYE","div")
        p.setAttribute("value",dicCondition[0])
        gameover = true
        span_my_life.classList.add('dead');
        span_his_life.classList.add("life")
    } else {
        return
    }
    msgSection.appendChild(p);
}
let aleatorio = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;

function msg_consola(){
    let you = createParrafo(` Atacastes con ${my_ataque} `,"span")
    you.setAttribute("value",my_ataque);
    let he = createParrafo(` y tu rival ataco con ${enemigo_ataque} `,"span")
    he.setAttribute("value",enemigo_ataque);

    let resul = dicCondition[conditionWinner(my_ataque,enemigo_ataque)]
    let linea_3 = createParrafo(resul,"span")
    linea_3.setAttribute("value",resul)

    let div = document.createElement("div")
    div.appendChild(you);
    div.appendChild(he)
    div.appendChild(linea_3)

    return div;
}