function navigate(page) {
    window.location.href = page;
}

function goHome() {
    window.location.href = "home.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;

    if (page === "home") {
        document.getElementById("home").classList.add("active");
    } else if (page === "televisions") {
        document.getElementById("tv").classList.add("active");
    } else if (page === "about") {
        document.getElementById("about").classList.add("active");
    }
});
