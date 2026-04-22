import { useState} from "react";


export default function ItemForm({onAdd}: any) {
    const [value, setValue] = useState("");

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => {onAdd(value); setValue(""); }}>
                Lisa andmeid
            </button>
        </div>
    );


}