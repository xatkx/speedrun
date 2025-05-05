// let msgSection;
const msgSection = document.querySelector("#msg");
const btnSelect = document.querySelector("#btn-selecion");
const btnfight = document.querySelectorAll("button[name=btn-atk]");
const btnReset = document.querySelector("#btn-reset");
const sectionAtk = document.querySelector("#tipo-ataque");
// const listMascota = document.querySelector("#list-mascotas");


let listPet = document.querySelectorAll("input[name=mascota]");
let myPetNameLabel = document.querySelector("#my-pet");
let enemyPetNameLabel = document.querySelector("#his-pet");


let spanMyLife = document.querySelector("#my-life");
let spanEnemyLife = document.querySelector("#his-life");

let panelResultHtml = document.querySelector(".result");
// var

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
let selectPet = false
//-====

document.addEventListener("DOMContentLoaded", function() {

    // console.log("DOM fully loaded and parsed");
    sectionAtk.style.display = "none";
    btnReset.style.display = "none";

    //add event 
    btnSelect.addEventListener("click", handleSelectPet);
    btnReset.addEventListener("click", reset);

    for(let i = 0; i < btnfight.length; i=i+1)
    {
        btnfight[i].addEventListener("click" , handleBtnAtk);
        typesAtk[i] = btnfight[i].value
    }

});    // fin de la carga del DOM

function reset(event){
    window.location.reload();
}

function handleSelectPet(event) {

    for( let i = 0; i < listPet.length; i=i+1) 
        // recorro la listPeta de mascotas y ver si se seleciono una y selecionar una a su vez aleatoria para el enemigo
        {
            if(listPet[i].checked)
            {
                // console.log(`selecionaste a ${listPet[i].value}`);
                // console.log(myPetNameLabel);
                myPetNameLabel.textContent = listPet[i].value;
                enemyPetNameLabel.textContent = listPet[aleatorio(0, listPet.length-1)].value;
                selectPet = true;
                break;
            }
        }

        if (!selectPet){
            createAlert("selecione una mascota hd perra","warring");
            return
        }

    sectionAtk.style.display = ""
    btnSelect.parentElement.style.display = "none"

};

function handleBtnAtk(event){
    if (!selectPet){
        createAlert("No seleccionaste ninguna mascota","bad");
        return
    }
    my_ataque = event.target.value;
    enemigo_ataque = AleatAtk();
    let winner = conditionWinner(my_ataque,enemigo_ataque);
    updateLife(winner);

    msgSection.appendChild(msg_consola())
    
    update_atk()

    if(gameover){
        msgSection.appendChild(create_etiqueta_state_win())
        panelResult()
        btnReset.style.display = "block";
        for (let i = 0;i <= btnfight.length-1;i++)
        {
            btnfight[i].disabled = true;
            
        }
    }
}

function AleatAtk(){
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
// actualiza la vidas
function updateLife(condition ) { 

    if (condition == 1 && his_life >= 1){
        his_life -= 1;
    }
    else if(condition == 0 && my_life >= 1){
        my_life -=1;
    }
    
    if (his_life <= 0 || my_life <=0) {
        gameover = true
    }
    
    spanEnemyLife.textContent = his_life;
    spanMyLife.textContent = my_life;
}
function create_etiqueta_state_win(){

    let myCard = spanMyLife.parentElement;
    let EnemyCard = spanEnemyLife.parentElement;

    let div;

    if (his_life < 1){
        div = createetiqueta("GANASTE LA PARTIDA","div")
        div.setAttribute("value",dicCondition[1])
        EnemyCard.classList.add('dead');
     myCard.classList.add("life")
        
    }else {
        div = createetiqueta("PERDISTE LA PARTIDA","div")
        div.setAttribute("value",dicCondition[0]) 
     myCard.classList.add('dead');
        EnemyCard.classList.add("life")
    }

    return div;
}

function msg_consola(){
    let my = createetiqueta(` Atacastes con ${my_ataque} `,"span")
    my.setAttribute("value",my_ataque);
    let enemy = createetiqueta(` y tu rival ataco con ${enemigo_ataque} `,"span")
    enemy.setAttribute("value",enemigo_ataque);
    
    let resul = dicCondition[conditionWinner(my_ataque,enemigo_ataque)]
    let linea_3 = createetiqueta(resul,"span")
    linea_3.setAttribute("value",resul)
    
    let div = document.createElement("div")
    div.appendChild(my);
    div.appendChild(enemy)
    div.appendChild(linea_3)
    
    return div;
}

function panelResult(){

    if(panelResultHtml.firstChild){
        panelResultHtml.firstChild.remove()
    }
    div = create_etiqueta_state_win()

    div.classList.add("state-result");
    panelResultHtml.appendChild(div)
}

function update_atk(){

    let my = document.querySelector(".my-atk");
    let enemigo = document.querySelector(".enemigo-atk");
    
    while(my.firstChild || enemigo.firstChild){ //limpia el html viejo
        if(my.firstChild){
            my.firstChild.remove();
        }
        if(enemigo.firstChild){
            enemigo.firstChild.remove()
        }
    }

    div1 = createetiqueta(my_ataque,"span")
    div2 = createetiqueta(enemigo_ataque,"span")

    div1.setAttribute("value",my_ataque);
    div2.setAttribute("value",enemigo_ataque);

    switch (conditionWinner(my_ataque,enemigo_ataque)) {
        case 1:
            div1.classList.add("life-2")
            div2.classList.add("dead-2")
            break;
        case 0:
            div1.classList.add("dead-2")
            div2.classList.add("life-2")
            break;
    
        default:
            // div1.classList.add("life")
            // div2.classList.add("dead")
            break;
    }
    
    my.appendChild(div1)
    enemigo.appendChild(div2)


}
function createetiqueta(text,tipe = "")
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

function createAlert(text, type) {

    let div = document.createElement("div");
    let p = document.createElement("p");

    div.classList.add("alert",type);

    p.textContent = text;

    div.appendChild(p)

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);

}

let aleatorio = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;