import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
  const [ formState, setFormState ] = useState( initialForm );
  const [ formValidation, setFormValidation ] = useState({});
  
  useEffect(() => {
    createValidators();
  }, [formState]);

  // este para re renderizar cuando se selecciona otra nota
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [ name ]: value
    });
  }

  const onResetForm = () => {
    setFormState( initialForm );
  }

  const createValidators = () => {
    const formCheckdValues = {};
    
    for (const formField of Object.keys(formValidations)) {
      const [ fn, errorMessage = "Validation error" ] = formValidations[formField];
      formCheckdValues[`${formField}Valid`] = fn(formState[formField]) ? null: errorMessage;
    }

    setFormValidation(formCheckdValues);
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}