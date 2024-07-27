import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddEditPetModal from './AddEditPetModal';
import PetCard from './PetCard';
import './LandingPage.css';

const LandingPage = () => {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPets = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth'); // Redirect to login if no token
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/pets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error('Failed to fetch pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAddPet = () => {
    setEditPet(null);
    setShowModal(true);
  };

  const handleEditPet = (pet) => {
    setEditPet(pet);
    setShowModal(true);
  };

  const handleDeletePet = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPets();
    } catch (error) {
      console.error('Failed to delete pet:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth'); // Redirect to login
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="landing-page">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <button>Home</button>
      <button>Profile</button>
      <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        <h1>My Pets</h1>
        <button onClick={handleAddPet}>Add Pet</button>
        <div className="pet-cards">
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} onEdit={handleEditPet} onDelete={handleDeletePet} />
          ))}
        </div>
      </div>
      {showModal && (
        <AddEditPetModal
          pet={editPet}
          onClose={() => setShowModal(false)}
          onSave={fetchPets}
        />
      )}
    </div>
  );
};

export default LandingPage;