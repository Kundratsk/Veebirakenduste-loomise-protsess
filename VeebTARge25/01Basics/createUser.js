"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    id: "ads",
    name: "Kyle",
    age: 123,
    address: {
        street: "sdf",
        city: "London"
    }
};
//omit kasutamine tähendab properti eemaldamist User typest
//kui console logi kirjutada user.id, siis anab veateate kuna Omit välistab selle
function createUser(user) {
    console.log(user.name, user.age, user.address);
}
//kui kasutan Partial-t, siis kõik muutujad on valikulised
function updateUser(user) {
}
createUser({ name: "Ironman", age: 567, address: { street: "asd", city: "asdcity" } });
//# sourceMappingURL=createUser.js.map