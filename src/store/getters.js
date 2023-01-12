const getters = {
  app_name: state => state.app.app_name,
  app_version: state => state.app.app_version,
  server_config: state => state.app.server_config,
  device_info: state => state.app.device_info,
  menu_button_bounding: state => state.app.menu_button_bounding,
  info: state => state.user.info,
}
export default getters;
