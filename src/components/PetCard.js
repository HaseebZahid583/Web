import React from 'react';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      onDelete(pet.id);
    }
  };

  return (
    <div className="pet-card">
      <h2>{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Price: Rs.{pet.price}</p>
      <button onClick={() => onEdit(pet)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PetCard;
