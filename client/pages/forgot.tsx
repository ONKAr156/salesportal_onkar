"use client"

import { ChangeEvent, useState } from "react"
import './globals.css'
import { useRouter } from "next/router"
import axios from "axios"

const forgot = () => {
    const [active, setActive] = useState("Password")
    return <>
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-slate-50  p-6 rounded shadow-md w-[30rem] md:w-96'>
                <div className='flex justify-between items-center'>
                    <h1 className="text-3xl font-semibold text-purple-600 mb-6">Reset</h1>
                    {/* Admin or Employee btn */}
                    <div className='flex justify-between gap-2'>

                        <button className={`${(active == "Email") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                            onClick={() => setActive('Email')}
                        >Email</button>

                        <button className={`${(active == "Password") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                            onClick={() => setActive('Password')}
                        >Password</button>

                    </div>
                </div>

                <div>
                    {
                        active == 'Email' ? <EditEmail /> : <EditPassword />

                    }
                </div>
            </div>
        </div>

    </>
}

const EditEmail = () => {
    return <>

        <input type="text" placeholder="enter Current EmAIL" />
    </>
}
interface PassData {
    email: String,
    currentPassword: String,
    newPassword: String,
}
const EditPassword = () => {
    const [data, setData] = useState<PassData>({
        email: "",
        currentPassword: "",
        newPassword: "",
    })
    const [show, setShow] = useState()
    const router = useRouter()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Sending PUT request to the backend
            const response = await axios.put(`http://localhost:3000/api/employee/forgot/${data.email}`, data);
            // Handle the response from the backend (if needed)
            console.log('Backend response:', response.data);
            // router.push('/login')

            setShow(response.data)

        } catch (error) {
            // Handle errors
            console.error('Error updating user:', error);
        }



    };

    return <>
        <div className="h-full flex flex-col justify-between   ">
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <form action="" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <div className=" p-3">
                    <div className="my-2">
                        <label className="md: text-lg" htmlFor="email">Email<span className="text-red-600">*</span></label>
                        <input
                            name="email"
                            value={String(data.email)}
                            onChange={handleChange}
                            className="w-full my-2 border p-2 rounded-md" type="email" placeholder="Enter email" id="email" />
                    </div>

                    <div className="my-2">
                        <label className="md: text-lg" htmlFor="currPass">Current Password<span className="text-red-600">*</span></label>
                        <input
                            name="currentPassword"
                            value={String(data.currentPassword)}
                            onChange={handleChange}
                            className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter current Password" id="currPass" />
                    </div>

                    <div className="my-2">
                        <label className="md: text-lg" htmlFor="newPass">New Password <span className="text-red-600">*</span></label>
                        <input
                            name="newPassword"
                            value={String(data.newPassword)}
                            onChange={handleChange}
                            className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter new Password" id="newPass" />
                    </div>
                </div>
                <div className="my-2 text-end ">
                    <button type="submit" className="  bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">Submit</button>
                </div>
            </form>
            <h2>{JSON.stringify(show)}</h2>
        </div>

    </>
}

export default forgot