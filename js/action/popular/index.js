import Types from '../types'
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import {handlerData} from '../ActionUtil'

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {Function}
 */
export function onloadPopularData(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName})
    let dataStore = new DataStore()
    dataStore.fetchData(url, FLAG_STORAGE.flag_popular).then(data => {
      handlerData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
    }).catch(error => {
      console.log(error)
      dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, error})
    })
  }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
  return dispatch => {
    window.setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callBack === 'function') {
          callBack('no more')
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}

