(function(){
    "use strict";
    console.log("reading js");

    //canvas stuff

    let isDrawing = false;
    let x = 0;
    let y = 0;

    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearBtn');

    canvas.addEventListener('mousedown', event => {
        x = event.offsetX;
        y = event.offsetY;
        isDrawing = true;
    });
      
    canvas.addEventListener('mousemove', event => {
    if (isDrawing === true) {
        drawLine(context, x, y, event.offsetX, event.offsetY);
        x = event.offsetX;
        y = event.offsetY;
    }
    });
    
    window.addEventListener('mouseup', event => {
    if (isDrawing === true) {
        drawLine(context, x, y, event.offsetX, event.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
    });

    clearBtn.addEventListener('mousedown', event => {
        clearCanvas();
    });

    function drawLine(context, x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = '#2c13e1';
        context.lineWidth = 3;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    function clearCanvas() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    //formstuff

    const form = document.querySelector("#myForm");
    const story = document.querySelector("#story");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const fruit = document.querySelector("#fruit").value;
        const veg = document.querySelector("#veg").value;
        const protein = document.querySelector("#protein").value;
        const dish = document.querySelector("#dish").value;
        const drink = document.querySelector("#drink").value;

        if (fruit && veg && protein && dish && drink) {
            //show overlay
            document.getElementById("overlay").className = "showing";

            story.innerHTML = `Let's make ${dish}! <br> We can add ${fruit}, ${veg}, ${protein}, and a splash of ${drink} to it. Since those are all our
            favorite ingredients, it should taste great! 🤩`;
            document.getElementById("story").style.padding = "40px 60px 50px 50px";
        } else {
            alert("Fill out all of the fields to get your Mad Lib!");
        }

        // clear fields
        document.querySelector("#fruit").value = "";
        document.querySelector("#veg").value = "";
        document.querySelector("#protein").value = "";
        document.querySelector("#dish").value = "";
        document.querySelector("#drink").value = "";
    });

    //more overlay stuff
    document.querySelector(".close").addEventListener("click", function(){
        event.preventDefault();
        document.getElementById("overlay").className = "hidden";
    });

    document.addEventListener('keydown', function(event){
        if (event.key === "Escape") {
            document.getElementById("overlay").className = "hidden";
        }
    });
}());