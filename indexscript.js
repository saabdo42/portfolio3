var navlinks = document.querySelectorAll(".navlink");
var navlinklist = Array.from(navlinks);
var logo = document.getElementById("logo");
var copyright = document.getElementById("copyright");
var logosrcs = ["images/logogreen.png", "images/logoblue.png", "images/logopink.png"];
var colors = [ "#96cc72", "#b4d8f2", "#f6b1cf" ]
var logoversion = 0;
var logochanged = false;

var nav = document.querySelector("nav");
var burg = document.getElementById("burger");

var backbutton = document.getElementById("back");
var nextbutton = document.getElementById("next");
var closebutton = document.getElementById("close");
var dimmer2 = document.getElementById("dimmer2");

var sections = document.querySelectorAll("section");
var sectionlist = Array.from(sections);

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
    
    logo.src = logosrcs[logoversion];
    copyright.style.color = colors[logoversion];

    if (scrollY > window.innerHeight && logochanged == false ){
        logochanged = true;
        logoversion++;
    }
    if (scrollY < window.innerHeight ){
        logochanged = false;
    }
    if (logoversion > logosrcs.length - 1 ){
        logoversion = 0;
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
            
            for (i=0; i < navlinklist.length; i++){
                navlinklist[i].classList.replace("current", "notcurrent");
            }

        } else if( scrollY > sectionlist[0].offsetTop && scrollY < sectionlist[1].offsetTop ){

            for (i=0; i < navlinklist.length; i++){
                navlinklist[i].classList.replace("current", "notcurrent");
            }
            navlinklist[0].classList.replace("notcurrent", "current");

        } else if( scrollY > sectionlist[1].offsetTop && scrollY < sectionlist[2].offsetTop ){

            for (i=0; i < navlinklist.length; i++){
                navlinklist[i].classList.replace("current", "notcurrent");
            }
            navlinklist[1].classList.replace("notcurrent", "current");

        } else if( scrollY > sectionlist[2].offsetTop && scrollY < sectionlist[3].offsetTop ){

            for (i=0; i < navlinklist.length; i++){
                navlinklist[i].classList.replace("current", "notcurrent");
            }
            navlinklist[2].classList.replace("notcurrent", "current");

        } else if ( scrollY > sectionlist[3].offsetTop ){
            for (i=0; i < navlinklist.length; i++){
                navlinklist[i].classList.replace("current", "notcurrent");
            }
            navlinklist[3].classList.replace("notcurrent", "current");
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
    hide(dimmer2);
}

function opendesc(clickedthm) {  //reveal description of the box u clicked on

    var whichthm = thmlist.indexOf(clickedthm);

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
    reveal(dimmer2);
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

function enlarge(hoveredimg) { //enlarges thumbnails

    var newimgsrc = hoveredimg.src;
    var allbigimgs = document.getElementsByClassName("bigimg");
    var allpdfwindows = document.getElementsByClassName("window");
    
    if (hoveredimg.classList.contains("pdfthm") == true){ //if thumbnail is tagged as pdf

        for (k=0; k<allpdfwindows.length; k++) { //show all pdf windows
            reveal(allpdfwindows[k]);
        }
        for (j=0; j<allbigimgs.length; j++) { //hide all bigimg
            hide(allbigimgs[j]);
        }

    }else{ //if thumbanil is not tagged as pdf
        
        for (h=0; h<allpdfwindows.length; h++) { //hide all pdf windows
            hide(allpdfwindows[h]);
        }
        for (k=0; k<allbigimgs.length; k++) { //show all bigimg
            reveal(allbigimgs[k]);
            allbigimgs[k].src = newimgsrc; //choose which bigimg to show
        }
    }
}