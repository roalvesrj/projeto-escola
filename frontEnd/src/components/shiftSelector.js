import React from "react";

const list = [
    { value: "Matutino", label: "Matutino" },
    { value: "Vespertino", label: "Vespertino" },
    { value: "Noturno", label: "Noturno" },
    { value: "Integral", label: "Integral" }
];

const shiftSelector = ({ field, form, ...props }) => {
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

export default shiftSelector;
