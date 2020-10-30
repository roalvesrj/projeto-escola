import React from "react";

const list = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Outros", label: "Outros" }
];

const genderSelector = ({ field, form, ...props }) => {
    return (
        <>
            <select {...field} {...props}>
                <option value={null}>- Selecione -</option>
                {list.map((l, index) => (
                    <option key={index} value={l.value}>{l.label}</option>
                ))}
            </select>
        </>
    );
};

export default genderSelector;