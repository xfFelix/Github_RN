export default class NavigationUtil {

  /**
   * 跳转指定页面
   * @param params 要传递的参数
   * @param page 页面名
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation
    if (!navigation) {
      return console.log('NavigationUtil.navigation can not be null')
    }
    navigation.navigate(page,{...params})
  }

  /**
   * 重置到首页
   * @param params
   */
  static resetToHomePage(params) {
    const { navigation } = params
    navigation.navigate('Main')
  }

  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation) {
    navigation.goBack()
  }
}