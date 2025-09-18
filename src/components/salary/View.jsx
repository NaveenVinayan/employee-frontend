import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null)
    const { id } = useParams();
    let sno = 1;

    const { user } = useAuth()

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`https://employee-api-eight.vercel.app/api/salary/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                setSalaries(response.data.salary)
                setFilteredSalaries(response.data.salary)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        fetchSalaries();
    }, [])

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
        setFilteredSalaries(filteredRecords)
    }


    return (
        <>
            {filteredSalaries === null ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 
        0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
        100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
        91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 
        50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
        97.0079 33.5539C95.2932 28.8227 92.871 
        24.3692 89.8167 20.348C85.8452 15.1192 
        80.8826 10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
        0.367541 46.6976 0.446843 41.7345 
        1.27873C39.2613 1.69328 37.813 4.19778 
        38.4501 6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 9.54855 
        51.7191 9.52689 55.5402 10.0491C60.8642 
        10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 32.2913 
        88.1811 35.8758C89.083 38.2158 91.5421 
        39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className='overflow-x-auto p-5'>
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold'>Salary History</h2>
                    </div>
                    <div className='flex justify-end my-3'>
                        <input type="text" placeholder='Search By Emp ID' className='border px-2 rounded-md py-0.5 border-gray-300' onChange={filterSalaries} />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                                <tr>
                                    <th className='px-6 py-3'>SNO</th>
                                    <th className='px-6 py-3'>Emp ID</th>
                                    <th className='px-6 py-3'>Salary</th>
                                    <th className='px-6 py-3'>Allowance</th>
                                    <th className='px-6 py-3'>Deduction</th>
                                    <th className='px-6 py-3'>Total</th>
                                    <th className='px-6 py-3'>Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr key={salary.id} className='bg-white border-b dark:bg-gray-200 dark:border-gray-700'>
                                        <td className='px-6 py-3'>{sno++}</td>
                                        <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                        <td className='px-6 py-3'>{salary.basicSalary}</td>
                                        <td className='px-6 py-3'>{salary.allowances}</td>
                                        <td className='px-6 py-3'>{salary.deductions}</td>
                                        <td className='px-6 py-3'>{salary.netSalary}</td>
                                        <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <div>No Records</div>}
                </div>
            )}
        </>
    )
}

export default View
