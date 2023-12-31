import React, { useContext, useEffect, useRef, useState } from 'react';
import { MovieContext } from './MovieContext';
import PdfFile from '../pdf/PdfFile';
import {  PDFDownloadLink } from '@react-pdf/renderer';

const Checkout = () => {
    const { count, setCount } = useContext(MovieContext);
    const { selectedMovieDetails, setSelectedMovieDetails } = useContext(MovieContext);
    const formRef = useRef();
    const countryList = ["Nepal", "India", "Bangladesh", "Pakistan", "Bhutan"]
    const [pdfContent, setPdfContent] = useState(null);

    // Getting the stored Movie details and Count after refreshing the page
    useEffect(() => {
        const storedMovieDetails = JSON.parse(localStorage.getItem('selectedMovieDetails'));
        const storedCount = JSON.parse(localStorage.getItem('count'));
        if (storedMovieDetails) {
            setSelectedMovieDetails(storedMovieDetails);
        }
        if (storedCount) {
            setCount(storedCount);
        }
    }, [setSelectedMovieDetails, setCount]);

    // Initial state of form
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        country: "",
        zip: ""
    })

    // for the change of value in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }


    // Generating pdf after form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const content = <PdfFile formData={form} movieDetails={selectedMovieDetails} count={count} />;

        setPdfContent(content);
    };


    return (
        <div className='mt-20 mx-20 flex flex-col justify-between'>
            <div>
                <h1 className='py-4 font-semibold text-[20px] border-b border-sec'>Billing Confirmation</h1>
            </div>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='py-4 flex flex-wrap justify-between gap-10'
            >
                <div className='flex-[0.75] py-2 px-8 bg-tertiary rounded-lg'>
                    <h1 className='font-semibold text-[20px] py-4'>Information</h1>

                    {/* Input Infos */}
                    <label className='flex flex-col gap-2 py-2'>
                        <span>Full Name*:</span>
                        <input
                            required
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder='eg.Jane Cooper'
                            className='bg-sec bg-opacity-10 rounded-md py-2 px-2'
                        />
                    </label>

                    <div className='py-4 flex justify-between gap-2'>
                        <label className='flex flex-col gap-2 w-full'>
                            <span>Email*:</span>
                            <input
                                required
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}

                                placeholder='eg. janecooper@xyz.com'
                                className='bg-sec bg-opacity-10 rounded-md py-2 px-2 '
                            />
                        </label>
                        <label className='flex flex-col gap-2 w-full'>
                            <span>Address*:</span>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}

                                className='bg-sec bg-opacity-10 rounded-md py-2 px-2'
                            />
                        </label>
                    </div>

                    <div className='py-4 flex justify-between gap-2'>
                        <label className='flex flex-col gap-2 w-full'>
                            <span>Country:</span>
                            <select

                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                required
                                className='bg-sec bg-opacity-10 rounded-md py-2 px-2'
                            >
                                <option>Select Country</option>
                                {countryList.map((country) => (
                                    <option className='text-black' key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className='flex flex-col gap-2 w-full'>
                            <span>Zip Code:</span>
                            <input
                                type="number"
                                name="zip"
                                value={form.zip}
                                onChange={handleChange}

                                className='bg-sec bg-opacity-10 rounded-md py-2 px-2'
                            />
                        </label>
                    </div>
                </div>

                <div className='flex-[0.25] py-2 px-8 bg-tertiary rounded-lg h-fit' >
                    <h1 className='font-semibold text-[20px] py-4 border-b border-sec'>Checkout Summary</h1>
                    <div className='pb-4 border-b border-sec'>
                        {selectedMovieDetails && (
                            <div>
                                <h2 className='pt-4 font-semibold text-[16px]'>{selectedMovieDetails.Title}</h2>
                                <div className='flex justify-between text-[12px] text-sec'>
                                    <h3>{selectedMovieDetails.Type}</h3>
                                    <h3>Kathmandu Nepal</h3>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-2 text-[12px] pb-4 border-b border-sec'>
                        <div className="pt-4 flex justify-between">
                            <p className='text-sec'>Normal</p>
                            <p>x {count}</p>
                            <p>$500</p>
                        </div>

                        <div className='flex justify-between'>
                            <p className='text-sec'>Sub Total</p>
                            <p>{`$${count * 500}`}</p>

                        </div>

                        <div className='flex justify-between'>
                            <p className='text-sec'>Tax(13%)</p>
                            <p>{`$${count * 500 * 0.13}`}</p>
                        </div>

                        <div className='flex justify-between'>
                            <p className='text-sec'>Discount(0%)</p>
                            <p>{`$${count * 500 * 0}`}</p>
                        </div>
                    </div>

                    <div className='pt-4 pb-4 flex justify-between'>
                        <h3 className='text-sec'>Total</h3>
                        <div className='flex gap-2'>
                            <h3 className='text-sec'>USD</h3>
                            <h1 className='text-[20px] font-semibold'>{`$${count * 500 + count * 500 * 0.13}`}</h1>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='bg-secondary rounded-md py-2 w-full'
                    >
                        Confirm and Pay
                    </button>
                </div>
            </form>

            {/* Generating download link after form submission */}
            {pdfContent && (
                <PDFDownloadLink document={pdfContent} fileName="Tickets.pdf"
                    className='bg-blue px-4 py-2 rounded-xl text-center'
                >
                    {({ loading }) =>
                        loading ? <button>Loading document...</button> : <button> Download PDF</button>
                    }
                </PDFDownloadLink>
            )}
        </div>
    )
};

export default Checkout;




