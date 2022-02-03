// create the price-list
let items = [
    {name: "Galmar-Mini", price: 3200},
    {name: "Galmar-Standart", price: 6400},
    {name: "Galmar-Max", price: 10800},
    {name: "Насадка SDS-Max", price: 1020},
    {name: "Колодязь оглядовий", price: 1320},
    {name: "Щиток заземлення", price: 600},
    ]
    
    // transfer data from the price list to the HTML layout
    for (var i=0; i < items.length; i++) {
    index = i+1;
    document.getElementById("item-" + index + "-name").innerHTML = items[i].name;
    document.getElementById("item-" + index + "-price").innerHTML = items[i].price + " грн.";
    }
    