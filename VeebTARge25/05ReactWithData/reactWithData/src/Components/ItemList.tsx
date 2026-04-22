


export default function ItemList({items, onDelete}: any) {
    return (
        <ul>
            {items.map((i: any) => (
                <li key={items.id}>
                    {items.name}
                    <button onClick= {() => onDelete(items.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}

