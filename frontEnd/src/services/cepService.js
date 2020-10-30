import cep from './apiCEP';

const getCEP = (val) => {
    return cep.get(val + "/json/");
};

export default getCEP;
