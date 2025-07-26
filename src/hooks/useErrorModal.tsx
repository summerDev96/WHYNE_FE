import { useState } from 'react';

const useErrorModal = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateErrorMessage = (error: Error) => {
    setErrorMessage(error.message);
  };

  const showErrorModal = () => {
    setOpen(true);
  };

  const closeErrorModal = () => {
    setOpen(false);
    setErrorMessage('');
  };

  const handleError = (error: Error) => {
    updateErrorMessage(error);
    showErrorModal();
  };

  return { open, setOpen, errorMessage, handleError, showErrorModal, closeErrorModal };
};

export default useErrorModal;
