export interface IAlert {
    alertText: string | any;
    alertStatus: string;
}

export interface IAlertProps {
    props: IAlert;
}

export interface ISpinerProps {
    top: number;
    left: number;
}

export interface ICostsHederProps {
    costs: ICosts[];
}

export interface ICosts {
    text: string;
    price: number;
    data: Date | string;
    _id?: number | string;
}

export interface ICreateCost {
    cost: ICosts;
    url: string;
    token: string;
}

export interface IGetCosts {
    url: string;
    token:string;
}

export interface IRefreshToken {
    url: string;
    token: string;
    username: string
}

export interface IHandleAxiosErrorPayload {
    type: string;
    createCosts?: Partial<ICreateCost>
    getCosts?: Partial<IGetCosts>;
    deleteCost?: Partial<IDeleteCosts>;
    updateCosts?: Partial<IUpdateCost>;
}

export interface IUpdateCost {
    id: number | string;
    token: string;
    url: string;
    cost: ICosts
}

export interface ICostsItemProps {
    cost: ICosts;
    index: number;
}

export interface IDeleteCosts {
    url: string;
    token: string
    id: string | number 
}