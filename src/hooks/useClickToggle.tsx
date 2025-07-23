import { useState } from 'react';

function useClickToggle() {
  const [isOpen, setIsOpen] = useState(false);

  function onToggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, onToggle };
}

export default useClickToggle;
