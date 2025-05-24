import React from 'react'
import type { FormFieldProps } from '../types/types';

const Formfield:React.FC<FormFieldProps> = ({ title, type, placeholder, value, accept, onChange, className}) => {
  return (
    <div className={`my-2 flex-center ${className}`}>
      <label className="p-2 label">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        accept={accept}
        onChange={onChange}
        className={`${className}`}
        required
      />
    </div>
  );
}

export default Formfield