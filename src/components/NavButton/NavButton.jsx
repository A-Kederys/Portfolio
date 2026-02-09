import React from 'react';
import styles from './NavButton.module.css';

const CORNERS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

function NavButton({ position, label, onClick }) {
  const cornerClass = CORNERS.includes(position) ? styles[position] : styles.topRight;
  return (
    <button
      type="button"
      className={`${styles.button} ${cornerClass}`}
      onClick={onClick}
      aria-label={`Go to ${label}`}
    >
      {label}
    </button>
  );
}

export default NavButton;
