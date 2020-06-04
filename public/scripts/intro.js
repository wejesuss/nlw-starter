const statesSelect = document.querySelector("select[name=uf]")
const citiesSelect = document.querySelector("select[name=city]")

const stateInput = document.querySelector("input[name=state_name]")
const cityInput = document.querySelector("input[name=city_name]")

function clearSelect(select, message) {
    select.innerHTML = `<option value="">${message}</option>`
}

async function populate(url) {
    let data = []

    await fetch(url)
    .then(res => res.json())
    .then(values => {
        data = values
    })
    
    return data
}

async function populateStates() {
    const states = await populate("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    clearSelect(statesSelect, "Selecione o Estado")
    for (const state of states) {
        statesSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
}

async function populateCities(event) {
    citiesSelect.value = ""
    const ufId = event.target.value

    const indexOfTheState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfTheState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/distritos?orderBy=nome`

    clearSelect(citiesSelect, "Selecione a Cidade")
    citiesSelect.setAttribute("disabled", "true")
    if(statesSelect.value !== "") {
        const cities = await populate(url)
        for (const city of cities) {
            citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citiesSelect.removeAttribute("disabled")
    } else {
        citiesSelect.setAttribute("disabled", "true")
        citiesSelect.value = ""
    }
}

function getCityName(event) {
    const indexOfTheCity = event.target.selectedIndex
    cityInput.value = event.target.options[indexOfTheCity].text
}

populateStates()

statesSelect
.addEventListener("change", populateCities)

citiesSelect
.addEventListener("change", getCityName)


// Prevents submit
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
const selects = document.querySelectorAll("select")

form.addEventListener("submit", (event) => {
    let canSubmit = true

    inputs.forEach(input => {
        if(input.value === "" && input.type !== "hidden") canSubmit = false
    })

    selects.forEach(select => {
        if(select.value === "") canSubmit = false
    })

    if(!canSubmit) {
        event.preventDefault()
        return false
    }
})


// collection items
const itemsToCollect = document.querySelectorAll("li")
const selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(event) {
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    const indexOfTheSelected = selectedItems
        .findIndex(id => id == itemId)
    
    if(indexOfTheSelected >= 0) {
        selectedItems.splice(indexOfTheSelected, 1)
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}