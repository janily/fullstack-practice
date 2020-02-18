const items = [
    {name: 'nike',   price: 200},
    {name: 'lining',   price: 500},
    {name: 'adi',   price: 3000},
    {name: 'anta',   price: 500},
    {name: 'hxek',   price: 600},
    {name: 'pc',   price: 8000},
    {name: 'mouse',   price: 200}
]

const filteredItems = items.filter((item) => {
    return item.price <= 600
})

const itemName = items.map((item) => {
    return item.name
})


const foundItem = items.find((item) => {
    return item.name === 'mouse'
})

items.forEach((item) => {
    // console.log(item.name)
    // console.log(item.price)
})

const hasIndexpensiveItems = items.some((item) => {
    return item.price <= 600;
})

// console.log(hasIndexpensiveItems)

const hasIndexlessItems = items.every((item) => {
    return item.price <= 500;
})

const sum = items.reduce((currentPrice, item) => currentPrice + item.price, 0);

console.log(sum)

const box = [1,2,3,4,5]

const includesTwo = box.includes(6)

// console.log(includesTwo);



// console.log(hasIndexlessItems)

// console.log(foundItem);

// console.log(items)
// console.log(filteredItems);