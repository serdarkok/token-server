const axios = require('axios');

const checkCookies = async (req, res, next) => {
    const { ga_analytics } = req.cookies;
    console.log(ga_analytics);
    try {
        const response = await axios.get('http://localhost:3000/users/verifytoken', {
            method: 'get',
            responseType: 'json',
            responseEncoding: 'utf8',
            params: {
                token: ga_analytics
            },
        });
        next(); 
    } catch (error) {
        console.log(error.data);
        res.status(500);
        res.send('Error');
    }
}

module.exports = checkCookies;