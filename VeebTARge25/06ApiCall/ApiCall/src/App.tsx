import { useState } from "react"; // Reacti hook, mis võimaldab kasutada komponentides seisundit (state)
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion teek animatsioonide jaoks
import "./App.css"; // Impordib CSS-stiilid

interface JokeResponse {
  value: string; // Määrab API vastuse andmetüübi (objektil on 'value', mis on nali)
}

export default function App() { // Peamine rakenduse komponent
  const [joke, setJoke] = useState<string>(""); // Hoiab nalja teksti
  const [loading, setLoading] = useState<boolean>(false); // Näitab, kas nali laeb hetkel
  const [error, setError] = useState<string | null>(null); // Kui midagi läheb valesti, salvestatakse veateade

  const fetchJoke = async () => { // Funktsioon, mis toob nalja API-st
    setLoading(true); // Näitab, et laadimine algas
    setError(null); // Nullib veateated

    try {
      const response = await fetch("[api.chucknorris.io](https://api.chucknorris.io/jokes/random)"); // Küsib juhusliku nalja Chuck Norrise API-st

      if (!response.ok) { // Kui vastus pole korras (nt 404)
        throw new Error("API error"); // Visatakse viga
      }

      const data: JokeResponse = await response.json(); // Teisendab vastuse JSON-iks
      setJoke(data.value); // Paneb nalja ekraanile
    } catch (err) {
      setError("Failed to fetch a joke"); // Kui midagi läheb valesti, näitab veateadet
      setJoke(""); // Nullib vana nalja
    } finally {
      setLoading(false); // Ükskõik mis juhtub – lõpetab laadimise
    }
  };

  return ( // JSX osa ehk see, mis tegelikult ekraanile renderdatakse
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"> 
      {/* Peamine konteiner – täisekraan, tsentreeritud, hele taust */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Algse oleku animatsioon – kergelt väiksem ja läbipaistmatu
        animate={{ opacity: 1, scale: 1 }} // Lõppolek – täissuurus ja nähtav
        transition={{ duration: 0.4 }} // Animatsiooni kestus
        className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center" // Kujundusklassid
      >
        <img 
          width="200" height="200" 
          src="https://api.chucknorris.io/img/avatar/chuck-norris.png" 
          className="shake" 
          alt="Chuck" 
        /> {/* Chuck Norrise pilt */}

        <h1 className="text-2xl font-bold mb-4">Chuck Norris Jokes</h1> {/* Pealkiri */}

        <div className="min-h-[80px] flex items-center justify-center"> 
          {/* Ala, kus nali või laadimine kuvatakse */}
          <AnimatePresence mode="wait"> 
            {/* Võimaldab elementide vahetamisel sujuvaid animatsioone */}
            
            {loading && ( // Kui nalja laaditakse
              <motion.p
                key="loading"
                initial={{ opacity: 0, y: 10 }} // Alustatakse kerge liikumisega
                animate={{ opacity: 1, y: 0 }} // Tuleb nähtavale
                exit={{ opacity: 0, y: -10 }} // Kaob sujuvalt
              >
                Loading...
              </motion.p>
            )}

            {error && !loading && ( // Kui on viga ja parasjagu ei laeta
              <motion.p
                key="error"
                className="text-red-500" // Punane tekst
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error} {/* Kuvab veateate */}
              </motion.p>
            )}

            {!loading && !error && joke && ( // Kui kõik on korras ja nali olemas
              <motion.p
                key={joke} // Unikaalne võti iga nalja jaoks
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {joke} {/* Näitab nalja */}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={fetchJoke} // Nupuvajutusel toob uue nalja
          whileHover={{ scale: 1.05 }} // Kergelt suureneb hoveril
          whileTap={{ scale: 1.05 }} // Surumisel ka
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition" // Kujundus sinise nupuga
        >
          New Joke {/* Nupu tekst */}
        </motion.button>
      </motion.div>
    </div>
  );
}
