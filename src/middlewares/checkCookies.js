const axios = require('axios');

const checkCookies = async (req, res, next) => {
    console.log(req);
    const { ga_analytics } = req.cookies;
    console.log(ga_analytics);
    try {
        const response = await axios.get('https://api.drpatoloji.com/users/verifytoken', {
            method: 'get',
            responseType: 'json',
            responseEncoding: 'utf8',
            params: {
                token: ga_analytics
            },
        });
        console.log(response);
        next(); 
    } catch (error) {
        console.log(error.data);
        res.status(500);
        res.send('Error');
    }
}

module.exports = checkCookies;