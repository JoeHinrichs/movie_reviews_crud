import { type Movie } from '../lib/types';

import Button from './Button';

interface MovieListProps {
  movieData: [];
  sortKey: string;
  setUpdateKey: (key: string | number | null) => void;
}

export default function MovieList({ movieData, sortKey, setUpdateKey }: MovieListProps) {

  let sorted = sortData(movieData, sortKey);
  let tailwindCommon = 'border border-gray-300';

  return (
    <main className="relative -top-0.25 bg-white">
      <table className="table-auto min-w-full">
        <tbody>
          {sorted.map((movie: Movie, index:number) => (
            <tr className={(index % 2 !== 0) ? 'bg-gray-200' : ''} key={movie.id}>
              <td className={'w-[7.5%] text-center ' + tailwindCommon}>{movie.year}</td>
              <td className={'w-[40%] text-left pl-1 ' + tailwindCommon}>{movie.title}</td>
              <td className={'w-[15%] text-center ' + tailwindCommon}>{movie.deegrade}</td>
              <td className={'w-[15%] text-center ' + tailwindCommon}>{movie.joegrade}</td>
              <td className={'w-[15%] text-center ' + tailwindCommon}>{movie.genre}</td>
              <td className={'w-[7.5%] text-center border border-white border-t-0 bg-gray-700'}><Button buttonLabel='Edit' buttonClick={() => {setUpdateKey(movie.id)}}></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

function sortData(array: [], key: string) {
  let newArray = array.slice(0); //don't mutate data, clone instead
  let sortedArray = newArray.sort(function (a, b) {
    let x: string = a[key]; if (x == undefined || x == "") { x = "zzzz"; } // 'Ω' is actually the last possible character, but this is probably good enough...
    let y: string = b[key]; if (y == undefined || y == "") { y = "zzzz"; }
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  return sortedArray;
}