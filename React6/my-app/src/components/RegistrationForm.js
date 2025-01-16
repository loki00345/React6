import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Ім'я є обов'язковим")
      .min(2, "Ім'я має містити мінімум 2 символи"),
    lastName: Yup.string()
      .required("Прізвище є обов'язковим")
      .min(2, "Прізвище має містити мінімум 2 символи"),
    email: Yup.string()
      .email('Неправильний формат електронної пошти')
      .required('Електронна пошта є обов’язковою'),
    username: Yup.string()
      .required("Юзернейм є обов'язковим")
      .min(3, 'Юзернейм має містити мінімум 3 символи'),
    password: Yup.string()
      .required('Пароль є обов’язковим')
      .min(6, 'Пароль має містити мінімум 6 символів'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Паролі мають співпадати')
      .required('Підтвердження паролю є обов’язковим'),
    phone: Yup.string()
      .matches(/^\+?\d{10,14}$/, 'Введіть правильний номер телефону')
      .required('Номер телефону є обов’язковим'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Збереження даних у localStorage
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      phone: values.phone,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Реєстрація успішна!');
    resetForm();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Реєстрація</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">Ім'я</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="lastName">Прізвище</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="email">Електронна пошта</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="username">Юзернейм</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="confirmPassword">Підтвердження паролю</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="phone">Номер телефону</label>
              <Field name="phone" type="text" />
              <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
              Зареєструватися
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
