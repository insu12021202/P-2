import {makeLoginPage} from './main/mainLoginPage.js';
import {main} from './main/main.js';

export function changeURL(url) {
	switch (url) {
		case '/':

			break;
		case '/sign_up':

			break;
		case '/login':
			makeLoginPage(main);
			break;
		case '/chat':

			break;
		case '/select_local':

			break;
		case '/like_list':

			break;
		case '/chat_list':
			
			break;
	}
}