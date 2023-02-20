import { useStore } from "effector-react";
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation }  from "react-i18next";
import { getCostsFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context";
import { getAuthDataFromLS } from "../../utils/authAlert";
import { Spinner } from "../Spiner/Spiner";
import { CostsList } from "./CostsList/CostsList";
import Header from "./Header/Header"

const CostsPage = () => {
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef(true);

  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false;
      handleGetCosts();
    }
    
  }, [])
  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();

    const costs = await getCostsFx({
      url: '/costs',
      token: authData.access_token
    });

    setSpinner(false); 
    setCosts(costs);
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px'}}>{t('title')}</h2>
      {useMemo(() => <Header costs={store}/>, [store])}
      <div style={{ position: 'relative' }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(() => <CostsList costs={store} />, [store])}
        {(!spinner && !store.length) && <h2>{t('dont-havecosts')}</h2>}
      </div>
    </div>
  )
}

export default CostsPage