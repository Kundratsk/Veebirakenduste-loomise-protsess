import { Routes, Route, Navigate } from "react-router-dom"
import PlanetsList from './views/PlanetsList';
import PlanetsCreate from './views/PlanetsCreate';


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/planets" replace />} />

            <Route path="/planets" element={<PlanetsList />} />
            <Route path="/planets/create" element={<PlanetsCreate />} />
        </Routes>
    );
}