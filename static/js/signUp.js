'use strict';

var reg = document.getElementById("register");
var log = document.getElementById("login");
var logTab = document.getElementById("log-tab");
var regTab = document.getElementById("reg-tab");

regTab.addEventListener("click", function(){
	logTab.classList.remove("is-active");
	regTab.classList.add("is-active");
	log.style.display = "none";
	reg.style.display = "";
});

logTab.addEventListener("click", function(){
	logTab.classList.add("is-active");
	regTab.classList.remove("is-active");
	log.style.display = "";
	reg.style.display = "none";
});

let hide = document.querySelectorAll("[data-hide]");
for(let h of hide){
	h.addEventListener("click", function(e){
		e.target.parentNode.style.display = "none";
	});
}