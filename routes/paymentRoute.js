const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/make-payment', async (req, res) => {
    const { amount, currency, paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.json({ msg: 'Payment successful', paymentIntent });
    } catch (error) {
        res.status(400).json({ msg: 'Payment failed', error });
    }
});

module.exports = router;
