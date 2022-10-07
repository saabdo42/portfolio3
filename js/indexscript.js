
var link1 = document.getElementById("pg1link");
var link2 = document.getElementById("pg2link");
var link3 = document.getElementById("pg3link");
var link4 = document.getElementById("pg4link");

var drop1 = document.getElementById("drop1"); 
var drop2 = document.getElementById("drop2"); 
var drop3 = document.getElementById("drop3"); 
var drop4 = document.getElementById("drop4"); 
var drop5 = document.getElementById("drop5"); 
var drop6 = document.getElementById("drop6"); 
var drop7 = document.getElementById("drop7"); 
var drop8 = document.getElementById("drop8"); 
var drop9 = document.getElementById("drop9"); 

let box1 = new box(drop1);
let box2 = new box(drop2);
let box3 = new box(drop3);
let box4 = new box(drop4);
let box5 = new box(drop5);
let box6 = new box(drop6);
let box7 = new box(drop7);
let box8 = new box(drop8);
let box9 = new box(drop9);

let boxlist = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

let timeoutover = true; //timeout for the scroll so ur computer doesn't crash
function retimer(){
    timeoutover = true;
}

var menu = document.getElementById("menu");

function menyu() {
    if (menu.classList.contains("vis") == true){
        menu.classList.replace("vis", "invis");
    }else{
        menu.classList.replace("invis", "vis");
    } 
}

function mennu() {
    if (window.innerWidth > 600){
        menu.classList = "vis"
    }else{
        menu.classList = "invis"
    }
}

function highlightpage() {

    if (timeoutover == false){
        return;
    }else{

        timeoutover = false;
        setTimeout(retimer, 100);

        if (scrollY < window.innerHeight){
            link1.classList.replace("current", "notcurrent");
            link2.classList.replace("current", "notcurrent");
            link3.classList.replace("current", "notcurrent");
            link4.classList.replace("current", "notcurrent");

        } else if(scrollY > window.innerHeight && scrollY < window.innerHeight * 1.6){
            link1.classList.replace("notcurrent", "current");
            link2.classList.replace("current", "notcurrent");
            link3.classList.replace("current", "notcurrent");
            link4.classList.replace("current", "notcurrent");

        }else if(scrollY > window.innerHeight * 1.6 && scrollY < window.innerHeight * 3){
            link1.classList.replace("current", "notcurrent");
            link2.classList.replace("notcurrent", "current");
            link3.classList.replace("current", "notcurrent");
            link4.classList.replace("current", "notcurrent");

        }else if(scrollY > window.innerHeight * 3 && scrollY < window.innerHeight * 4){
            link1.classList.replace("current", "notcurrent");
            link2.classList.replace("current", "notcurrent");
            link3.classList.replace("notcurrent", "current");
            link4.classList.replace("current", "notcurrent");
        }else{
            link1.classList.replace("current", "notcurrent");
            link2.classList.replace("current", "notcurrent");
            link3.classList.replace("current", "notcurrent");
            link4.classList.replace("notcurrent", "current");
        }
    }
}

function cloze() {  //loop hide all descriptions    
    for (i = 0; i < boxlist.length; i++) {
        boxlist[i].hide();
    }
    document.getElementById("back").classList.replace("vis", "invis");
    document.getElementById("next").classList.replace("vis", "invis");
    document.getElementById("skrb").classList.replace("vis", "invis");
}

function bruh(id) {  //reveal description of the box u clicked on
    boxlist[id].reveal();
    document.getElementById("back").classList.replace("invis", "vis");
    document.getElementById("next").classList.replace("invis", "vis");
    document.getElementById("skrb").classList.replace("invis", "vis");
}

function nex(){
    //loop check boxes to see which one isvisible
    //remember which one isvisible
    //hide that one
    //make the NEXT box (in boxlist) visible

    var stephanie = undefined //currently visible desc is stephanie

    for (j = 0; j <boxlist.length; j++) { //setting the value of stephanie lol
        
        if (boxlist[j].isvisible() == true) {
            stephanie = j;
        }
    }

    greg = stephanie - 1; //next desc is greg

    if (greg < 0){ //on the last box, next box is the first box.....
        greg = boxlist.length -1; 
    }

    boxlist[stephanie].hide();
    boxlist[greg].reveal();

    var biggg = boxlist[greg].description.getElementsByClassName("bigimg");
    var smol = boxlist[greg].description.getElementsByClassName("descimg");

    biggg[0].src = smol[0].src

}

function bac(){
    var stephanie = undefined 

    for (j = 0; j <boxlist.length; j++) { 
        
        if (boxlist[j].isvisible() == true) {
            stephanie = j;
        }
    }

    breg = stephanie + 1; 

    if (breg >= boxlist.length){ 
        breg = 0; 
    }

    boxlist[stephanie].hide();
    boxlist[breg].reveal();

    var biggg = boxlist[breg].description.getElementsByClassName("bigimg");
    var smol = boxlist[breg].description.getElementsByClassName("descimg");

    biggg[0].src = smol[0].src
}

function enlarge(frog) { //enlarges preview imgs

    var newimgsrc = frog.src;
    var bois = document.getElementsByClassName("bigimg");
    var pdfs = document.getElementsByClassName("window");
    
    if (frog.classList.contains("oof") == true){ //if preview img is tagged as pdf

        for (k=0; k<pdfs.length; k++) { //show all pdf windows
            pdfs[k].classList.replace("invis", "vis");
        }
        for (j=0; j<bois.length; j++) { //hide all bigimg
            bois[j].classList.replace("vis", "invis");
        }

    }else{ //if preview img is not tagged as pdf
        
        for (h=0; h<pdfs.length; h++) { //hide all pdf windows
            pdfs[h].classList.replace("vis", "invis");
        }
        for (k=0; k<bois.length; k++) { //show all bigimg
            bois[k].classList.replace("invis", "vis");
            bois[k].src = newimgsrc; //choose which bigimg to show
        }
    }
}
