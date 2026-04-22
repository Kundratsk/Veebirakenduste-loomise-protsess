import sql from "mssql";

export const dbConfig: sql.config = {
    user: "sa", // SQL Serveri kasutajanimi (tavaliselt 'sa')
    password: "SinuParool123", // SQL kasutaja parool
    server: "localhost", // Kui andmebaas on samas arvutis
    database: "SinuAndmebaasiNimi", // Lisa siia andmebaasi nimi!
    options: {
        encrypt: false, // Kohaliku serveri puhul false
        trustServerCertificate: true // VAJALIK: lubab ühenduse ilma SSL sertifikaadita
    },
    port: 1433 // Tavaline MS SQL port
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log(' Ühendus MS SQL-iga loodud!');
        return pool;
    })
    .catch(err => {
        console.error(' Ühenduse viga:', err);
        throw err;
    });
