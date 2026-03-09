// HERO PARALLAX

const hero = document.querySelector(".hero");

if(hero){
window.addEventListener("scroll",()=>{
let offset = window.scrollY;
hero.style.transform = `translateY(${offset*0.3}px)`;
});
}

// REVEAL ANIMATION

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

reveals.forEach(el=>{

const windowHeight = window.innerHeight;
const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active");
}

});

}

window.addEventListener("scroll",revealOnScroll);
window.addEventListener("load",revealOnScroll);


// CATEGORY FILTER

const categoryLinks = document.querySelectorAll(".work-categories a");
const projects = document.querySelectorAll(".project");

categoryLinks.forEach(link=>{

link.addEventListener("click",e=>{

e.preventDefault();

categoryLinks.forEach(l=>l.classList.remove("active"));
link.classList.add("active");

const category = link.dataset.category;

projects.forEach(project=>{

const type = project.dataset.type;

if(category === "all" || type === category){
project.classList.remove("hide");
}
else{
project.classList.add("hide");
}

});

});

});


// LIGHTBOX

const images = document.querySelectorAll(".project img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const title = document.getElementById("lightbox-title");
const desc = document.getElementById("lightbox-desc");

const closeBtn = document.querySelector(".lightbox-close");

const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let galleryImages = [];
let currentIndex = 0;


// OPEN

images.forEach(img=>{

img.addEventListener("click",()=>{

const gallery = img.dataset.gallery;

if(gallery){
galleryImages = gallery.split(",");
currentIndex = 0;
}else{
galleryImages = [img.src];
currentIndex = 0;
}

showImage();

title.textContent = img.dataset.title || "";
desc.textContent = img.dataset.desc || "";

lightbox.classList.add("active");

});

});


// SHOW IMAGE

function showImage(){

lightboxImg.src = galleryImages[currentIndex].trim();

}


// NEXT

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex >= galleryImages.length){
currentIndex = 0;
}

showImage();

});


// PREV

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex < 0){
currentIndex = galleryImages.length - 1;
}

showImage();

});


// CLOSE

closeBtn.addEventListener("click",()=>{
lightbox.classList.remove("active");
});

lightbox.addEventListener("click",e=>{
if(e.target === lightbox){
lightbox.classList.remove("active");
}
});

// ===============================
// DOUBLE CLICK ZOOM + PAN ON MOVE
// ===============================

let zoomed = false;

// DOUBLE CLICK TO TOGGLE ZOOM
lightboxImg.addEventListener("dblclick", (e) => {

const rect = lightboxImg.getBoundingClientRect();

const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;

if(!zoomed){

lightboxImg.style.transformOrigin = `${x}% ${y}%`;
lightboxImg.style.transform = "scale(1.6)";
lightboxImg.style.cursor = "zoom-out";

zoomed = true;

}else{

lightboxImg.style.transform = "scale(1)";
lightboxImg.style.transformOrigin = "center";
lightboxImg.style.cursor = "zoom-in";

zoomed = false;

}

});


// PAN IMAGE WHEN ZOOMED (FOLLOW MOUSE)

lightboxImg.addEventListener("mousemove", (e) => {

if(!zoomed) return;

const rect = lightboxImg.getBoundingClientRect();

const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;

lightboxImg.style.transformOrigin = `${x}% ${y}%`;

});
