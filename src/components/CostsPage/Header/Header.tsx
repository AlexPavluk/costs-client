import { useStore } from "effector-react";
import {MutableRefObject, useEffect, useRef, useState} from "react"
import { useTranslation } from "react-i18next";
import { createCostsFx } from "../../../api/costsClient";
import { $totalPrice, createCosts } from "../../../context";
import { ICostsHederProps } from "../../../types";
import { countTotalPrice } from "../../../utils/arrayUtils";
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/authAlert";
import { validationInputs } from "../../../utils/validationInputs";
import { Spinner } from "../../Spiner/Spiner"
import './style.scss'

const Header = ({ costs }: ICostsHederProps) => {
    const {t} = useTranslation();
    const [spinner, setSpinner] = useState(false);
    const textRef = useRef() as MutableRefObject<HTMLInputElement>
    const priceRef = useRef() as MutableRefObject<HTMLInputElement>
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>
    const totalPrice = useStore($totalPrice)

    useEffect(() => {
       
        countTotalPrice(costs)
    }, [costs])

    const formSabmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const textInputValue = textRef.current.value;
        const priceInputValue = priceRef.current.value;
        const dateInputValue = dateRef.current.value;
        const authData = getAuthDataFromLS();

        event.preventDefault();
        setSpinner(true)

        if (!validationInputs(
            textRef,
            priceRef,
            dateRef
        )) {
            setSpinner(false);
            return;
        }

        const cost = await createCostsFx({
            url: '/costs',
            cost: {
                text: textInputValue,
                price: parseInt(priceInputValue),
                data: dateInputValue
            },
            token: authData.access_token
        });

        if (!cost) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        createCosts(cost);
        handleAlertMessage({alertText: <span>{t('create-cost-alert')}</span>, alertStatus: 'success'})
    }

    

    return (
        <div>
            <form className="d-flex mb-3" onSubmit={formSabmit}>
                <div className="form-item">
                    <span className="mb-3">
                        {t('shop-input')}
                    </span>
                    <input
                        ref={textRef}
                        className="form-control"
                        type="text" />
                </div>
                <div className="form-item">
                    <span className="mb-3">
                        {t('price-input')}
                    </span>
                    <input
                        ref={priceRef}
                        className="form-control"
                        type="text" />
                </div>
                <div className="form-item">
                    <span className="mb-3">
                        {t('date-input')}
                    </span>
                    <input
                        ref={dateRef}
                        className="form-control"
                        type="date" />
                </div>
                <button className='btn btn-primary add-btn'>
                    {spinner ? <Spinner top={5} left={20} /> : <span>{t('btn-add-cost')}</span>}
                </button>
            </form>
            <div style={{ textAlign: 'end', marginBottom: 10 }}>
                {t('totalt-mount')}
                <span>{isNaN(parseInt(String(totalPrice))) ? 0 : parseInt(String(totalPrice))}</span>
                {t('valuts')}.
            </div>
        </div>
    )
}

export default Header