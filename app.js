const express = require("express");
const app = express();
const path = require("path")


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));


app.use((req, res, next) => {
    console.log("your request has been successfully received");
    next();
});


app.get("/", (req, res) => {
    const blogs = [{
        title: "Best of Paris in 7 Days Tour",
        snippet: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas.",
        body: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!"
    },
    {
        title: "Best of Ireland in 14 Days Tour",
        snippet: "Rick Steves' Best of Ireland tour kicks off with the best of Dublin, followed by Ireland's must-see historical sites, charming towns, music-filled pubs, and seaside getaways",
        body: "Rick Steves' Best of Ireland tour kicks off with the best of Dublin, followed by Ireland's must-see historical sites, charming towns, music-filled pubs, and seaside getaways — including Kinsale, the Dingle Peninsula, the Cliffs of Moher, the Aran Islands, Galway, Connemara, Giant's Causeway, and the compelling city of Belfast. All along the way, Rick's guides will share their stories to draw you in to the Emerald Isle, and the friendliness of the people will surely steal your heart. Join us for the Best of Ireland in 14 Days!"
    },
    {
        title: "Best of Salzburg & Vienna in 8 Days Tour",
        snippet: "Let's go where classical music, towering castles, and the-hills-are-alive scenery welcome you to the gemütlichkeit of Bavaria and opulence of Austria's Golden Age.",
        body: "Let's go where classical music, towering castles, and the-hills-are-alive scenery welcome you to the gemütlichkeit of Bavaria and opulence of Austria's Golden Age. Your Rick Steves guide will bring this region's rich history and culture to life in festive Munich, Baroque Salzburg, sparkling Lake Hallstatt, monastic Melk, the blue Danube, and royal Vienna — with cozy villages and alpine vistas all along the way. Join us for the Best of Munich, Salzburg & Vienna in 8 Days!"
    }
    ];

    res.render("index", { title: "home", blogs })
});

app.get("/about", (req, res) => {
    res.render("about", { title: "about" })
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "create blog" })
});

app.use((req, res) => {
    res.render("404", { title: "Not Found" })
})

module.exports = app;