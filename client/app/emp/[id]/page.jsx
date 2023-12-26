"use client"
import { data, options } from '@/pages/linechart'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const page = ({ params }) => {
  const [filter, setFilter] = useState('all');
  const [employees, setEmployees] = useState([])
  const [admin, setAdmin] = useState("true")
  const [edit, setEdit] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    password: "",
    // referalID: "",
    // profileCreationDate: "",
    // id: +"",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(edit);
    try {
      // Sending PUT request to the backend
      const response = await axios.put(`http://localhost:3000/api/employee/updateTotalSale/${referalID}`, edit);

      // Handle the response from the backend (if needed)
      console.log('Backend response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error updating user:', error);
    }
  }

  useEffect(() => {
    // Fetching data when the component mounts
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



  useEffect(() => {
    // Check if the 'name' parameter is null
    if (search.get('name') === null) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);



  return <>
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
                    <span className='md:text-lg'>{item.email}</span>
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

        {/* <div className='col-span-12 px-6 md:px-10 py-6 md:py-4 '>
          <div className="bg-white shadow-md rounded-xl p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <div className="grid grid-cols-3 gap-4">
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
        </div> */}


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




    {/* Edit Modal-------------------------------------------------- */}

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={e => handelSubmit(e)}>
          <div className="modal-content">
            <div className="modal-header">
              {/* <pre>{JSON.stringify(edit, null, 2)}</pre> */}
              <h5 className="modal-title" id="exampleModalLabel">Edit your data</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='d-flex flex-column gap-2'>
                {/* <div>
                  <label for="fname" className="form-label">First name</label>
                  <input name='firstName' value={edit.firstName} onChange={handleChange} type="text" className="form-control" id="fname" placeholder="Edit Your First name" />
                </div>
                <div>
                  <label for="lname" className="form-label">Last name</label>
                  <input name='lastName' value={edit.lastName} onChange={handleChange} type="text" className="form-control" id="lname" placeholder="Edit Your Last name" />
                </div> */}
                <div>
                  <label for="email" className="form-label">Email</label>
                  <input name='email' value={edit.email} onChange={handleChange} type="email" className="form-control" id="email" placeholder="Edit Your Email" />
                </div>
                <div>
                  <label for="password" className="form-label">password</label>
                  <input name='password' value={edit.password} onChange={handleChange} type="text" className="form-control" id="password" placeholder="Edit Your password" />
                </div>
                {/* <div>
                  <label for="profileCreationDate" className="form-label">profileCreationDate</label>
                  <input name='profileCreationDate' value={edit.profileCreationDate} onChange={handleChange} type="text" className="form-control" id="profileCreationDate" placeholder="Edit Your profileCreationDate" />
                </div>
                <div>
                  <label for="refID" className="form-label">Referral ID</label>
                  <input name='referalID' value={edit.referalID} onChange={handleChange} type="text" className="form-control" id="refID" placeholder="Edit Your Referral ID" />
                </div>
                <div>
                  <label for="id" className="form-label"> ID</label>
                  <input name='id' value={edit.id} onChange={handleChange} type="text" className="form-control" id="id" placeholder="Edit Your Employee Id" />
                </div> */}


              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </>
}

export default page