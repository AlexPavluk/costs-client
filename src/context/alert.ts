import {  createDomain } from "effector";
import { IAlert } from "../types";

const alert = createDomain();

export const setAlert = alert.createEvent<IAlert>();

export const $alert = alert.createStore<IAlert>({alertText:'', alertStatus:''}).on(setAlert, (_: any, value: any) => value);