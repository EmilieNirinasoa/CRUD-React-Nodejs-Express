import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ItemDeleteButton({ itemId }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Voulez-vous supprimer cet élément ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/data/${itemId}`);
        Swal.fire('Succès', 'Élément supprimé avec succès !', 'success');
      } catch (error) {
        console.error('Error deleting item:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de l\'élément.', 'error');
      }
    }
  };

  return (
    <button onClick={handleDelete} class="button is-danger">Supprimer</button>
  );
}

export default ItemDeleteButton;
