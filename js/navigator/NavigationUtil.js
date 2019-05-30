export default class NavigationUtil {

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