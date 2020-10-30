import React from 'react';
import { useField } from 'formik';

const FormField = ({ type, name, id, label, value, onChange, onBlur, disabled, ...restProps }) => {
    const [field, meta] = useField({ name, id, ...restProps });

    return (
        <>
            {label && (
                <label htmlFor={id ?? name}>{label}</label>
            )}
            <input
                {...field}
                type={type}
                name={name}
                id={id ?? name}
                value={value !== null ? value : ''}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`form-control ${meta.error && meta.touched &&'is-invalid'}`}
            />
            {meta.error && (<span className="form-field__error-message">{meta.error}</span>)}
        </>
    );
};

export default FormField;