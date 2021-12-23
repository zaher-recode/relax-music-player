import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export default function Nav({ setIsLibraryOpen, isLibraryOpen }) {
  return (
    <nav>
      <div className="logo">
        <img src="wave.png" alt="wave logo" />
        <h1>Relax</h1>
      </div>
      <button onClick={() => setIsLibraryOpen(!isLibraryOpen)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}
