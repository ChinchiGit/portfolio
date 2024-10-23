import React from 'react';

const AdminItem = ({ item, editForm,onEdit, onDelete, onEditData }) => {
  
  const handleEditClick = () => {
    onEdit(!editForm);
    onEditData(item); // Pasa los datos del item al formulario
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h2>{item.title}</h2>
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100px', height: 'auto' }} />}
      <div>
        <button onClick={handleEditClick}>{editForm ? 'Cancel' : 'Edit'}</button>
        <button onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AdminItem;
