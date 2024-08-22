const Org = require('../models/org');
exports.createOrg = async (req, res) => {
    const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy } = req.body;
    try {
        const newOrg = new Org({
            name,
            account,
            website,
            fuelReimbursementPolicy: fuelReimbursementPolicy || '1000',
            speedLimitPolicy
        });
        await newOrg.save();
        res.status(201).send(newOrg);
    } 
    catch(error) {
        console.error('Error creating organization:', error);
        res.status(400).send({ error: 'Invalid input' });
    }
};

exports.updateOrg = async (req, res) => {
    const { id } = req.params;
    const { account, website, fuelReimbursementPolicy, speedLimitPolicy } = req.body;

    try {
        const org = await Org.findById(id);
        if (!org) {
            return res.status(404).send({ error: 'Organization not found' });
        }

        if (fuelReimbursementPolicy) {
            org.fuelReimbursementPolicy = fuelReimbursementPolicy;
            await Org.updateMany({ parent: id }, { fuelReimbursementPolicy });
        }
        
        if (speedLimitPolicy) {
            org.speedLimitPolicy = speedLimitPolicy;
        }

        await org.save();
        res.status(200).send(org);
    } catch (error) {
        console.error('Error updating organization:', error);
        res.status(400).send({ error: 'Invalid input' });
    }
};
exports.getAllOrgs = async (req, res) => {
    try {
        const orgs = await Org.find();
        res.status(200).send(orgs);
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
