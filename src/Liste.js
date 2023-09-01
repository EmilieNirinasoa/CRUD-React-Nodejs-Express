import { ReactDOM, useRef, useState } from "react";
import Fruit from "./components/Fruit";
import FruitForm from "./components/FruitForm";
function Liste(params) {
    const [fruits,setFruits]= useState([
        {id:1,nom:"Abricots"},
        {id:2,nom:"Banane"},
        {id:3,nom:"Cerise"},
    ]);

    const handleAdd=(FruitAAjouter)=>{
        const FruitsCopy=[...fruits];
        FruitsCopy.push(FruitAAjouter);
        setFruits(FruitsCopy)
    };
    const handleDelete=(id)=>{
          console.log(id);
          //copie du state
          const FruitsCopy= fruits.slice();
          //ou [...fruits]
          //manipuler mon state
        const FruitsCopyUpdated=   FruitsCopy.filter(fruit=>fruit.id !== id);
        //modifier mon state avec setter
        setFruits(FruitsCopyUpdated);
    };

    // const inputRef=useRef();
    
const AfficherFruitPrefere=(FruitNom)=>{
    alert(`j'aime trop ce fruit:${FruitNom}`);

}
  

    return(
        <div>
            <h1>Liste Des fruits</h1>
            <ul>{fruits.map((fruit)=>
            <Fruit fruitInfo={fruit} actionClick={()=>AfficherFruitPrefere(fruit.nom)}/>
                
            )}</ul>
            <FruitForm handleAdd={handleAdd}/>
        </div>
    );
    

    
};
export default Liste;
//gestion du fromulaire