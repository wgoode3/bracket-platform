'use strict';

let hide = document.querySelectorAll("[data-hide]");
for(let h of hide){
    h.addEventListener("click", function(e){
        e.target.parentNode.style.display = "none";
    });
}