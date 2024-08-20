const fetch = require('node-fetch');

const { CLIENT_ID, APP_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';

async function createOrder(data) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: datacatalog.product.cost,
                    }
                }
            ]
        })
    });

    return await handleResponse(response);
}

async function generateAccessToken() {
    const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString('base64');
    const url = `${base}/v1/oauth2/token`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials'
        })
    });

    const jsonData = await handleResponse(response);
    return jsonData.access_token;
}

async function handleResponse(response) {
    if (response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

module.exports = { createOrder, generateAccessToken };
