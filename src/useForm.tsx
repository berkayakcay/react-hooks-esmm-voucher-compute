import { useEffect, useState } from 'react';

const useForm = (callback: any, validate: any, initialValues: any) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleReset = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    setValues(initialValues);
    setIsSubmitting(false);
    setErrors({});
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues((values: any) => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleSubmit,
    handleReset,
    handleChange,
    values,
    errors
  };
};

export default useForm;
