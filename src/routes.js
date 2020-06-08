const { Router, urlencoded } = require("express")
const routes  = Router()

const Points = require('./models/Points')

routes.use(urlencoded({ extended: true }))

routes.get("/", (request, response) => {
    return response.render("index.html")
})

routes.get("/create-point", (request, response) => {
    const { error } = request.query

    return response.render("create-point.html", { error })
})

routes.post("/create-point", async(request, response) => {
    try {
        let { 
            image, 
            name, 
            address, 
            address2, 
            state_name, 
            city_name, 
            items 
        } = request.body

        items = items.replace(/,/g, ", ")
        
        await Points.post([
            String(name),
            String(image),
            String(address),
            String(address2),
            String(state_name),
            String(city_name),
            String(items)
        ])
        
        return response.render("create-point.html", { saved: true })
    } catch (error) {
        console.error(error)
        return response.redirect("/create-point?error=Erro ao inserir dados na tabela, tente novamente")
    }
})

routes.get("/search", async(request, response) => {
    try {
        const { search } = request.query
        if(search == "") {
            return response.render("search-results.html", { total: 0 })
        }
        
        const places = await Points.find(search)
        const total = places.length
    
        return response.render("search-results.html", { places, total })
    } catch (error) {
        console.error(error)
        return response.redirect("/create-point?error=Ponto de Coleta não encontrado")
    }
})

module.exports = routes