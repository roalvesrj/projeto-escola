import React from "react";

const statusSelector = ({ field, options, selected, onChange, ...props }) => {
    return (
        <>
            <select {...field} {...props} value={selected} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </>
    );
};

export default statusSelector;
