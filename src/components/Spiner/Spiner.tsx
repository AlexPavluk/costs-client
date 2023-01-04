import { ISpinerProps } from "../../types";
import './style.scss';


export const Spinner = ({ top, left }: ISpinerProps) => (
    <div 
    style={{ top: `${top}px`, left: `${left}px`}}
    className='spinner-border main-spiner' role='status'
    />
)
    
