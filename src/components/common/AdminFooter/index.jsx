import React from 'react';
import './AdminFooter.scss';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <p>Maalana Platform &copy; {currentYear} - All rights reserved</p>
    </footer>
  );
};

export default AdminFooter;
