import React, { useState } from 'react';
import './globals.css'

interface Employee {
    id: number;
    name: string;
    email: string;
    totalCustomers: number;
    totalSale: number;
    salary: number;
}

const employees: Employee[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        totalCustomers: 10,
        totalSale: 3000,
        salary: 5000,
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        totalCustomers: 15,
        totalSale: 4500,
        salary: 5500,
    },
    {
        id: 3,
        name: 'Michael Johnson',
        email: 'michael@example.com',
        totalCustomers: 8,
        totalSale: 2200,
        salary: 4800,
    },
    {
        id: 4,
        name: 'Michael B',
        email: 'michael@example.com',
        totalCustomers: 10,
        totalSale: 200,
        salary: 4800,
    },
    {
        id: 5,
        name: 'Sam Wilson',
        email: 'michael@example.com',
        totalCustomers: 25,
        totalSale: 20000,
        salary: 4800,
    }

    // ...add more employees as needed
];

const AdminDashboard: React.FC = () => {
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedEmployees = [...employees].sort((a, b) => {
        const aValue = sortKey === 'totalSale' ? a.totalSale : a.id;
        const bValue = sortKey === 'totalSale' ? b.totalSale : b.id;

        if (sortOrder === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const totalSale = employees.reduce((total, employee) => total + employee.totalSale, 0);
    const totalEmployees = employees.length;
    const totalCustomers = employees.reduce((total, employee) => total + employee.totalCustomers, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Sale</p>
                        <p>${totalSale}</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Employees</p>
                        <p>{totalEmployees}</p>
                    </div>
                    <div className="bg-purple-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Customers</p>
                        <p>{totalCustomers}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-semibold mb-2">Employee List</h2>
                <div className="mb-4 flex justify-end">
                    <button
                        className="px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        onClick={() => handleSort('id')}
                    >
                        Sort by Employee ID
                    </button>
                    <button
                        className="ml-4 px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        onClick={() => handleSort('totalSale')}
                    >
                        Sort by Total Sale
                    </button>
                </div>
                <table className="w-full border border-collapse">
                    <thead>
                        <tr>
                            <th  className="border px-4 py-2 cursor-pointer">Employee ID</th>
                            <th  className="border px-4 py-2 cursor-pointer">Employee Name</th>
                            <th  className="border px-4 py-2 cursor-pointer">Employee Email</th>
                            <th  className="border px-4 py-2 cursor-pointer">Total Sale</th>
                            <th  className="border px-4 py-2 cursor-pointer">Total Customers</th>
                            <th  className="border px-4 py-2 cursor-pointer">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="border px-4 py-2">{employee.id}</td>
                                <td className="border px-4 py-2">{employee.name}</td>
                                <td className="border px-4 py-2">{employee.email}</td>
                                <td className="border px-4 py-2">${employee.totalSale}</td>
                                <td className="border px-4 py-2">{employee.totalCustomers}</td>
                                <td className="border px-4 py-2">${employee.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
