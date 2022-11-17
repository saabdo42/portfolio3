var links = document.querySelectorAll(".link");
var linklist = Array.from(links);
var currentpg;

var menu = document.getElementById("menu");

var backbutton = document.getElementById("back");
var nextbutton = document.getElementById("next");
var skrb = document.getElementById("skrb");

var thms = document.querySelectorAll(".artthm");
var thmlist = Array.from(thms);

var drops = document.querySelectorAll(".drop");
var droplist = Array.from(drops);

let timeoutover = true; //timeout for the scroll so ur computer doesn't crash
function retimer(){
    timeoutover = true;
}

function isvisible(check){ //checks for visible
    if (check.classList.contains("vis")){
        return true;
    }else if (check.classList.contains("invis")){
        return false;
    }
}

function hide(object){ //hides
    object.classList.replace("vis", "invis");
}

function reveal(object){ //reveals
    object.classList.replace("invis", "vis");
}

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
            
            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

        } else if(scrollY > window.innerHeight && scrollY < window.innerHeight * 1.6){ //about page is at 1xviewport

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

            linklist[0].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 1.6 && scrollY < window.innerHeight * 2.6){ //recent page is at 1.6xviewport

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

            linklist[1].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 2.6 && scrollY < window.innerHeight * 4.6){ //art page is at 2.6xviewport

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

            linklist[2].classList.replace("notcurrent", "current");

        }else if(scrollY > window.innerHeight * 4.6 && scrollY < document.body.scrollHeight - window.innerHeight * 1.1){ //insta page is at 4.6xviewport

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

            linklist[3].classList.replace("notcurrent", "current");

        }else if(scrollY > document.body.scrollHeight - window.innerHeight * 1.1){ //contact page is 1.1 viewport up

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

            linklist[4].classList.replace("notcurrent", "current");
        }
    }
}

function cloze() {  //loop hide all descriptions    
    for (i = 0; i < droplist.length; i++) {
        hide(droplist[i]);
    }
    hide(backbutton);
    hide(nextbutton);
    hide(skrb);
}

function opendesc(thingie) {  //reveal description of the box u clicked on

    var whichthm = thmlist.indexOf(thingie);

    var bigimgs = droplist[whichthm].getElementsByClassName("bigimg");  //expanding the first thmnail
    var thmnail = droplist[whichthm].getElementsByClassName("descimg");
    bigimgs[0].src = thmnail[0].src;

    reveal(droplist[whichthm]);
    reveal(backbutton);
    reveal(nextbutton);
    reveal(skrb);
}

function bac(){
    var currentvisdesc = undefined

    for (j = 0; j <droplist.length; j++) { //checking which desc isvisible
        
        if ( isvisible(droplist[j]) == true) {
            currentvisdesc = j; //storing it
        }
    }

    nextvisdesc = currentvisdesc - 1; //setting previous desc

    if (nextvisdesc < 0){ //on the first desc, previous desc is the last desc.....
        nextvisdesc = droplist.length -1; 
    }

    hide(droplist[currentvisdesc]);
    reveal(droplist[nextvisdesc]);

    var bigimgs = droplist[nextvisdesc].getElementsByClassName("bigimg");
    var thmnails = droplist[nextvisdesc].getElementsByClassName("descimg");
    bigimgs[0].src = thmnails[0].src; //expanding the first thmnail
}

function nex(){
    var currentvisdesc = undefined 

    for (j = 0; j <droplist.length; j++) { //checking which desc isvisible
        
        if ( isvisible(droplist[j]) == true) {
            currentvisdesc = j; //storing it
        }
    }

    nextvisdesc = currentvisdesc + 1; //setting next desc

    if (nextvisdesc >= droplist.length){ //on the last desc, next desc is the first desc.....
        nextvisdesc = 0; 
    }

    hide(droplist[currentvisdesc]);
    reveal(droplist[nextvisdesc]);

    var bigimgs = droplist[nextvisdesc].getElementsByClassName("bigimg");
    var thmnails = droplist[nextvisdesc].getElementsByClassName("descimg");
    bigimgs[0].src = thmnails[0].src;
}

function enlarge(frog) { //enlarges thumbnails

    var newimgsrc = frog.src;
    var bois = document.getElementsByClassName("bigimg");
    var pdfs = document.getElementsByClassName("window");
    
    if (frog.classList.contains("pdfthm") == true){ //if thumbnail is tagged as pdf

        for (k=0; k<pdfs.length; k++) { //show all pdf windows
            reveal(pdfs[k]);
        }
        for (j=0; j<bois.length; j++) { //hide all bigimg
            hide(bois[j]);
        }

    }else{ //if thumbanil is not tagged as pdf
        
        for (h=0; h<pdfs.length; h++) { //hide all pdf windows
            hide(pdfs[h]);
        }
        for (k=0; k<bois.length; k++) { //show all bigimg
            reveal(bois[k]);
            bois[k].src = newimgsrc; //choose which bigimg to show
        }
    }
}

function enlargerec(thumbnail) { //enlarges thumbnails of recent section

    var newimgsrc = thumbnail.src;
    var recimg = document.getElementById("bigimgrec");
    var recpdf = document.getElementById("windowrec");
    
    if (thumbnail.classList.contains("pdfthm") == true){ //if thumbnail is tagged as pdf
        reveal(recpdf); //hides img and shows pdf
        hide(recimg);
    }else{
        hide(recpdf); //hides pdf and shows img
        reveal(recimg); 
        recimg.src = newimgsrc; //choose which bigimg to show
    }
}