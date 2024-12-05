// const express = require('express');
// const { createOrder } = require('../controller/razorpayController');

// const router = express.Router();

// // // Define the route for creating Razorpay orders
// // router.post('/createOrder', createOrder)=>{
// //     // Your logic for creating the order goes here
// //   console.log('Received data:', req.body);

// //   // Respond with an order id or other data
// //   res.json({
// //     id: 'some_order_id',
// //     amount: 1000, // Example amount in the currency
// //     currency: 'INR',
// //   });
// // }


// // Define the route for creating Razorpay orders
// router.post('/createOrder', (req, res) => {
//     // Your logic for creating the order goes here
//     console.log('Received data:', req.body);

//     // Respond with an order id or other data
//     res.json({
//         id: 'some_order_id',      // Example order ID
//         amount: 1000,             // Example amount in the currency (INR)
//         currency: 'INR',          // Currency
//     });
// });


// module.exports = router;

// // const razorCon = require('../controller/razorpayController');

// // const express = require('express');
// // const router = express.Router();

// // // Define the function to create an order
// // const createOrder = (req, res) => {
// //   console.log('Received data:', req.body);

// //   // Simulating Razorpay order creation logic
// //   res.json({
// //     id: 'some_order_id',  // Example order id
// //     amount: 1000,         // Example amount in INR
// //     currency: 'INR',      // Currency
// //   });
// // };

// // router.post('/createOrder',razorCon );

// // module.exports = router;


const express = require('express');
const { createOrder } = require('../controller/razorpayController');

const router = express.Router();

// Define the route for creating Razorpay orders
router.post('/createOrder', createOrder); // Use the controller function directly

module.exports = router;
