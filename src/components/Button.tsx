import {type MouseEvent} from "react";

interface ButtonProps {
    buttonLabel: string;
    buttonColor?: string;
    buttonSelected?: boolean;
    buttonClick: (e:MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ buttonLabel, buttonColor='blue', buttonSelected, buttonClick }: ButtonProps) {
    let tailwindClasses = "";
    tailwindClasses += "text-white ";
    tailwindClasses += "p-1 pr-2 pl-2 ";
    tailwindClasses += "cursor-auto hover:cursor-pointer ";

    if (buttonLabel === 'Submit' || buttonLabel === 'Download') tailwindClasses += "w-fit "
    else if (buttonLabel === 'X') tailwindClasses += "w-fit text-sm rounded-md font-bold ";
    else tailwindClasses += "w-full ";

    if (buttonSelected) tailwindClasses += buttonColor + "-selected";
    else tailwindClasses += buttonColor;

    return (
        <button className={tailwindClasses} onClick={buttonClick}>{buttonLabel}</button>
    );
}


















