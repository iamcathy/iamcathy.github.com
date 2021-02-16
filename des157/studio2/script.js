(function (){
    "use strict";
    console.log("reading js");

    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(function(eachLink){
        eachLink.addEventListener('click', smoothScroll);
    });

    function smoothScroll(event) {
        event.preventDefault();
        
        const targetID = event.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);

        const originalTop = Math.floor(targetAnchor.getBoundingClientRect().top) - 50;
        window.scrollBy({top: originalTop, left: 0, behavior: "smooth"});
        console.log(originalTop);
    } 
})();
    
window.addEventListener("load", function(){
    const navLinks = document.querySelectorAll("nav ul li a");
    const posts = document.querySelectorAll("section");
    let postTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter = 1;

    window.addEventListener("scroll", function() {
        pagetop = window.pageYOffset + 250;

        if (pagetop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        } else if (counter > 1 && pagetop < postTops [counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }
        if (counter != prevCounter) {
            navLinks.forEach(function(eachLink) {
                eachLink.removeAttribute("class");
            });
        }
    });
});