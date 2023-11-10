
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importation de SweetAlert


function ItemForm() {
  const [itemName, setItemName] = useState('');

 
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Demande de confirmation à l'utilisateur avec SweetAlert
    const result = await Swal.fire({
      title: 'Voulez-vous ajouter cet élément ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post('http://localhost:3001/items', { name: itemName });
        console.log('Item inserted:', response.data);
        setItemName('');
        // Affichage de l'alerte de succès avec SweetAlert
        Swal.fire('Succès', 'Élément ajouté avec succès !', 'success');
      } catch (error) {
        console.error('Error inserting item:', error);
        // Affichage de l'alerte d'erreur avec SweetAlert
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'élément.', 'error');
      }
    }
  };

  return (
    <div>
      
      <h2>Ajouter un élément</h2>
      <form onSubmit={handleSubmit}  >
      <div class="field">
  <label class="label">Name</label>
  <div class="control">
  <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
  </div>
</div>

  
        <button type="submit"><a >Ajouter</a></button>
      </form>
    </div>
  );
}

export default ItemForm;
