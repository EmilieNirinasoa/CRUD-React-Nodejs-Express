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
      <header class="has-background-black">
      <h2 class="has-text-left has-text-danger title is-4 mb-1">Item List</h2>
      
      <div class="tabs is-right">
  <ul>
    <li class="is-active"><a href='/Compteur' class="has-text-white">Compteur</a></li>
    <li><a href='/Liste' class="has-text-white">Liste</a></li>
    
  </ul>
</div>
      </header>
      
      <a href='/create' class="button is-warning">Ajouter</a>
      <table class="table is-bordered">
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
        <button class="button is-info "><Link to={`/ItemEditForm/${item.id}`} class="has-text-white">Modifier</Link></button>
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
