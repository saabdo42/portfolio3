var links = document.querySelectorAll(".link");
var linklist = Array.from(links);
var logo = document.getElementById("logo");
var copyright = document.getElementById("copyright");
var logosrcs = ["images/logogreen.png", "images/logoblue.png", "images/logopink.png"];
var colors = [ "#96cc72", "#b4d8f2", "#f6b1cf" ]
var pos = 0;
var changed = false;

var currentpg;

var sections = document.querySelectorAll("section");
var sectionlist = Array.from(sections);

var nav = document.querySelector("nav");
var burg = document.getElementById("burger");

var backbutton = document.getElementById("back");
var nextbutton = document.getElementById("next");
var closebutton = document.getElementById("close");
var skrb = document.getElementById("skrb");

var thms = document.querySelectorAll(".artthmtitle");
var thmlist = Array.from(thms);

var drops = document.querySelectorAll(".drop");
var droplist = Array.from(drops);

document.addEventListener("keydown", keyboardShortcuts);

let timeoutover = true; //timeout for the scroll so ur computer doesn't crash
function retimer(){
    timeoutover = true;
}
 
function keyboardShortcuts(event) { //keyboard shortcuts

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        bac();
    }else if (event.key === "ArrowRight"){
        event.preventDefault();
        nex();
    }else if (event.key === "Escape" ){
        closedrop();
    }else{
        return;
    }
}

function logoswitcher(){ //switches the logo when you scroll past it :)
    
    logo.src = logosrcs[pos];
    copyright.style.color = colors[pos];

    if (scrollY > window.innerHeight && changed == false ){
        changed = true;
        pos++;
    }
    if (scrollY < window.innerHeight ){
        changed = false;
    }
    if (pos > logosrcs.length - 1 ){
        pos = 0;
    }
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

function mobilehidenav() {
    if (window.innerWidth > 600){
        nav.classList = "vis"
    }else{
        nav.classList = "invis"
        burg.classList = "vis"
    }
}

function burger() {
    if (isvisible(nav) == true){
        hide(nav)
    }else{
        reveal(nav)
    } 
}

function mobilenavclick() { //hides the nav after clicking a link on mobile
    if ( window.innerWidth < 600 ){
        hide(nav);
    }
}

function highlightsection() { //highlights the nav link of what section ur scrolled to 

    if (timeoutover == false){
        return;
    }else{

        timeoutover = false;
        setTimeout(retimer, 100);

        if (scrollY < sectionlist[0].offsetTop ){ 
            
            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }

        } else if( scrollY > sectionlist[0].offsetTop && scrollY < sectionlist[1].offsetTop ){

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }
            linklist[0].classList.replace("notcurrent", "current");

        } else if( scrollY > sectionlist[1].offsetTop && scrollY < sectionlist[2].offsetTop ){

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }
            linklist[1].classList.replace("notcurrent", "current");

        } else if( scrollY > sectionlist[2].offsetTop && scrollY < sectionlist[3].offsetTop ){

            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }
            linklist[2].classList.replace("notcurrent", "current");

        } else if ( scrollY > sectionlist[3].offsetTop ){
            for (i=0; i < linklist.length; i++){
                linklist[i].classList.replace("current", "notcurrent");
            }
            linklist[3].classList.replace("notcurrent", "current");
        }
    }
}

function closedrop() {  //loop hide all descriptions
    for (i = 0; i < droplist.length; i++) {
        hide(droplist[i]);
    }
    hide(backbutton);
    hide(nextbutton);
    hide(closebutton);
    hide(skrb);
}

function opendesc(thingie) {  //reveal description of the box u clicked on

    var whichthm = thmlist.indexOf(thingie);

    var bigimgs = droplist[whichthm].getElementsByClassName("bigimg");  //expanding the first thmnail
    var thmnail = droplist[whichthm].getElementsByClassName("descimg");
    bigimgs[0].src = thmnail[0].src;

    if ( !bigimgs[0].parentElement.parentElement.parentElement.classList.contains("haspdf")){
        reveal(bigimgs[0]);
    }

    reveal(droplist[whichthm]);
    reveal(backbutton);
    reveal(nextbutton);
    reveal(closebutton);
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

    if (droplist[nextvisdesc].classList.contains("haspdf") == true){ //if there's a pdf
        reveal(droplist[nextvisdesc].querySelector(".window")); //show pdf not bigimg
        hide(droplist[nextvisdesc].querySelector(".bigimg"))
    } 
    else{
        bigimgs[0].src = thmnails[0].src; //otherwise expand the first thmnail
    }
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
    
    if (droplist[nextvisdesc].classList.contains("haspdf") == true) //if there's a pdf
    {
        reveal(droplist[nextvisdesc].querySelector(".window")); //show pdf not bigimg
        hide(droplist[nextvisdesc].querySelector(".bigimg"))
    } 
    else{
        bigimgs[0].src = thmnails[0].src; //otherwise expand the first thmnail
    }
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