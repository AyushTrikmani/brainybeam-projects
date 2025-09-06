import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from './CustomInput';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().min(3, 'Must be at least 3 characters').max(15, 'Must be 15 characters or less').required('Username is required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
  age: Yup.number().min(18, 'Must be at least 18').max(100, 'Must be 100 or less').required('Age is required'),
});

const App = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Formik Custom Input Demo</h2>
      {showSuccess && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Data submitted successfully!</span>
          <button
            onClick={() => setShowSuccess(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#155724',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        </div>
      )}
      <Formik
        initialValues={{ email: '', username: '', password: '', age: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setShowSuccess(true);
        }}
      >
        <Form>
          <CustomInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <CustomInput
            name="username"
            label="Username"
            placeholder="Enter your username"
            required
            minLength={3}
            maxLength={15}
          />
          <CustomInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={6}
          />
          <CustomInput
            name="age"
            label="Age"
            type="number"
            placeholder="Enter your age"
            required
            customValidation={(schema) => schema.min(18, 'Must be at least 18').max(100, 'Must be 100 or less')}
          />
          <button type="submit" style={{ marginTop: 20 }}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default App;
