const Org = require('../models/org');
exports.orgExists = async (orgId) => {
    try {
        const org = await Org.findById(orgId);
        return !!org;
    } 
    catch (error) {
        throw new Error('Error checking organization existence');
    }
};
