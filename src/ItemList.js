import React, { useState, useEffect } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import axios from 'axios';
import ItemDeleteButton from './ItemDeleteButton';

import ItemEditForm from './ItemEditForm';
import ItemForm from './ItemForm';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

 









  return (
    <div>
      <h2>Item List</h2>
      <nav>
        <a href='/Compteur'>Compteur</a>
        <a href='/Liste'>Liste</a>
      </nav>
      <button><a href='/create'>Ajouter</a></button>
      <table>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Action</th>
        </tr>
        <tbody>
         
{items.map(item => (
   <tr>
     <td>{item.id}</td>
      <td>{item.nom}</td>
      <td>
        <button><Link to={`/ItemEditForm/${item.id}`}>Modifier</Link></button>
        <ItemDeleteButton itemId={item.id} />
      </td>
    </tr>
         
        ))};
        
           
        </tbody>
      </table>
     
    </div>
  );
}

export default ItemList;
