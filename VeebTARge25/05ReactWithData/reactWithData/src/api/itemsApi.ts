import axios from "../../node_modules/axios"
/* Axios on Promise-põhine JavaScripti library, mida kasutatakse
HTTP-päringute tegemiseks nii veebis kui ka Node.js keskkonnas.
Lihtsustab andmevahetust serveritga(REST API-d) */ 

const API = "http://localhost:4000/api/items"


export const fetchItems = () => axios.get(API);
export const createItem = ( name: string) => axios.post(API, { name });
export const deleteItem = ( id: number) => axios.delete(`${API}/${id}`); 
