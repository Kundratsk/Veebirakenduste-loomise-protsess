function getUser(id: string) {
    return {name: "Kyle", id}
}

//tagastab meile väärtused, mis on selle funktsiooni sees
//kui lisan funktsiooni uue muutuja, siis näitab seda tulemuses
type J = ReturnType<typeof getUser>

type L = Parameters<typeof getUser>