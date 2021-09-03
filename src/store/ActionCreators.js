import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";
const dataSource = new RestDataSource();

export const loadData = (dataType, userId) => (
    {
        type: ActionTypes.DATA_LOAD,
        payload: dataSource.StoreData(dataType, { userId: userId }).then(response =>
        ({
            dataType,
            data: response.data,
        })
        )
    })
export const register = (dataType, userInfo) => (
    {
        type: ActionTypes.REGISTER,
        payload: dataSource.StoreData(dataType, userInfo).then(response =>
        ({
            dataType,
            data: response.data,
        })
        )
    })