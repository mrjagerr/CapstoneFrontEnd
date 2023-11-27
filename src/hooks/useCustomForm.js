import { useState } from "react";

const useCustomForm = (onSubmit, initialValues = {}) => {
  const [formData, setFormValues] = useState(initialValues);

 

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "isTeamLead") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
     
     
      console.log(e.target.name)
      console.log(e.target.checked)
      console.log(formData)
    
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
