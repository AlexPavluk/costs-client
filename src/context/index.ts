import { createDomain } from "effector";
import { ICosts } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICosts[]>();
export const createCosts = costs.createEvent<ICosts>();
export const updateCosts = costs.createEvent<ICosts>();
export const removeCosts = costs.createEvent<string | number>();
export const setTotalPrice = costs.createEvent<number>();

const handleRemoveCosts = (costs: ICosts[], id: string | number) => costs.filter(cost => cost._id !== id);

const handleUpdatedCost = (
    costs: ICosts[],
    id: string | number,
    payload: Partial<ICosts>

) => costs.map(cost => {
    if (cost._id === id) {
        return {
            ...cost,
            ...payload
        }
    }
    return cost;
})

export const $costs = costs.createStore<ICosts[]>([])
    .on(createCosts, (state, cost) => [...state, cost])
    .on(setCosts, (_, costs) => costs)
    .on(removeCosts, (state, id) => [...handleRemoveCosts(state, id)])
    .on(updateCosts, (state, cost) => [...handleUpdatedCost(
        state,
        cost._id as string,
        {
            text: cost.text,
            price: cost.price,
            data: cost.data
        })])

export const $totalPrice = costs.createStore<number>(0).on(setTotalPrice, (_, value) => value);