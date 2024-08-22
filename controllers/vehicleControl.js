const Vehicle = require('../models/vehicle');
const Org = require('../models/org');
const orgService = require('../services/orgService');
const vinDecoder = require('../services/vinDecoder');
exports.addVehicle = async (req, res) => {
    const { vin, org } = req.body;
    if (!vin || vin.length !== 17 || !/^[a-zA-Z0-9]+$/.test(vin)) {
        return res.status(400).send({ error: 'Invalid VIN' });
    }
    if (!await orgService.orgExists(org)) {
        return res.status(400).send({ error: 'Organization not found' });
    }
    try {
        const vehicleData = await vinDecoder.decodeVin(vin);
        const newVehicle = new Vehicle({
            vin,
            manufacturer: vehicleData.manufacturer,
            model: vehicleData.model,
            year: vehicleData.year,
            org
        });
        await newVehicle.save();
        res.status(201).send(newVehicle);
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
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
            await Org.updateMany({ parent:id },  { $set: { fuelReimbursementPolicy } });
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
exports.getVehicle = async (req, res) => {
    const { vin } = req.params;
    if (vin.length !== 17 || !/^[a-zA-Z0-9]+$/.test(vin)) {
        return res.status(400).send({ error: 'Invalid VIN' });
    }
    try {
        const vehicle = await Vehicle.findOne({ vin });
        if (!vehicle) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }
        res.status(200).send(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
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
    } catch (error) {
        console.error('Error creating organization:', error);
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
