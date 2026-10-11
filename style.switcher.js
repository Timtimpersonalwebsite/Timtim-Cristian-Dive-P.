/* ======================================= toggle Style switcher ================================= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
if (styleSwitcherToggle) {
    styleSwitcherToggle.addEventListener("click", () => {
        document.querySelector(".style-switcher").classList.toggle("open");
    });
}

// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    const switcher = document.querySelector(".style-switcher");
    if (switcher && switcher.classList.contains("open")) {
        switcher.classList.remove("open");
    }
});

/* ======================================= theme colors ================================= */
const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyle.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
            localStorage.setItem("color-theme", color);
        } else {
            style.disabled = true;
        }
    });
}

/* ======================================= theme light and dark mode ================================= */
const dayNight = document.querySelector(".day-night");
if (dayNight) {
    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme-mode", "dark");
        } else {
            localStorage.setItem("theme-mode", "light");
        }
    });
}

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme-mode");
    if (dayNight) {
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            dayNight.querySelector("i").classList.add("fa-sun");
            dayNight.querySelector("i").classList.remove("fa-moon");
        } else if (savedTheme === "light") {
            document.body.classList.remove("dark");
            dayNight.querySelector("i").classList.add("fa-moon");
            dayNight.querySelector("i").classList.remove("fa-sun");
        } else {
            if (document.body.classList.contains("dark")) {
                dayNight.querySelector("i").classList.add("fa-sun");
            } else {
                dayNight.querySelector("i").classList.add("fa-moon");
            }
        }
    }

    const savedColor = localStorage.getItem("color-theme");
    if (savedColor) {
        setActiveStyle(savedColor);
    }
});