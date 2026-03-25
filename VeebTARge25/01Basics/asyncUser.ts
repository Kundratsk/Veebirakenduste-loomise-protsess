// async võtab tegevused järjekorda ja ei viska neid tagasi ning töötleb neid järjekorra alusel
//kui ta viskaks tegevused tagasi siis paljud käsud ei realiseeruks
async function getUser(id: string) {
    return Promise.resolve({name: "sdf"})
}

type Y = Awaited<ReturnType <typeof getUser>>