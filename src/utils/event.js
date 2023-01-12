/**
 * 全局事件注册
 */
export class EventHandler {
	static EVENT_LIST = [];

	constructor(event_name) {
		if (EventHandler.EVENT_LIST.includes(event_name)) {
			throw new Error(`Global Event Error: event '${event_name}' is already exist`);
		}
		this.event_name = event_name;
		EventHandler.EVENT_LIST.push(event_name);
	}

	static getEventList() {
		return EventHandler.EVENT_LIST;
	}
	getEventList() {
		return EventHandler.EVENT_LIST;
	}

	$emit(data) {
		return uni.$emit(this.event_name, data);
	}

	$on(callback) {
		return uni.$on(this.event_name, callback);
	}

	$once(callback) {
		return uni.$once(this.event_name, callback);
	}

	$off(callback) {
		return uni.$off(this.event_name, callback);
	}
}

/**
 * 用户登录事件
 */
export const eventUserLogin = new EventHandler("user_login");
