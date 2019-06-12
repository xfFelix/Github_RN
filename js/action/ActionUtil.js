/**
 * 处理刷新列表数据
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
export function handlerData(actionType, dispatch, storeName, data, pageSize) {
  let fixItems = []
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data
    } else if (Array.isArray(data.data.items)){
      fixItems = data.data.items
    }
  }
  dispatch({
    type: actionType,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    items: fixItems,
    storeName,
    pageIndex: 1
  })
}
