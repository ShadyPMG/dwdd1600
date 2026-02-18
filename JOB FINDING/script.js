// Filter Function
function filterSelection(category) {
    let cards = document.getElementsByClassName("project-card");
    let buttons = document.querySelectorAll(".filter-buttons button");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    for (let i = 0; i < cards.length; i++) {
        if (category === "all") {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display =
                cards[i].classList.contains(category) ? "block" : "none";
        }
    }
}

// Modal
function openModal(element) {
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modal-img");

    modal.style.display = "block";
    modalImg.src = element.querySelector("img").src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Default show all
filterSelection("all");
