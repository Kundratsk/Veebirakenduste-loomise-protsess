type UserRequired = { 
    //võin iga property ette panna read only
    //readonly on sellepärast, et saab ainult lugeda 
    //readonly id: string
    id: string
    name: string
    age: number
    // ? - tähendab valikulist muutujat
    address?: {
        street: string
        city: string
    }
}

//kui hoiad T tähe peal kursorit, siis näed, et propertid on readonly-ks muudetud
type T = Readonly<UserRequired>

//oletame, et tahame, et see properti oleks kindlasti kasutatud
//vastupidine Partialile
function createUserWithAddress(user: Required<UserRequired>) {}

// külmutab kõik objekti sees ja ei saa kasutada
//Object.freeze()