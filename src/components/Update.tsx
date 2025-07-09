import { useState, useEffect, type ChangeEvent } from 'react';
import Button from './Button';
import { type Movie } from '../lib/types';

interface HeaderProps {
    movieData: []
    updateKey: number | string | null;
    setUpdateKey: (key: number | string | null) => void;
    updateMovies: (movieData: any) => void;
    downloadJSON: () => void;   
}

export default function Update({ movieData, updateKey, setUpdateKey, updateMovies, downloadJSON }: HeaderProps) {

    const [message, setMessage] = useState<string>('');

    const gradeOptions = [
        { value: 1, label: 'Masterpiece' },
        { value: 2, label: 'Excellent' },
        { value: 3, label: 'Excellent -' },
        { value: 4, label: 'Good +' },
        { value: 5, label: 'Good' },
        { value: 6, label: 'Good -' },
        { value: 7, label: 'Mediocre +' },
        { value: 8, label: 'Mediocre' },
        { value: 9, label: 'Mediocre -' },
        { value: 10, label: 'Bad +' },
        { value: 11, label: 'Bad' },
        { value: 12, label: 'Bad -' },
        { value: 13, label: 'Rotten' }
    ];

    const genreOptions = [
        { value: 1, label: 'Action/Adventure' },
        { value: 2, label: 'Biography' },
        { value: 3, label: 'Comedy' },
        { value: 4, label: 'Comic/Superhero' },
        { value: 5, label: 'Documentary' },
        { value: 6, label: 'Drama' },
        { value: 7, label: 'Epic' },
        { value: 8, label: 'Family' },
        { value: 9, label: 'Fantasy' },
        { value: 10, label: 'Horror' },
        { value: 11, label: 'Musical' },
        { value: 12, label: 'Romance' },
        { value: 13, label: 'Science Fiction' },
        { value: 14, label: 'Suspense' },
        { value: 15, label: 'War' },
        { value: 16, label: 'Western' }
    ];   

    const handleYear = (e: ChangeEvent<HTMLInputElement>) => {
        //update directly so as not to cause a re-render
        inputYear.value = (e.target.value.replace(/\D/g, "")); //only allow digits
    };

    const validateInput = () => {
        let year = inputYear.value;
        let title = inputTitle.value.trim();
        let deeGrade = parseInt(inputDeeGrade.value);
        let joeGrade = parseInt(inputJoeGrade.value);
        let genre = parseInt(inputGenre.value);

        let msg = '';
        if (year === '') msg += 'Year is required.<br>';
        else if (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) msg += 'Please enter a valid year between 1900 and the current year.<br>';
        if (title === '') msg += 'Title is required.<br>';
        if (deeGrade + joeGrade === 0) msg += 'At least one grade must be selected for this review.<br>';
        if (genre === 0) msg += 'Genre must be selected.<br>';
        setMessage(msg);

        if (msg === '') {            
            let movie: Movie = {
                id: updateKey === 'new' ? movieData.length : updateKey as number,
                year: year, 
                title: title,
                deegrade: gradeOptions.find(option => option.value === deeGrade)?.label || '',
                joegrade: gradeOptions.find(option => option.value === joeGrade)?.label || '',
                genre: genreOptions.find(option => option.value === genre)?.label || ''
            };
            updateMovies(movie);
        }
    };

    let inputYear: HTMLInputElement;
    let inputTitle: HTMLInputElement;
    let inputDeeGrade: HTMLSelectElement;
    let inputJoeGrade: HTMLSelectElement;
    let inputGenre: HTMLSelectElement;

    useEffect(() => {
        //component mounted
        inputYear = (document.getElementById('inputYear') as HTMLInputElement);
        inputTitle = (document.getElementById('inputTitle') as HTMLInputElement);
        inputDeeGrade = (document.getElementById('inputDeeGrade') as HTMLSelectElement);
        inputJoeGrade = (document.getElementById('inputJoeGrade') as HTMLSelectElement);
        inputGenre = (document.getElementById('inputGenre') as HTMLSelectElement);

        if (updateKey !== 'new') {
            const movie = movieData.find((m: Movie) => m.id === updateKey) as unknown as Movie;
            inputYear.value = movie.year;
            inputTitle.value = movie.title;
            inputDeeGrade.value = gradeOptions.find(option => option.label === movie.deegrade)?.value.toString() || '0';
            inputJoeGrade.value = gradeOptions.find(option => option.label === movie.joegrade)?.value.toString() || '0';
            inputGenre.value = genreOptions.find(option => option.label === movie.genre)?.value.toString() || '0';
        }        
    }, []);

    const tailwindClasses: string = "border p-1 mr-2 bg-gray-700 text-white";
    const title: string = updateKey === 'new' ? 'New Movie' : 'Update Movie';

    return (
        <div className="container fixed h-[100%] w-[100%] bg-white/80 top-0 z-10 flex justify-center items-center">
            <div className="absolute bg-gray-900 top-[30%] top-5 p-2">
                <h1 className="text-2xl font-bold text-center text-white pb-2">{title}</h1>
                <div className='text-center'>
                    <input id="inputYear" type='text' placeholder="Year" maxLength={4} className={"w-15 " + tailwindClasses} onChange={handleYear} />
                    <input id="inputTitle" type="text" placeholder="Title" className={tailwindClasses} />
                    <select id="inputDeeGrade" className={tailwindClasses}>
                        <option value="0">Dee's Grade</option>
                        {gradeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <select id="inputJoeGrade" className={tailwindClasses}>
                        <option value="0">Joe's Grade</option>
                        {gradeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <select id="inputGenre" className={tailwindClasses}>
                        <option value="0">Genre</option>
                        {genreOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <Button buttonLabel='Submit' buttonColor='blue' buttonClick={validateInput}></Button>
                </div>
                <div className="text-red-500 text-center mt-2" dangerouslySetInnerHTML={{ __html: message }}></div>
                <div className="absolute top-2 right-2">
                    <Button buttonLabel='X' buttonColor='blue' buttonClick={() => setUpdateKey(null)}></Button>
                </div>
                <div className="absolute top-2 left-2">
                    <Button buttonLabel='Download' buttonColor='blue' buttonClick={downloadJSON}></Button>
                </div>
            </div>
        </div>
    );
}


















