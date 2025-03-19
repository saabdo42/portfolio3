var navlinks = document.getElementsByClassName("navlink");
var navlinklist = Array.from(navlinks);
var logo = document.getElementById("logo");
var copyright = document.getElementById("copyright");
var logosrcs = ["images/logogreen.png", "images/logoblue.png", "images/logopink.png"];
var colors = [ "#96cc72", "#b4d8f2", "#f6b1cf" ];
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
var thms = document.getElementsByClassName("artthmtitle");
var thmlist = Array.from(thms);
var projects = document.getElementsByClassName("drop");
var projectlist = Array.from(projects);

var screenheight;
var numberofsections;
var ismobile;

document.addEventListener("keydown", keyboardShortcuts);

timeoutover = true; //timeout for the scroll so ur computer doesn't crash
function retimer(){
    timeoutover = true;
}

function settingvariables(){
    screenheight = window.innerHeight;
    numberofsections = sectionlist.length;
    ismobile = (window.innerWidth < 600 );
}

function keyboardShortcuts(event) { //keyboard shortcuts

    event.preventDefault();

    if (event.key === "ArrowLeft") {
        bac();
    }else if (event.key === "ArrowRight"){
        nex();
    }else if (event.key === "Escape" ){
        closedrop();
    }
}

function logoswitcher(){ //switches the logo when you scroll past it :)

    if ( timeoutover = false ){
        return;
    }else if ( scrollY > screenheight * 2 ){
        return;
    }else{
        logo.src = logosrcs[logoversion];
        copyright.style.color = colors[logoversion];

        if ( scrollY > screenheight && logochanged == false ){
            logochanged = true;
            logoversion++;
        }
        if ( scrollY < screenheight ){
            logochanged = false;
        }
        if ( logoversion > logosrcs.length - 1 ){
            logoversion = 0;
        }
    }    
}

function isvisible(object){ //checks for visible
    if ( object.classList.contains("vis") ){
        return true;
    }else if ( object.classList.contains("invis") ){
        return false;
    }
}

function hide(object){ //hides an object
    if ( object ){
        object.classList.replace("vis", "invis"); //got errors for trying to hide a pdf when it didn't exist
    }
}

function show(object){ //shows an object
    if ( object ){
        object.classList.replace("invis", "vis");
    }
}

function mobilehidenav() { //hides menu on mobile
    switch( ismobile ){
        case false:
            show(nav);
            break;
        case true:
            hide(nav);
            show(burg);
    }
}

function burger() { //opens hamburger menu
    switch( isvisible(nav) ){
        case true:
            hide(nav);
            break;
        case false:
            show(nav);
    }
}

function mobilenavclick() { //hides the nav after clicking a link on mobile
    if ( ismobile ){
        hide(nav);
    }
}

function highlightsection(){ //highlights navlink of current section

    var currentnavlink = 0;
    
    if ( timeoutover == false ){
        return;
    }else{
        timeoutover = false;
        setTimeout(retimer, 300);
        
        for ( i=0; i < numberofsections; i++ ){ //for each section
            if ( sectionlist[i].getBoundingClientRect().top < (screenheight/2) && sectionlist[i].getBoundingClientRect().bottom > (screenheight/2)){ //if it's on screen
                navlinklist[i].classList.replace("notcurrent", "current"); //make this navlink current
                currentnavlink = i;
            }
        }
        for ( i=0; i < numberofsections; i++ ){ //for each section 
            if ( i != currentnavlink ){ //except the current
                navlinklist[i].classList.replace("current", "notcurrent"); //make it notcurrent
            }            
        }
    }
}

function closedrop(){ //closes open project

    for ( i=0; i<projectlist.length; i++ ){ //check which project is visible & hide it
        if ( isvisible(projectlist[i]) ){
            hide(projectlist[i]);
        }
    }
    hide(backbutton);
    hide(nextbutton);
    hide(closebutton);
    hide(dimmer2);
}

function openproject(clickedthm) {  //open clicked thumbnail

    var whichproject = thmlist.indexOf(clickedthm);

    show(projectlist[whichproject]);
    displayfirstdetail(projectlist[whichproject]);
    show(backbutton);
    show(nextbutton);
    show(closebutton);
    show(dimmer2);
}

function bac(){ //goes back one project

    var currentvisproj

    for ( i = 0; i <projectlist.length; i++ ) { //checking which project isvisible 
        if ( isvisible(projectlist[i]) ) {
            currentvisproj = i;
        }
    }

    prevproj = currentvisproj - 1; //finding previous project
    if ( prevproj < 0 ){ //looping array or something
        prevproj = projectlist.length - 1;
    }

    hide(projectlist[currentvisproj]);
    show(projectlist[prevproj]);
    displayfirstdetail(projectlist[prevproj]);
}

function nex(){ //goes forward one project
    
    var currentvisproj;

    for ( i = 0; i <projectlist.length; i++ ) { //checking which project isvisible
        if ( isvisible(projectlist[i]) ) {
            currentvisproj = i;
        }
    }

    nextproj = currentvisproj + 1; //finding next project
    if ( nextproj >= projectlist.length ){ //looping array or something
        nextproj = 0; 
    }

    hide(projectlist[currentvisproj]);
    show(projectlist[nextproj]);
    displayfirstdetail(projectlist[nextproj]);
}

function enlarge(hoveredimg) { //enlarges thumbnails

    var newimgsrc = hoveredimg.src;

    var corrbigimg = hoveredimg.parentElement.parentElement.querySelector(".bigimg");
    var corrwindow = hoveredimg.parentElement.parentElement.querySelector(".window");
    
    if ( hoveredimg.classList.contains("pdfthm") ){ 
        show(corrwindow);
        hide(corrbigimg);
    }else{
        hide(corrwindow);
        show(corrbigimg);
        corrbigimg.src = newimgsrc; //change source to match hovered image
    }
}

function displayfirstdetail(project){ //displays "window" or "bigimg" based on first detail image

    var corrwindow = project.querySelector(".window");
    var corrbigimg = project.querySelector(".bigimg");
    var firstdetailimg = project.querySelector(".descimg");

    if ( project.classList.contains("haspdf") ){
        show(corrwindow);
        hide(corrbigimg);
    }else{
        hide(corrwindow);
        show(corrbigimg);
        corrbigimg.src = firstdetailimg.src;
    }
}