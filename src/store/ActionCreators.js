import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType) => (
    {
        type: ActionTypes.DATA_LOAD,
        payload: dataSource.StoreData(dataType, { userId: "612cf57965b76d271ced6fa6" }).then(response =>
        ({
            dataType,
            data: response.data,
        })
        )
    })