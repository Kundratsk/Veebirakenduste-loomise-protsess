type User = {
    id: string
    name: string
    age: number
    address: {
        street: string
        city: string
    }
}

const user: User = {
    id: "ads",
    name: "Kyle",
    age: 123,
    address: {
        street: "sdf",
        city: "London"
    }
}

//omit kasutamine tähendab properti eemaldamist User typest
//kui console logi kirjutada user.id, siis anab veateate kuna Omit välistab selle
function createUser(user: Omit<User, "id">) {
    console.log(user.name, user.age, user.address)
}

//kui kasutan Partial-t, siis kõik muutujad on valikulised
function updateUser(user:Partial<User>) {

}


createUser({name: "Ironman", age: 567, address: {street: "asd", city: "asdcity"}})