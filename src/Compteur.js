import { useState } from "react";
import { ReactDOM } from "react";

function Compteur() {
    const [Compteur,setCompteur]=useState(1);
    //comportement
    const handleClick= ()=>{
        setCompteur(Compteur + 1);
    };
    return (
        <div>
            <h1>{Compteur}</h1>
            <button onClick={handleClick}>Incrémenter</button>
        </div>
    );
    
}

export default Compteur;