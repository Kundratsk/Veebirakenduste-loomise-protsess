//soovin näidata nime ja vanust, aga võetakse kogu objekti sisu
//kuna kasutatakse User type
function renderUserDetails(user) {
    console.log(user.name, user.age);
}
var user = {
    id: "ads",
    name: "Kyle",
    age: 123,
    address: {
        street: "sdf",
        city: "London"
    }
};
renderUserDetails(user);
