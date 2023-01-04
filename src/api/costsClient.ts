import { createEffect } from "effector";
import { ICreateCost, IDeleteCosts, IGetCosts, IRefreshToken, IUpdateCost } from "../types";
import { removeUser } from "../utils/authAlert";
import { handleAxiosError } from "../utils/errors";
import api from './axiosClient'

export const createCostsFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
    try {
        const { data } = await api.post(url, { ...cost }, { headers: { 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',} });

        return data;
    } catch (error) {
        handleAxiosError(error, { type: 'create', createCosts: { cost } });
    }
});

export const updateCostsFx = createEffect(async ({ url, cost, token, id }: IUpdateCost) => {
    try {
        const { data } = await api.patch(`${url}/${id}`, { ...cost }, { headers: { 'Authorization': `Bearer ${token}` } });

        return data;
    } catch (error) {
        handleAxiosError(error, { type: 'update', updateCosts: { cost, id } });
    }
});

export const getCostsFx = createEffect(async ({ url, token }: IGetCosts) => {
    try {
        const { data } = await api.get(url, { headers: { 'Authorization': `Bearer ${token}` } });

        return data;
    } catch (error) {
        handleAxiosError(error, { type: 'get' });
    }
})

export const refreshTokenFx = createEffect(async ({ url, token, username }: IRefreshToken) => {
    try {
        const result = await api.post(url, { refresh_token: token, username });

        if (result.status === 200) {
            localStorage.setItem('auth', JSON.stringify({
                ...result.data,
                username
            }));

            return result.data.access_token
        } else {
            removeUser();
        }
    } catch (error) {
        console.error(error)
    }
})

export const deleteCostsFx = createEffect(async ({ url, token, id }: IDeleteCosts) => {
    try {
        await api.delete(`${url}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });

    } catch (error) {
        handleAxiosError(error, { type: 'delete', deleteCost: { id } });
    }
})