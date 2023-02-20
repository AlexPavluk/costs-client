import { AxiosError } from "axios";
import { createCostsFx, deleteCostsFx, getCostsFx, refreshTokenFx, updateCostsFx } from "../api/costsClient";
import i18next from "i18next"
import { createCosts, setCosts, updateCosts } from "../context";
import { ICosts, IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, handleAlertMessage, removeUser } from "./authAlert";

export const handleAxiosError = async (
    error: unknown,
    payload: IHandleAxiosErrorPayload | null = null
) => {
    const errorMessage = 
        ((error as AxiosError).response?.data as { message: string }).message ||
        ((error as AxiosError).response?.data as { error: string }).error;

        

    if (errorMessage) {
        if (errorMessage === "jwt expired") {
            const payloadData = payload as IHandleAxiosErrorPayload;
            const authData = getAuthDataFromLS();

            refreshTokenFx({
                url: '/auth/refresh',
                token: authData.refresh_token,
                username: authData.username
            });

            if (payload !== null) {
                switch (payloadData.type) {
                    case 'get':
                        const costs = await getCostsFx({
                            url: '/costs',
                            token: authData.access_token
                        });

                        setCosts(costs);
                        break;
                        case 'create':
                        const cost = await createCostsFx({
                            url: '/costs',
                            token: authData.access_token,
                            cost: {...payloadData.createCosts?.cost} as ICosts
                        });

                        if (!cost) {
                            return
                        }

                        createCosts(cost);
                        handleAlertMessage({alertText: i18next.t("create-cost-alert"), alertStatus: 'success'});
                        break;
                        case 'update':
                            const updateCost = await updateCostsFx({
                                url: '/costs',
                                token: authData.access_token,
                                cost: {...payloadData.updateCosts?.cost} as ICosts,
                                id: payloadData.updateCosts?.id as string
                            });
    
                            if (!updateCost) {
                                return
                            }
    
                            updateCosts(updateCost);
                            handleAlertMessage({alertText: i18next.t("create-cost-alert"), alertStatus: 'success'});
                            break;
                        case 'delete':
                         await deleteCostsFx({
                            url: '/costs',
                            token: authData.access_token,
                            id: payload.deleteCost?.id as string
                        });
                        break;
                    default:
                        break;
                }
            }
        } else {
            handleAlertMessage({ alertText: errorMessage, alertStatus: 'warning' });
            removeUser();
        }
    } else {
        handleAlertMessage({ alertText: errorMessage, alertStatus: 'warning' });
    }
}