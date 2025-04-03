document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-container");
    const open = document.getElementById("home-click-here-signup"); 
    const close = document.querySelector(".close");
    const switchToSignup = document.getElementById("switchToSignup");

    // Open Modal
    open.addEventListener("click", (event) => {
        event.preventDefault()
        modal.classList.add('show')
    });

    // Close Modal
    close.addEventListener("click", () => {
        modal.classList.remove('show')
    });
    });

