//harjutus 1
type User1 = {
    id: string
    name: string
    age: number
    address: {
        street: string
        city: string
    }
}



//soovin näidata nime ja vanust, aga võetakse kogu objekti sisu
//kuna kasutatakse User type
function renderUserDetails(user: User) {
    console.log(user.name, user.age)
}