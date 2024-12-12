// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'

// // function UHome() {
// //     const [dt,setDt] = useState([]);
// //     var amt = 0;
// //     const email = sessionStorage.getItem("UserSession");
// //     const fetchAllDonation = () => {
// //         console.log(email);
// //         const data = {
// //             "email":email
// //         }

// //         axios.post("http://localhost:3001/fetchalldonation",data)
// //         .then((res) => {
// //             console.log(res.data);
// //             setDt(res.data);
// //         }).catch((error) => {
// //             console.log(error);
// //         });
// //     }
// //     useEffect(() => {
// //         fetchAllDonation();
// //     },[]);

// //   return (
// //     <>
// //     <div className="container mt-4">
// //         <h1>Home</h1> 
// //         <br/>
// //         {
// //             dt.map((item) =>
// //                 {amt += item.amount}
// //             )
// //         }
// //         { amt > 0 &&
// //         <div className='bg-success text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
// //         }
// //         { amt == 0 &&
// //         <div className='bg-danger text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
// //         }
// //         <table className="table table-striped text-center mt-5">
// //             <thead>
// //                 <tr>
// //                     <th scope="col">No</th>
// //                     <th scope="col">Date</th>
// //                     <th scope="col">Name</th>
// //                     <th scope="col">Category</th>
// //                     <th scope="col">Payment</th>
// //                     <th scope="col">Transaction Id</th>
// //                     <th scope="col">Amount</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 {
// //                     amt != 0 ?
// //                     dt.map((item,id) =>
// //                         <tr>
// //                             <th>{id+1}</th>
// //                             <td>{item.date}</td>
// //                             <td>{item.name}</td>
// //                             <td>{item.dcategory}</td>
// //                             <td>{item.payment}</td>
// //                             <td>{item.trid}</td>
// //                             <td>{item.amount}</td>
// //                             <td>
// //                                 {/* <Link to={`view/${item._id}`} className='btn btn-secondary'><i className="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp; */}
// //                                 {/* <button type="button" className="btn btn-danger" onClick={(e) => deleteDt(item._id)}><i className="fa-solid fa-trash-arrow-up"></i></button>         */}
// //                             </td>
// //                         </tr>
// //                     )   
// //                     :
// //                     <tr>
// //                         <td colSpan={7}>No Donation</td>
// //                     </tr>
// //                 }    
// //             </tbody>
// //         </table>
// //     </div>
// //     </>
// //   )
// // }

// // export default UHome

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function UHome() {
    const [dt, setDt] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = sessionStorage.getItem("UserSession");
    const navigate = useNavigate();

    // Fetch donations from the API
    const fetchAllDonation = async () => {
        try {
            const { data } = await axios.post("http://localhost:3001/fetchalldonation", { email });
            setDt(data);
        } catch (error) {
            console.error("Error fetching donations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDonation();
    }, []);

    const totalAmount = dt.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="container mt-4 d-home" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading donations...</p>
                </div>
            ) : (
                <>
                    <div
                        className={`alert ${totalAmount > 0 ? 'alert-success' : 'alert-danger'} text-center`}
                        role="alert"
                    >
                        <h3>Total Donation: ₹{totalAmount}</h3>
                    </div>

                   <div className="text-center mb-4">
                         <Link 
                            to="userDonate" 
                            className="btn btn-primary me-3 d-inline-flex align-items-center justify-content-center" 
                            style={{ width: '180px', height: '50px', fontSize: 'medium', borderRadius: '10px' }}
                        >
                            Make New Donation
                        </Link>

                        <Link 
                            to="userProfile" 
                            className="btn btn-secondary d-inline-flex align-items-center justify-content-center" 
                            style={{ width: '180px', height: '50px', fontSize: 'medium', borderRadius: '10px' }}
                        >
                            Go To Profile
                        </Link>
                    </div>

                    <table className="table table-hover table-bordered text-center mt-5">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dt.length > 0 ? (
                                dt.map((item, id) => (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{item.date}</td>
                                        <td>{item.name}</td>
                                        <td>{item.dcategory}</td>
                                        <td>{item.payment}</td>
                                        <td>{item.trid}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-muted">No Donations Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="text-center mt-5">
                        <p className="text-muted fs-4">
                            Thank you for your contributions! Every donation makes a difference.
                        </p>
                        <p className="text-success fw-bold fs-5">
                            Together, we are building a brighter and more compassionate future.
                        </p>
                       
                    </div>
                </>
            )}
        </div>
    );
}

export default UHome;
