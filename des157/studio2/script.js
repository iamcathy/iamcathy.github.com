(function (){
    "use strict";
    console.log("reading js");

    const navLinks = document.querySelectorAll('nav ul li a');
    //gets each nav link
    navLinks.forEach(function(eachLink){
        eachLink.addEventListener('click', smoothScroll);
    });
    //smooth scrolling function
    function smoothScroll(event) {
        event.preventDefault();
        
        const targetID = event.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);

        const originalTop = Math.floor(targetAnchor.getBoundingClientRect().top) - 50;
        window.scrollBy({top: originalTop, left: 0, behavior: "smooth"});
        console.log(originalTop);
    } 
})();