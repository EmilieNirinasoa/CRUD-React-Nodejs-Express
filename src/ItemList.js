import React, { useState, useEffect } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import axios from 'axios';
import ItemDeleteButton from './ItemDeleteButton';

import ItemEditForm from './ItemEditForm';
import ItemForm from './ItemForm';
import Header from './components/Header';
import Card from './components/Card';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

 









  return (
    <div>
      <Header/>
     
      <body class="has-background-light">
        
        <Card/>
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
      </body>
    </div>
  );
}

export default ItemList;
