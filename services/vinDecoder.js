const axios = require('axios');

const NHTSA_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodeVin/';

exports.decodeVin = async (vin) => {
    try {
        const response = await axios.get(`${NHTSA_API_URL}${vin}?format=json`);
        const { Make: manufacturer, Model: model, ModelYear: year } = response.data.Results[0];
        return { manufacturer, model, year };
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        throw new Error('Error decoding VIN');
    }
};
