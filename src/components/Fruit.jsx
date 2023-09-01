export default function Fruit({fruitInfo,actionClick}) {
    //state
    // const fruitInfo=props.fruitInfo;
    // const onFruitDelete=props.onFruitDelete;
    //comportements
    //affichage (render)
    return(
        <di>
             <li key={fruitInfo.id}>{fruitInfo.nom}<button onClick={actionClick}> X</button></li>
        </di>
    );
};