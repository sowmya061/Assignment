const rateLimit = require('express-rate-limit');
const nhtsaRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5,
    message:'many requests'
});
module.exports = { nhtsaRateLimiter, apiRateLimiter };
