"use client"
import React, { useState } from 'react'
import './globals.css';

const bolt = () => {
    const country = [
        { id: 1, name: 'USA', code: '+1' },
        { id: 2, name: 'Canada', code: '+1' },
        { id: 3, name: 'UK', code: '+44' },
        { id: 4, name: 'Germany', code: '+49' },
        { id: 5, name: 'France', code: '+33' },
        { id: 6, name: 'Australia', code: '+61' },
        { id: 7, name: 'Japan', code: '+81' },
        { id: 8, name: 'Brazil', code: '+55' },
        { id: 9, name: 'India', code: '+91' },
        { id: 10, name: 'South Africa', code: '+27' }

    ]
    const Branch = [
        { "field": "" },
        { "field": "Computer Science and Engineering" },
        { "field": "Electrical Engineering" },
        { "field": "Civil Engineering" },
        { "field": "Statistics and Informatics" },
        { "field": "Mechanical Engineering" },
        { "field": "Aerospace Engineering" },
        { "field": "Fashion Technology" },
        { "field": "Biotechnology" },
        { "field": "Chemical Engineering" },
        { "field": "Medical Engineering" },
        { "field": "Other" },
    ]
    const Degree = [
        { "degree": "" },
        { "degree": "Bachelor of Technology (B.Tech)" },
        { "degree": "Bachelor of Science (B.Sc)" },
        { "degree": "Bachelor of Engineering (B.E)" },
        { "degree": "Bachelor of Statistics and Informatics" },
        { "degree": "Bachelor of Medicine, Bachelor of Surgery (MBBS)" },
        { "degree": "Bachelor of Arts (B.A)" },
        { "degree": "Bachelor of Business Administration (BBA)" },
        { "degree": "Bachelor of Environmental Science" },
        { "degree": "Bachelor of Commerce (B.Com)" },
        { "degree": "Bachelor of Fine Arts (BFA)" }
    ]
    const Year = [
        { "year": "" },
        { "year": 2012 },
        { "year": 2013 },
        { "year": 2015 },
        { "year": 2014 },
        { "year": 2016 },
        { "year": 2013 },
        { "year": 2015 },
        { "year": 2014 },
        { "year": 2014 },
        { "year": 2016 },
        { "year": 2017 },
        { "year": 2018 },
        { "year": 2020 },
        { "year": 2019 },
        { "year": 2021 },
        { "year": 2018 },
        { "year": 2020 },
        { "year": 2019 },
        { "year": 2019 },
        { "year": 2021 },
        { "year": 2022 },
        { "year": 2023 },
        { "year": 2025 },
        { "year": 2024 },
        { "year": 2026 },
        { "year": 2023 },
        { "year": 2025 },
        { "year": 2024 },
        { "year": 2024 },
        { "year": 2026 },
        { "year": 2027 },
        { "year": 2028 },
        { "year": 2030 }
    ]




    const [selectedCountry, setSelectedCountry] = useState();

    const handelCheck = (e) => {
        const selectedId = e.target.value;
        setSelectedCountry(selectedId);
        console.log('Selected Country ID:', selectedId);
        const phoneCode = country.filter((item) => item.id == parseInt(selectedId, 10))
        if (phoneCode) {
            console.log('Phone Code:', phoneCode[0].code);
        }
        setSelectedCountry((phoneCode[0].code))
    }



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: "",
        password: '',
        profileCreationDate: '',
        sale: '',
        id: '',
        referalID: '',
    });
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleFormSubmit = async (e: React.FormEvent) => {
    const handleFormSubmit = async (e) => {
        e.preventDefault();

    };
    return <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md flex gap-6 w-3/4">
                {/* Left Side: Form */}
                <div className="flex-1 bg-gray-200 p-6 rounded-md flex flex-col justify-start items-center">
                    <h2 className="text-xl font-semibold mb-4">Student Partner Internship</h2>
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

                {/* Right Side: Random Text */}


                <div className="flex-1">
                    <form onSubmit={handleFormSubmit}>
                        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                                1)  First Name
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
                                2) Last Name
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
                                3) Email
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
                            <label htmlFor="Phone" className="block text-sm font-medium text-gray-600">
                                4. Phone number*
                            </label>

                            <div className='flex  gap-2  justify-start w-full items-center'>
                                <select className='border p-3 rounded-md' onChange={handelCheck}>
                                    {country.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>

                                <div className='border flex items-center w-full rounded-md' id=''>
                                    <div>{selectedCountry}</div>
                                    <input
                                        type="tel"
                                        id="Phone"
                                        name="Phone"
                                        className="mt-1 p-3 block w-full rounded-md border-none  focus:ring focus:ring-indigo-200"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                5. College/Institute name (Enter the full name and NOT short form)*
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
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                6. City of college / institute*
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
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                7. State of college / institute*
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

                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                8. Branch of study / graduation*
                            </label>
                            <select className='p-3  border rounded-md'>
                                {
                                    Branch.map((item) => <option>{item.field}</option>)
                                }
                            </select>
                        </div>

                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                9. Graduation degree*
                            </label>
                            <select className='p-3  border rounded-md'>
                                {
                                    Degree.map((item) => <option>{item.degree}</option>)
                                }
                            </select>
                        </div>

                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                10. Year of graduation / passing*
                            </label>
                            <select className='p-3  border rounded-md'>
                                {
                                    Year.map((item) => <option>{item.year}</option>)
                                }
                            </select>
                        </div>

                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <label>11. Why should you be hired for this 'Student Partner Internship'?*</label>
                            <div className='flex flex-col justify-between gap-2 '>
                                <div className='text-sm text-gray-400 flex flex-col justify-between gap-3'>
                                    <p>A. Write about your achievements, positions of responsibility or anything else that will help us decide upon your application.</p>
                                    <p>B. Share how you plan to create awareness about Bolt IoT and ML in your college. </p>
                                    <p><span className='font-semibold text-gray-400'>Be specific with your answer</span>, e.g. If you have been part of the college club, then mention the name of the club, or if you have been an organiser for a college event, then mention the specific name of the event and the year.</p>
                                </div>
                                <div className='w-full border rounded-md'>

                                    <textarea className="rounded-md w-full p-3 resize-none" rows={2} id="id"></textarea>
                                </div>
                            </div>
                        </div>


                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <label>12. Based on the 'Selected intern's responsibilities’ mentioned on this page, which of the following are the tasks that you will be performing during the internship if selected? Choose the correct answer below</label>
                            <div className='flex flex-col justify-between gap-2 '>
                                <div className='text-sm  flex flex-col justify-between gap-3'>
                                    <p className='text-gray-400'>This question is to check if you have read and understood the 'Selected intern's responsibilities'.</p>
                                    <p className='flex gap-2 items-start'>
                                        <input className="mt-2" type="radio" value="" id="id" />
                                        <span>Promote the IoT and ML online training, increase the awareness about IoT and ML and organise a webinar in your college.</span></p>

                                    <p className='flex gap-2 items-start'>
                                        <input className="mt-2" type="radio" value="" id="id" />
                                        <span>Study circuit design, software programming and accordingly build IoT and ML projects.</span></p>
                                </div>
                                <div className='w-full border rounded-md'>

                                    <textarea className="rounded-md w-full p-3 resize-none" rows={2} id="id"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className='mb-4 '>
                            <p className='text-sm my-1'>
                                By submitting this form, you agree to receive communication over SMS, E-Mail and Whatsapp from Bolt IoT.
                            </p>
                            <button className='bg-gray-800 py-2 px-8 rounded-md text-slate-100'>Submit</button>

                        </div>

                    </form>

                </div>
            </div>
        </div>

    </>
}

export default bolt