// let msgSection;
const msgSection = document.querySelector("#msg");
const btnSelect = document.querySelector("#btn-selecion");
const btnfight = document.querySelectorAll("button[name=btn-atk]");
const btnReset = document.querySelector("#btn-reset");
const sectionAtk = document.querySelector("#tipo-ataque");

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
    btnSelect.addEventListener("click", handleSelectItem);
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

function handleSelectItem(event) {

    let list = event.target.parentElement.querySelectorAll("input[name=mascota]");
    let myPetLabel = document.querySelector("#my-pet");
    let enemyPetLabel = document.querySelector("#his-pet");
   
    for( let i = 0; i < list.length; i=i+1) 
        // recorro la lista de mascotas y ver si se seleciono una y selecionar una a su vez aleatoria para el enemigo
        {
            if(list[i].checked)
            {
                // console.log(`selecionaste a ${list[i].value}`);
                // console.log(myPetLabel);
                myPetLabel.textContent = list[i].value;
                enemyPetLabel.textContent = list[aleatorio(0, list.length-1)].value;
                selectPet = true;
                break;
            }
        }

        if (!selectPet){
            createAlert("selecione una mascota hd perra","aviso");
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

    updateLife(conditionWinner(my_ataque,enemigo_ataque))
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
    let span_my_life = document.querySelector("#my-life");
    let span_his_life = document.querySelector("#his-life");

    
    if (condition == 1 && his_life >= 1){
        his_life -= 1;
    }
    else if(condition == 0 && my_life >= 1){
        my_life -=1;
    }
    
    if (his_life <= 0 || my_life <=0) {
        gameover = true
    }
    
    span_his_life.textContent = his_life;
    span_my_life.textContent = my_life;
}
function create_etiqueta_state_win(){

    let span_my_life = document.querySelector("#my-life").parentElement;
    let span_his_life = document.querySelector("#his-life").parentElement;

    let div;

    if (his_life < 1){
        div = createetiqueta("GANASTE LA PARTIDA","div")
        div.setAttribute("value",dicCondition[1])
        span_his_life.classList.add('dead');
        span_my_life.classList.add("life")
        
    }else {
        div = createetiqueta("PERDISTE LA PARTIDA","div")
        div.setAttribute("value",dicCondition[0]) 
        span_my_life.classList.add('dead');
        span_his_life.classList.add("life")
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
    let panelResult = document.querySelector(".result");
    
    if(panelResult.firstChild){
        panelResult.firstChild.remove()
    }
    div = create_etiqueta_state_win()

    div.classList.add("state-result");
    panelResult.appendChild(div)
}

function update_atk(){

    let my = document.querySelector(".my-atk");
    let enemigo = document.querySelector(".enemigo-atk");
    
    while(my.firstChild || enemigo.firstChild){
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