import React, { useState } from 'react';
import './globals.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const admin_register: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:"",
        password: '',
        profileCreationDate: '',
        sale: '',
        id: '',
        adminId: '',
    });
    const router = useRouter()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data.message);
                // when the user  is registered, then sent to login page 
                router.push('/login')

            } else {
                const errorData = await response.json();
                console.error('Registration error:', errorData.message);
                // Handle registration errors and display to the user
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md flex gap-6 w-3/4">
                {/* Left Side: Form */}
                <div className="flex-1">
                    <h1 className="text-3xl font-semibold text-purple-600 mb-6">Admin Register</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profileCreationDate" className="block text-sm font-medium text-gray-600">
                                Profile Creation Date
                            </label>
                            <input
                                type="date"
                                id="profileCreationDate"
                                name="profileCreationDate"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sale" className="block text-sm font-medium text-gray-600">
                                Sale
                            </label>
                            <input
                                type="text"
                                id="sale"
                                name="sale"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-600">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="adminId" className="block text-sm font-medium text-gray-600">
                                Admin ID
                            </label>
                            <input
                                type="text"
                                id="adminId"
                                name="adminId"
                                className="mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            Register
                        </button>
                    </form>
                    <div className='text-end text-blue-600 font-semibold'>
                        <Link href={'/emp_register'} >
                            signup as Employee
                        </Link>
                    </div>
                </div>

                {/* Right Side: Random Text */}
                <div className="flex-1 bg-gray-200 p-6 rounded-md flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold mb-4">Admin Text</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut arcu eu erat tincidunt fermentum.
                        Integer ullamcorper urna eu augue laoreet, non tincidunt velit tempus. Donec euismod tincidunt libero,
                        a volutpat est efficitur non. Fusce vel vehicula justo. Nullam commodo quam vel nisi feugiat, a suscipit erat
                        bibendum. In sollicitudin rhoncus libero a dictum. Etiam euismod dolor at odio congue vestibulum.
                        orem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut arcu eu erat tincidunt fermentum.
                        Integer ullamcorper urna eu augue laoreet, non tincidunt velit tempus. Donec euismod tincidunt libero,
                        a volutpat est efficitur non. Fusce vel vehicula justo. Nullam commodo quam vel nisi feugiat, a suscipit erat
                        bibendum. In sollicitudin rhoncus libero a dictum. Etiam euismod dolor at odio congue vestibulum.orem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut arcu eu erat tincidunt fermentum.
                        Integer ullamcorper urna eu augue laoreet, non tincidunt velit tempus. Donec euismod tincidunt libero,
                        a volutpat est efficitur non. Fusce vel vehicula justo. Nullam commodo quam vel nisi feugiat, a suscipit erat
                        bibendum. In sollicitudin rhoncus libero a dictum. Etiam euismod dolor at odio congue vestibulum.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default admin_register;
