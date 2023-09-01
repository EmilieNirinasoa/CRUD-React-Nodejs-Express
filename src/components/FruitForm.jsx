import { useState } from "react";

export default function FruitForm({handleAdd}) {
    
    //state
    const [fruits,setFruits]= useState([
        {id:1,nom:"Abricots"},
        {id:2,nom:"Banane"},
        {id:3,nom:"Cerise"},
    ]);
    const [NouveauFruit,setNouveauFruit]=useState("");
    //comportement
    const handleSubmit=(event)=>{
        event.preventDefault();
        //cp du state
       
        //manipulation du cp
        const id=new Date().getTime();
        const nom=NouveauFruit
        const FruitAAjouter={id,nom}
       handleAdd(FruitAAjouter)
       
       
        setNouveauFruit("")
        //alert("handleSubmit");
        //console.log(inputRef.current.value)ref={inputRef}
    };
    const handlechange=(event)=>{
        setNouveauFruit(event.target.value); 
    };
    //affichage
    return(
        <div>
            <form action="submit" onSubmit={handleSubmit}>
                <input value={NouveauFruit} onChange={handlechange} type="text" placeholder="Ajouter un fruits...."/>
               <button class="button is-link">Ajouter</button>
            </form>
        </div>
    );
};