import { type MouseEvent, useState } from 'react';

import Button from './Button';

interface ControlsProps {
    setSortKey: (e:MouseEvent<HTMLButtonElement>, param: string) => void;
    setUpdateKey: (key: string | number) => void; 
}

export default function Controls({ setSortKey, setUpdateKey }: ControlsProps) {

    const [selected, setSelected] = useState<string>('year');

    const handleSort = (e: MouseEvent<HTMLButtonElement>, param: string) => {
        setSelected(param);
        setSortKey(e, param);
    } 

    const tailwindCommon = 'border border-white';

    return (
        <header className="top-0 sticky z-1">
            <h1 className="text-white bg-gray-900 text-3xl font-bold text-center pt-1 pb-2">Joe & Dee's Movie Reviews Editor</h1>
            <table className="table-auto min-w-full pt-2 pb-2">
                <tbody>
                    <tr>
                        <td className={'w-[7.5%] ' + tailwindCommon}><Button buttonLabel='Year' buttonColor='blue' buttonSelected={selected === 'year'} buttonClick={(e) => handleSort(e, 'year')}></Button></td>
                        <td className={'w-[40%] ' + tailwindCommon}><Button buttonLabel='Title' buttonColor='blue' buttonSelected={selected === 'title'} buttonClick={(e) => handleSort(e, 'title')}></Button></td>
                        <td className={'w-[15%] ' + tailwindCommon}><Button buttonLabel='Dees Grade' buttonSelected={selected === 'deegrade'} buttonClick={(e) => handleSort(e, 'deegrade')}></Button></td>
                        <td className={'w-[15%] ' + tailwindCommon}><Button buttonLabel='Joes Grade' buttonSelected={selected === 'joegrade'} buttonClick={(e) => handleSort(e, 'joegrade')}></Button></td>
                        <td className={'w-[15%] ' + tailwindCommon}><Button buttonLabel='Genre' buttonSelected={selected === 'genre'} buttonClick={(e) => handleSort(e, 'genre')}></Button></td>
                        <td className={'w-[7.5%] ' + tailwindCommon}><Button buttonLabel='New' buttonColor='pink' buttonClick={() => setUpdateKey("new")}></Button></td>
                    </tr>
                </tbody>
            </table>
        </header>
    );
}


















