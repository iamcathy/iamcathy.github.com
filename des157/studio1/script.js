(function(){
    "use strict";

    const form = document.querySelector("#myForm");
    const story = document.querySelector("#story");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const noun1 = document.querySelector("#noun1").value;
        const noun2 = document.querySelector("#noun2").value;
        const adj1 = document.querySelector("#adj1").value;
        const verb1 = document.querySelector("#verb1").value;

        if (noun1 && noun2 && adj1 && verb1) {
            story.innerHTML = `Here are your words: ${noun1}, ${noun2}, ${adj1}, ${verb1}`;
        } else {
            alert("Fill out all of the fields to get your Mad Lib!");
        }

        // clear fields
        document.querySelector("#noun1").value = "";
        document.querySelector("#noun2").value = "";
        document.querySelector("#adj1").value = "";
        document.querySelector("#verb1").value = "";
    });
}());