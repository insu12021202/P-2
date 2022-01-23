import {makeLoginPage} from './main/mainLoginPage.js';
import {main} from './main/main.js';
import { makeSignUpPage } from './main/mainSignUpPage.js';

export function changeURL(url) {
	switch (url) {
		case '/':

			break;
		case '/sign_up':
			makeSignUpPage(main);
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