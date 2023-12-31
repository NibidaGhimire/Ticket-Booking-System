import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { datetime, location } from '../assets';
import { MovieContext } from './MovieContext';

const Eventdetails = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState("");
    const { setSelectedMovieDetails } = useContext(MovieContext);
    const { count,setCount } = useContext(MovieContext);
    const dateandtime = new Date()


    // Fetch movie details using 'title',getting setting count and moviedetails after change,
    useEffect(() => {
        const storedCount = JSON.parse(localStorage.getItem('count'));
        if (storedCount) {
            setCount(storedCount);
        }

        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=2604040a&i=${id}`);
                if (response.ok) {
                    const movie = await response.json();
                    setMovieDetails(movie);
                    setSelectedMovieDetails(movie);

                    // Storing movie details for getting it after refreshing the page
                    localStorage.setItem('selectedMovieDetails', JSON.stringify(movie));

                } else {
                    console.error(`Failed to fetch data for ${id}. Status code: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id, setSelectedMovieDetails,setCount]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }


    // Subtracting number of tickets upto 1 and storing it 
    const handleSub = () => {
        setCount((prev) => (prev > 1 ? prev - 1 : 1))
        localStorage.setItem('count', JSON.stringify(count > 1 ? count - 1 : 1));
    }

    // Adding number of tickets upto 10 and storing it 
    const handleAdd = () => {
        setCount((prev) => (prev < 10 ? prev + 1 : 10))
        localStorage.setItem('count', JSON.stringify(count < 10 ? count + 1 : 10));
    }
    return (
        <div className='mt-20 mx-20 justify-between flex flex-wrap'>

            {/*Selected Movie details */}
            <div className='bg-tertiary px-4 py-4 shadow-md shadow-primary rounded-xl flex flex-col gap-2 w-fit'>
                <div>
                    <p className='mx-2 my-2 px-2 py-2 absolute bg-tertiary rounded-lg bg-opacity-70'>{movieDetails.Type}</p>
                    <img src={movieDetails.Poster} alt={movieDetails.Poster} />
                </div>
                <h2 className='font-semibold text-[20px]'>
                    {movieDetails && movieDetails.Title ? movieDetails.Title : 'Loading...'}
                </h2>                     
                <div className='flex justify-between items-center'>
                    <p>Year: {movieDetails.Year}</p>
                    <p className='text-[12px]'>{movieDetails.Director}</p>
                </div>
            </div>

            {/* Event details */}
            <form className='items-left py-2 px-8 bg-tertiary h-fit w-[466px] rounded-lg shadow-md shadow-primary flex flex-col gap-8 '>
                <h1 className='font-semibold text-[20px] py-4 border-b border-sec'>Event Details</h1>

                <div className='flex flex-row gap-4 items-center pb-4 border-b border-sec'>
                    <img src={datetime} alt="datetime" className='w-12 h-12' />
                    <div className='flex flex-col gap-2'>
                        <h1 className='text'>Date and Time</h1>
                        {/* Getting current date and time */}
                        <p className='font-semibold text-[16px]'>{`${dateandtime.getMonth() + 1}/${dateandtime.getDate()}/${dateandtime.getFullYear()} - ${dateandtime.getHours()}:${dateandtime.getMinutes()}`}</p>
                    </div>
                </div>

                <div className='flex flex-row gap-4 items-center pb-4 border-b border-sec'>
                    <img src={location} alt="location" className='w-12 h-12' />
                    <div className='flex flex-col gap-2'>
                        <h1 className='text'>Location</h1>
                        <p className='font-semibold text-[16px]'>Kathmandu,Nepal</p>
                    </div>
                </div>

                <h2 className='font-semibold text-[20px]'>Select Tickets</h2>

                <div className='flex justify-between px-4'>
                    <div className='flex flex-col '>
                        <p> 1x Ticket(s) </p>
                        <h1 className='font-semibold text-[20px]'>USD $500</h1>
                    </div>
                    <div className='flex gap-8 items-center'>
                        <p
                            onClick={handleSub}
                            className='cursor-pointer px-4 py-2 bg-black bg-opacity-80 rounded-md'>-</p>

                        <p className='font-semibold text-[20px]'>{count}</p>

                        <p
                            onClick={handleAdd}
                            className=' cursor-pointer px-4 py-2 bg-secondary bg-opacity-80 rounded-md'> +</p>
                    </div>
                </div>

                <Link
                    key={movieDetails.imdbID}
                    to={{
                        pathname: `/${movieDetails.imdbID}/${count}`,
                    }}
                    className='w-full'
                >
                    <button
                        type='button'
                        className='bg-blue rounded-md py-2 w-full'

                    >
{/* Generating button info according to the count price */}
                        {`Checkout for $${count * 500}`}
                    </button>
                </Link>

            </form>
        </div>
    );
};

export default Eventdetails;