import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';


export const actPutPostChangePrice = (ttg) => {
    return async () => {
        return await callApi('/ChangePrice', 'PUT', ttg, `Bearer ${getTokenEmployee()}`).then(res => {
            
        });
    }
}