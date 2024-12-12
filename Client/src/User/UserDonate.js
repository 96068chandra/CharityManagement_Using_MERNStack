// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function UserDonate() {

//   const [dcategory, setdcategory] = useState("");
//   const [payment, setpayment] = useState("");
//   const [trid, settrid] = useState("");
//   const [amount, setamount] = useState("");
//   const [name, setname] = useState("");
//   const current = new Date();
//   const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

//   const [pdata, setpdata] = useState([]);
//   const [cdata, setcdata] = useState([]);
//   const [showed, setShowed] = useState(false);

//   const navigate = useNavigate();
//   const gotoUserLogin = () => navigate("/Login");
//   const email = sessionStorage.getItem("UserSession");

//   const Donat = (e) => {
//     e.preventDefault();
//     console.log(dcategory);
//     if (dcategory === "" || dcategory === "0") {
//       alert("Please Select Donation Catagory")
//     } else if (payment === "" || payment === "0") {
//       alert("Please Select Payment Method")
//     } else {
//       setShowed(true);
//     }
//   }

//   // const doDonat = (e) => {
//   //   e.preventDefault();
//   //   const temp = window.confirm("Check Your Details Again.....");
//   //   if(temp){
//   //     const data = {
//   //       "email": email,
//   //       "name" : name,
//   //       "dcategory" : dcategory,
//   //       "payment" : payment,
//   //       "trid" : trid,
//   //       "amount" : amount,
//   //       "date" : date
//   //     }

