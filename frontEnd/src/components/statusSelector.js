import React from "react";

const list = [
    { value: "Pré-matriculado", label: "Pré-matriculado" },
    { value: "Matriculado", label: "Matriculado" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Suspenso", label: "Suspenso" },
    { value: "Transferido", label: "Transferido" },
    { value: "Formado", label: "Formado" }
];

const statusSelector = ({ field, form, ...props }) => {
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

export default statusSelector;
