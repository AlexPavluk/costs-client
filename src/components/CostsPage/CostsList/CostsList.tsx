import { ICosts } from '../../../types'
import { CostItem } from '../CostsItem/CostItem'

export const CostsList = ({ costs }:{costs: ICosts[]}) => {
  return (
    <ul className='list-group'>
        {costs.map((cost, index) => 
        (<CostItem cost={cost} index={index+1} key={cost._id}/>
        ))}
    </ul>
  )
}
