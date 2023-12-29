"use client"
import { data, options } from '@/pages/linechart'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const page = ({ params }) => {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState("Email")
  const [employees, setEmployees] = useState([])
  const [admin, setAdmin] = useState("true")
  const [validate, setValidate] = useState("true")
  const [edit, setEdit] = useState({
    email: "",
    password: "",
  })
  // Admin cannot edit Employee's data as a prop  is send here ⤵
  const search = useSearchParams()
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 1000,
      date: '2023-08-01',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product B',
      amount: 100,
      date: '2023-07-01',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 200,
      date: '2023-07-01',
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product C',
      amount: 5000,
      date: '2023-08-01',
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 1000,
      date: '2023-06-01',
    }
    // ...add more customers as needed
  ];
  const filteredCustomers = filter === 'all' ? customers : filter === 'thisMonth'
    ? customers.filter(
      (customer) => new Date(customer.date).getMonth() === new Date().getMonth()
    )
    : customers.filter((customer) => customer.product === filter);
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'Product A', label: 'Product A' },
    { value: 'Product B', label: 'Product B' },
    { value: 'Product C', label: 'Product C' },
  ];
  const firstEmployee = employees[0];
  const referalID = firstEmployee ? firstEmployee.referalID : undefined;


  //### Fetching Employee data ⤵
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/employee/${params.id}`);
        const data = await response.json();
        setEmployees([data]);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }

    };

    fetchData();
  }, [employees]);

  // Check if the admin is viewing
  useEffect(() => {
    if (search.get('name') === null) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);

  // Validating Employee
  useEffect(() => {
    if (search.get('employee') === null) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, []);



  return <>
    <div>
      {
        validate ?  // true
          <div className='min-h-screen bg-slate-100 scroll-smooth '>
            <div className='h-full grid grid-cols-12 px-6 md:px-10 py-6  md:py-10  gap-3'>
              <div className=' h-[20rem] flex justify-center items-center  col-span-12 md:col-span-6 bg-slate-100'>
                <div className='h-[18rem] w-full flex flex-col justify-center  py-2  md:py-5 px-2 md:px-5  text-sm  md:text-base shadow-xl bg-slate-50  text-black rounded-xl gap-6'>

                  {
                    employees && employees.map((item) => <div className='flex flex-col gap-2' key={item.id}>

                      <div>
                        <div className=' flex justify-between'>
                          <div>
                            <span className='md:text-lg font-semibold mx-2'>Name:</span>
                            <span className='md:text-lg'>{item.firstName} {item.lastName}</span>
                          </div>
                          <div>
                            <span className='md:text-lg font-semibold mx-2'>ID:</span>
                            <span className='md:text-lg'>{item.id}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div >
                          <span className='md:text-lg font-semibold mx-2'>Referal ID:</span>
                          <span className='md:text-lg'>{item.referalID}</span>
                        </div>
                        <div>
                          <span className='md:text-lg font-semibold mx-2'>Email:</span>
                          <span className='md:text-lg '>{item.email}</span>
                        </div>
                      </div>
                      <div>
                        <div className=''>
                          <span className='md:text-lg font-semibold mx-2'>Date of joining:</span>
                          <span className='md:text-lg'>{item.profileCreationDate}</span>
                        </div>
                      </div>
                      <div>
                        <div className=''>
                          <span className='md:text-lg font-semibold mx-2'>Sales:</span>
                          <span className='md:text-lg'>{item.sale}</span>
                        </div>
                      </div>

                      <div>
                        {admin ? "" : <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <span>Edit</span>
                        </button>}
                      </div>

                    </div>)

                  }

                </div>
              </div>
              <div className='col-span-12 md:col-span-6   h-[20rem]  bg-slate-50 p-2 flex justify-center rounded-xl shadow-lg '>
                <Line options={options} data={data} />
              </div>

              <div className='col-span-12  py-6 md:py-4  '>
                <div className='col-span-12  py-6 md:py-4  '>
                  <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Customer List</h2>
                    <div className="mb-4">
                      <label htmlFor="filter" className="block font-medium text-gray-700">
                        Filter:
                      </label>
                      <select
                        id="filter"
                        name="filter"
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        {filterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* customer table ---------------------------------------------------------------- */}
                    <div className="overflow-x-auto">
                      <table className="w-full border border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Date</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer ID</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Name</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Email ID</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Phone No</th>
                            {filter === 'all' && <th className="border px-4 py-2 sm:px-6 md:px-8">Product</th>}
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.date}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.id}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.name}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.email}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.phone}</td>
                              {filter === 'all' && <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.product}</td>}
                              <td className="border px-4 py-2 sm:px-6 md:px-8">${customer.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold mb-4 ">Monthly Sales</h1>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Month</th>
                      <th className="border border-gray-300 p-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.labels.map((label, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">{label}</td>
                        <td className="border border-gray-300 p-2">{data.datasets[0].data[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-span-12 px-4 md:px-10 py-6 md:py-4 '>
                <div className="bg-white shadow-md rounded-xl p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">Summary</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Total Customers</p>
                      <p>{customers.length}</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Customers Onboarded This Month</p>
                      <p>{filteredCustomers.length}</p>
                    </div>
                    <div className="bg-purple-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Earnings Next Month</p>
                      <p>${customers.reduce((total, customer) => total + customer.amount, 0)}</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
          :        // false
          <div className='flex flex-col h-screen items-center justify-center'>
            <h3>401 Unauthorized Please Login</h3>
            <Link href={'/login'}>Login</Link>
          </div>
      }
    </div>

    {/* Edit Modal-------------------------------------------------- */}

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">

        <div className="modal-content">
          <div className="modal-header">
            {/* <pre>{JSON.stringify(edit, null, 2)}</pre> */}
            <h5 className="modal-title" id="exampleModalLabel">Edit your data</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className='flex gap-2'>
              <button className={`${(active == "Email") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                onClick={() => setActive('Email')}
              >Email</button>

              <button className={`${(active == "Password") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                onClick={() => setActive('Password')}
              >Password</button>
            </div>

            <div>
              {
                active == "Email" ? <EditEmail params={params} /> : <EditPassword params={params} />
              }
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>

      </div>
    </div>

  </>
}

const EditPassword = ({ params }) => {
  const x = useSearchParams()
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
  })
  const [status, setStatus] = useState()
  const [errorData, setErrorData] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassData({ ...passData, [name]: value });

  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    // console.log("CALLED");
    try {
      const response = await axios.post(`http://localhost:3000/api/employee/cpass/${(+(params.id))}`, passData)
      // const data = await response.json();
      setStatus(response.data.message)

      if (status == "true") {
        const response = await axios.put(`http://localhost:3000/api/employee/updateUser/${(+(params.id))}`, passData)
        console.log(response.data);
        setStatus(response.data.message)
      }

    } catch (error) {
      console.error('Error while posting  current password', error);
      setErrorData(error.response.data.message)
    }
  };



  return <>
    <pre>{JSON.stringify(status)}</pre>
    <div className="h-full flex flex-col justify-between">
      <pre>{JSON.stringify(passData, null, 2)}</pre>
      <form onSubmit={(e) => handlePassSubmit(e)}>
        <div className=" p-3">


          <div className="my-2">
            <label className="md: text-lg" htmlFor="currPass">Current Password<span className="text-red-600">*</span></label>
            <input
              name="currentPassword"
              value={String(passData.currentPassword)}
              onChange={handleChange}
              className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter current Password" id="currPass" />
          </div>

          {
            status ? <div className="my-2">
              <label className="md: text-lg" htmlFor="newPass">New Password<span className="text-red-600">*</span></label>
              <input
                name="newPassword"
                value={String(passData.newPassword)}
                onChange={handleChange}
                className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter new Password" id="newPass" />
            </div> : ""
          }
          <h2>{status}</h2>

        </div>
        <div className="my-2 text-end ">
          {
            status ? "" : <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">check</button>
          }
          {
            status ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" data-bs-dismiss="modal">Submit</button> : ""
          }

        </div>
      </form>
      {/* <h2>{errorData}</h2> */}
    </div>

  </>
}
//  EDIT EMAIL------------------------------------------------------------------------
const EditEmail = ({ params }) => {
  const [emailData, setEmailData] = useState({
    oldEmail: "",
    newEmail: "",
    OTP: "",
  })
  const [status, setStatus] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });

  };
  const handelSubmit = async e => {
    e.preventDefault()
    console.log(emailData);
    try {
      const response = await axios.post(`http://localhost:3000/api/employee/sendEmail/${(+(params.id))}`, emailData)
      // console.log(response.data.message)
      setStatus(response.data.message)
      console.log(status);
      if (status == "true") {
        const response = await axios.post(`http://localhost:3000/api/employee/otp/${(+(params.id))}`, emailData)
        console.log(response.data);
        setStatus(response.data.message)
        
        if (status==="OTP matched successfully") {
          const response = await axios.put(`http://localhost:3000/api/employee/updateEmail/${(+(params.id))}`, emailData)
          setStatus(response.data.message)
        }

      }
        

    } catch (error) {
      console.log(error);
    }
    setEmailData({
      oldEmail: "",
      newEmail: "",
      OTP: "",
    })

  }


  return <>
    <div className="h-full flex flex-col justify-between">
      <pre>{JSON.stringify(emailData, null, 2)}</pre>
      <form action="" onSubmit={handelSubmit}>
        <div className=" p-3">
          {
            status ? "" : <div className="my-2">
              <label className="md: text-lg" htmlFor="oldEmail">Enter Old Email<span className="text-red-600">*</span></label>
              <input
                name="oldEmail"
                value={String(emailData.oldEmail)}
                onChange={handleChange}
                className="w-full my-2 border p-2 rounded-md" type="email" placeholder="Enter new Email" id="oldEmail" required />
            </div>
          }
          {
            status ? 
              <div className="my-2">
                <label className="md: text-lg" htmlFor="OTP">Enter OTP<span className="text-red-600">*</span></label>
                <input
                  name="OTP"
                  value={String(emailData.OTP)}
                  onChange={handleChange}
                  className="w-full my-2 border p-2 rounded-md" type="number" placeholder="Enter your OTP" id="OTP" required />
              </div>: ''
          }
          {
            status ===("OTP matched successfully") ? 
              <div className="my-2">
                <label className="md: text-lg" htmlFor="newEmail">Enter newEmail<span className="text-red-600">*</span></label>
                <input
                  name="newEmail"
                  value={String(emailData.newEmail)}
                  onChange={handleChange}
                  className="w-full my-2 border p-2 rounded-md" type="number" placeholder="Enter your newEmail" id="newEmail" required />
              </div>: ''
          }
         
        </div>
        <div className="my-2 text-end ">
          {
            status ? "" : <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">send OTP</button>
          }
          {
            status ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" data-bs-dismiss="modal">check</button> : ""
          }
          {
            status ==("OTP matched successfully") ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" data-bs-dismiss="modal">submit</button> : ""
          }
          

        </div>
      </form>
    </div>

  </>
}

export default page