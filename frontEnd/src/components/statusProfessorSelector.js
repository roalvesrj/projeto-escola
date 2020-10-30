import React from "react";

const list = [
    { value: "Ativo", label: "Ativo" },
    { value: "Inativo", label: "Inativo" },
    { value: "Suspenso", label: "Suspenso" },
    { value: "Transferido", label: "Transferido" }
];

const statusProfessorSelector = ({ field, form, ...props }) => {
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

export default statusProfessorSelector;
