import { ICostsItemProps } from "../../../types"
import dayjs from 'dayjs'
import { MutableRefObject, useRef, useState } from "react"
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/authAlert"
import { deleteCostsFx, updateCostsFx } from "../../../api/costsClient"
import { removeCosts, updateCosts } from "../../../context"
import { Spinner } from "../../Spiner/Spiner"
import { validationInputs } from "../../../utils/validationInputs"
import './styles.scss'

export const CostItem = ({ cost, index }: ICostsItemProps) => {
  const date = dayjs(cost.data).format('DD.MM.YYYY');

  const [edit, setEdit] = useState(false)
  const [deleteSpinner, setDeleteSpinner] = useState(false)
  const [editSpinner, setEditSpinner] = useState(false)
  const [newText, setNewText] = useState(cost.text)
  const [newPrice, setNewPrice] = useState<string | number>(cost.price)
  const [newDate, setNewDate] = useState(cost.data)

  const textRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => setNewText(event.target.value);
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => setNewPrice(event.target.value);
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => setNewDate(event.target.value);


  const cancelEditCosts = () => {
    setEdit(false)
    setEditSpinner(false)
  }

  const deleteCosts = async () => {
    const authData = getAuthDataFromLS();
    setDeleteSpinner(true);

    await deleteCostsFx({
      url: '/costs',
      token: authData.access_token,
      id: cost._id as string
    });

    setDeleteSpinner(false);
    removeCosts(cost._id as string);
    handleAlertMessage({ alertText: 'Успешно удалено!', alertStatus: 'success' })

  }

  const handleEditCosts = async () => {
    setEditSpinner(true)

    if (
      newText === cost.text &&
      +newPrice === +cost.price &&
      newDate === cost.data
    ) {
      setEditSpinner(false);
      setEdit(false);
      return
    }

    if (!validationInputs(
      textRef,
      priceRef,
      dateRef
    )) {
      setEditSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const editerCost = await updateCostsFx({
      url: '/costs',
      token: authData.access_token,
      cost: {
        text: newText,
        price: +newPrice,
        data: newDate
      },
      id: cost._id as string
    });


    if (!editerCost) {
      setEditSpinner(false);
      setEdit(false)
      return;
    }

    setEdit(false)
    setEditSpinner(false);
    updateCosts(editerCost);
    handleAlertMessage({ alertText: 'Рассход обнавлен', alertStatus: 'success' })
  }
  return (
    <li 
    className= "cost-item list-group-item d-flex justify-content-between align-items-center"
      id={cost._id as string}>
      <div className="cost-item-left">
        <span>{index} Магазин</span>
        {edit ?
          <input
            ref={textRef}
            onChange={handleChangeText}
            value={newText}
            type='text'
            className="form-control cost-item__shop-input" /> :
          <span>"{cost.text}"</span>
        }

        {edit ?
          <input
            ref={dateRef}
            onChange={handleChangeDate}
            value={new Date(newDate).toISOString().split('T')[0]}
            type='date'
            className="form-control cost-item__date-input" /> :
          <span className="data"><> Дата {date}</></span>
        }
      </div>
      <div className="cost-item-right d-flex align-items-center">
        {edit ?
          <input
            ref={priceRef}
            onChange={handleChangePrice}
            value={newPrice}
            type='text'
            className="form-control cost-item__price-input" /> :
          <span style={{ marginRight: '10px' }} >Сумма {cost.price} </span>
        }
        {edit ?
          <div className="btn-block__inner">
            <button className="btn save-btn btn-success">
              {editSpinner ? <Spinner top={5} left={38} /> : <span onClick={handleEditCosts}>Cохранить</span>}</button>
            <button className="btn btn-danger btn-cancel" onClick={cancelEditCosts}>
              Отмена
            </button>
          </div> :

          <button className="btn edit-btn btn-primary" style={{ marginRight: '10px' }} onClick={() => setEdit(true)}>Изменить</button>

        }
        <button className="btn btn-danger btn-delete" onClick={deleteCosts}>
          {deleteSpinner ? <Spinner top={5} left={7} /> : <span>&times;</span>}
        </button>
      </div>
    </li>
  )
}
