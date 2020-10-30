
const arrayReplace = () => {
    const arrayReplace = (data, value, label) => {
        let array = [];

        for (let i = 0; i < data.length; i++) {
            array.splice(1, 0, { value: data[i].value, label: data[i].label })
        }

        return array;
    };
};

export default arrayReplace;