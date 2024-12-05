const Razorpay = require('razorpay');

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_v13HmstXkQfNSk',
  key_secret: 'xomABOaieG77MdsUrnoOszLb',
});

// Controller function to create an order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("This is from razor pay controller page",order);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
};