//   //     axios.post('http://localhost:3001/dodonat',data)
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       if(res.data.status === 200){
//   //         alert(res.data.msg);
//   //         setShowed(false);
//   //       }
//   //       if(res.data.status === 400){
//   //         alert(res.data.msg);
//   //         setShowed(false);
//   //       }
//   //     }).catch((error) => {
//   //       console.log(error);
//   //     });
//   //   } 
//   // }

//   const doDonat = async (e) => {
//     e.preventDefault();

//     if (!amount || amount <= 0) {
//       alert('Please enter a valid amount');
//       return;
//     }

//     try {
//       // Create Razorpay order
//       console.log("Entry to user dontate page");
//       const response = await axios.post('http://localhost:3001/api/razorpay/createOrder', {
//         amount, // Amount in INR
//         currency: 'INR',
//       });
//       if(response){
//         console.log("create order post is working");
//       }
//       const { id: order_id, amount: order_amount, currency } = response.data;

//       // Initialize Razorpay
//       const options = {
//         key: 'rzp_test_v13HmstXkQfNSk', // Replace with your Key ID
//         amount: order_amount,
//         currency: currency,
//         name: 'Charity Donation',
//         description: 'Test Transaction',
//         order_id: order_id,
//         handler: async function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Optionally save transaction details to the backend
//           await axios.post('http://localhost:3000/dodonat', {
//             email,
//             name,
//             dcategory,
//             payment: 'Razorpay',
//             trid: response.razorpay_payment_id,
//             amount,
//             date,
//           });
//         },
//         prefill: {
//           name: name,
//           email: email,
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error in payment process:', error);
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const cancel = () => {
//     setShowed(false);
//   }

//   const fetchAllPayment = () => {
//     axios.get('http://localhost:3001/fetchallpayment')
//       .then((res) => {
//         console.log(res.data);
//         setpdata(res.data);
//       }).catch((error) => {
//         console.log(error);
//       });
//   }

//   const fetchAllCategory = () => {
//     axios.get('http://localhost:3001/fetchallcategory')
//       .then((res) => {
//         console.log(res.data);
//         setcdata(res.data);
//       }).catch((error) => {
//         console.log(error);
//       });
//   }

//   useEffect(() => {
//     if (sessionStorage.getItem("UserSession") === "null") {
//       gotoUserLogin();
//     }
//     fetchAllPayment();
//     fetchAllCategory();
//   }, []);

//   return (
//     <>
//       <div className="container mt-4">
//         <h1>Donate</h1>
//         <br />
//         <div className='mt-3'>
//           <div className="row">
//             <div className="col-md-6">
//               <form onSubmit={Donat}>
//                 <div className="form-group">
//                   <input type="text" name='email' value={email} className='form-control' required disabled />
//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <input type="text" name='name' placeholder='Enter Doner Full Name' className='form-control' onChange={(e) => setname(e.target.value)} required />
//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <select name="dcategory" id="dcategory" className='form-control' onChange={(e) => setdcategory(e.target.value)}>
//                     <option value="0">Select Donation Category</option>
//                     {
//                       cdata.map((item, index) =>
//                         <option key={index} value={item.category}>{item.category}</option> // Add unique key here
//                       )
//                     }
//                   </select>

//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <select name="payment" id="payment" className='form-control' onChange={(e) => setpayment(e.target.value)}>
//                     <option value="0">Select Payment Method</option>
//                     {
//                       pdata.map((item, index) =>
//                         <option key={index} value={item.payment}>{item.payment}</option> // Add unique key here
//                       )
//                     }
//                   </select>


//                 </div>
//                 <br />
//                 {
//                   pdata.map((item, index) => {
//                     if (item.payment === payment) {
//                       return (
//                         <div key={index}> {/* Add unique key here */}
//                           {item.mobile && <p>Mobile No: {item.mobile}</p>}
//                           {item.upi && <p>UPI Id: {item.upi}</p>}
//                           {item.bank && <p>Bank Name: {item.bank}</p>}
//                           {item.account && <p>Account No: {item.account}</p>}
//                           {item.ifsc && <p>IFSC Code: {item.ifsc}</p>}
//                         </div>
//                       );
//                     }
//                     return null;
//                   })
//                 }

//                 {/* <br/> */}
//                 <div className="form-group">
//                   <input type="text" name='trid' placeholder='Enter Your Transaction ID' className='form-control' onChange={(e) => settrid(e.target.value)} required />
//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <input type="number" name='amount' placeholder='Enter Donation Amount' className='form-control' onChange={(e) => setamount(e.target.value)} required />
//                 </div>
//                 <br />
//                 <div className="d-grid  ">
//                   <input type="submit" name='btnsubmit' value="Donate" className='btn btn-outline-primary btn-block' />
//                 </div>
//               </form>
//             </div>
//             <div className="col-md-6">
//               <div className="invoice" id='invoice' style={{ display: showed ? "" : "none" }}>
//                 <div className="row text-center"><h3>Your Donation Details</h3></div><hr />
//                 <div className="row">
//                   <div className="col-md-6" style={{ textAlign: "left", fontSize: 18 }}>
//                     <label className='mt-3'><b>Date : </b></label><br />
//                     <label className='mt-3'><b>Doner Name : </b></label><br />
//                     <label className='mt-3'><b>Donation Category : </b></label><br />
//                     <label className='mt-3'><b>Payment Method : </b></label><br />
//                     <label className='mt-3'><b>Transaction ID : </b></label><br />
//                     <label className='mt-3'><b>Amount of Donation : </b></label><br />
//                   </div>
//                   <div className="col-md-6" style={{ textAlign: "right", fontSize: 18 }}>
//                     <label className='mt-3'>{date}</label><br />
//                     <label className='mt-3'>{name}</label><br />
//                     <label className='mt-3'>{dcategory}</label><br />
//                     <label className='mt-3'>{payment}</label><br />
//                     <label className='mt-3'>{trid}</label><br />
//                     <label className='mt-3'>{amount}</label><br />
//                   </div>
//                 </div>
//                 <br />
//                 <button className='btn btn-danger' onClick={doDonat}>Confirm</button>&nbsp;
//                 <button className='btn btn-outline-secondary' onClick={cancel}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default UserDonate


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UserDonate.css';

function UserDonate() {
  const [dcategory, setdcategory] = useState('');
  const [payment, setpayment] = useState('');
  const [trid, settrid] = useState('');
  const [amount, setamount] = useState('');
  const [name, setname] = useState('');
  const [pdata, setpdata] = useState([]);
  const [cdata, setcdata] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const navigate = useNavigate();
  const email = sessionStorage.getItem('UserSession');
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    if (!email || email === 'null') {
      navigate('/Login');
    }
    fetchAllPayment();
    fetchAllCategory();
  }, []);

  const fetchAllPayment = async () => {
    try {
      const res = await axios.get('http://localhost:3001/fetchallpayment');
      setpdata(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/fetchallcategory');
      setcdata(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonation = (e) => {
    e.preventDefault();
    if (!dcategory || !payment) {
      alert('Please fill in all required fields.');
    } else {
      setShowInvoice(true);
    }
  };

  const confirmDonation = async () => {
    try {
      // Make sure the donation amount is valid
      if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
      }

      // Create a Razorpay order on the server
      const response = await axios.post('http://localhost:3001/api/razorpay/createOrder', {
        amount: amount, // Convert amount to paise (as Razorpay expects the amount in paise)
        currency: 'INR',
      });

      const { id: order_id, amount: order_amount, currency } = response.data;

      // Initialize Razorpay payment options
      const options = {
        key: 'rzp_test_v13HmstXkQfNSk', // Replace with your Razorpay key
        amount: order_amount,
        currency: currency,
        name: 'Charity Donation',
        description: 'Donate to make a difference',
        order_id: order_id,
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

          // Post donation details to the backend
          await axios.post('http://localhost:3001/dodonat', {
            email,
            name,
            dcategory,
            payment: 'Razorpay',
            trid: response.razorpay_payment_id,
            amount,
            date,
          });

          setShowInvoice(false); // Hide invoice after confirmation
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const cancelDonation = () => setShowInvoice(false);

  return (
    <div className="donate-page">
      <header className="donate-header">
        <h1>Make a Difference Today</h1>
        <p>Your generous donation helps transform lives.</p>
      </header>

      <div className="donate-content">
        <form className="donate-form" onSubmit={handleDonation}>
          <h2>Donation Details</h2>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={email} disabled className="form-control" />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-control"
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Donation Category</label>
            <select className="form-control" onChange={(e) => setdcategory(e.target.value)}>
              <option value="">Select Category</option>
              {cdata.map((item, index) => (
                <option key={index} value={item.category}>{item.category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select className="form-control" onChange={(e) => setpayment(e.target.value)}>
              <option value="">Select Payment Method</option>
              {pdata.map((item, index) => (
                <option key={index} value={item.payment}>{item.payment}</option>
              ))}
            </select>
          </div>

          {/* <div className="form-group">
            <label>Transaction ID</label>
            <input
              type="text"
              placeholder="Enter Transaction ID"
              className="form-control"
              onChange={(e) => settrid(e.target.value)}
              required
            />
          </div> */}

          <div className="form-group">
            <label>Donation Amount (₹)</label>
            <input
              type="number"
              placeholder="Enter Amount"
              className="form-control"
              onChange={(e) => setamount(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-proceed">Proceed</button>
        </form>

        {showInvoice && (
          <div className="donate-invoice">
            <h2>Donation Summary</h2>
            <ul className="invoice-details">
              <li><strong>Date:</strong> {date}</li>
              <li><strong>Name:</strong> {name}</li>
              <li><strong>Category:</strong> {dcategory}</li>
              <li><strong>Payment Method:</strong> {payment}</li>
              <li><strong>Transaction ID:</strong> {trid}</li>
              <li><strong>Amount:</strong> ₹{amount}</li>
            </ul>

            <div className="invoice-actions">
              <button className="btn btn-success" onClick={confirmDonation}>Confirm</button>
              <button className="btn btn-danger" onClick={cancelDonation}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDonate;
