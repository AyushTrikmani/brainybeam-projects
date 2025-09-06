import React from 'react';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CustomInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  minLength,
  maxLength,
  pattern,
  customValidation,
  className = '',
  ...props
}) => {
  // Build validation schema based on props
  const buildValidationSchema = () => {
    let schema = Yup.string();

    if (required) {
      schema = schema.required(`${label || name} is required`);
    }

    if (type === 'email') {
      schema = schema.email('Invalid email address');
    }

    if (minLength) {
      schema = schema.min(minLength, `${label || name} must be at least ${minLength} characters`);
    }

    if (maxLength) {
      schema = schema.max(maxLength, `${label || name} must be no more than ${maxLength} characters`);
    }

    if (pattern) {
      schema = schema.matches(pattern, `${label || name} format is invalid`);
    }

    if (customValidation) {
      schema = customValidation(schema);
    }

    return schema;
  };

  const validationSchema = buildValidationSchema();

  return (
    <div className={`custom-input ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <Field name={name} type={type} placeholder={placeholder} {...props}>
        {({ field, meta }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`input-field ${meta.touched && meta.error ? 'error' : ''}`}
            {...props}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default CustomInput;
