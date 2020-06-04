const home = document.querySelector("#page-home")
const buttonSearch = home.querySelector("main a")
const modal = document.querySelector("#modal")
const closeModal = modal.querySelector(".header a")

buttonSearch.onclick = () => {
    modal.classList.remove("hide")
    home.style["user-select"] = "none"
}

closeModal.onclick = () => {
    modal.classList.add("hide")
    home.style["user-select"] = "initial"
}