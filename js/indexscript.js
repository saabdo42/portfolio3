
var link1 = document.getElementById("pg1link");
var link2 = document.getElementById("pg2link");
var link3 = document.getElementById("pg3link");
var link4 = document.getElementById("pg4link");
var link5 = document.getElementById("pg5link");

var drop1 = document.getElementById("drop1"); 
var drop2 = document.getElementById("drop2"); 
var drop3 = document.getElementById("drop3"); 
var drop4 = document.getElementById("drop4"); 
var drop5 = document.getElementById("drop5"); 
var drop6 = document.getElementById("drop6"); 
var drop7 = document.getElementById("drop7"); 
var drop8 = document.getElementById("drop8"); 
var drop9 = document.getElementById("drop9"); 
var drop10 = document.getElementById("drop10"); 
var drop11 = document.getElementById("drop11"); 
var drop12 = document.getElementById("drop12"); 
var drop13 = document.getElementById("drop13"); 
var drop14 = document.getElementById("drop14"); 
var drop15 = document.getElementById("drop15"); 
var drop16 = document.getElementById("drop16"); 
var drop17 = document.getElementById("drop17"); 
var drop18 = document.getElementById("drop18"); 

let box1 = new box(drop1);
let box2 = new box(drop2);
let box3 = new box(drop3);
let box4 = new box(drop4);
let box5 = new box(drop5);
let box6 = new box(drop6);
let box7 = new box(drop7);
let box8 = new box(drop8);
let box9 = new box(drop9);
let box10 = new box(drop10);
let box11 = new box(drop11);
let box12 = new box(drop12);
let box13 = new box(drop13);
let box14 = new box(drop14);
let box15 = new box(drop15);
let box16 = new box(drop16);
let box17 = new box(drop17);
let box18 = new box(drop18);

let boxlist = [box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15, box16, box17, box18 ];
let pagelist = [link1, link2, link3, link4, link5];
var currentpg;

let timeoutover = true; //timeout for the scroll so ur computer doesn't crash
function retimer(){
    timeoutover = true;
}

var menu = document.getElementById("menu");

function mobilehidemenu() {
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

        if (scrollY < window.innerHeight){ //top of the page nothing in the menu is highlighted
            
            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

        } else if(scrollY > window.innerHeight && scrollY < window.innerHeight * 1.6){ //about page is at 1xviewport

            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

            pagelist[0].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 1.6 && scrollY < window.innerHeight * 2.6){ //recent page is at 1.6xviewport

            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

            pagelist[1].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 2.6 && scrollY < window.innerHeight * 4.6){ //art page is at 2.6xviewport

            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

            pagelist[2].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 4.6 && scrollY < document.body.scrollHeight - window.innerHeight * 1.1){ //insta page is at 4.6xviewport

            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

            pagelist[3].classList.replace("notcurrent", "current");

        }else if(scrollY > document.body.scrollHeight - window.innerHeight * 1.1){ //contact page is 1.1 viewport up

            for (i=0; i < pagelist.length; i++){
                pagelist[i].classList.replace("current", "notcurrent");
            }

            pagelist[4].classList.replace("notcurrent", "current");
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
