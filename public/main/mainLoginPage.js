import { makeElement } from "../makeHTMLElement.js";
import { deleteNodes } from '../deleteNodes.js';
import { makeSignUpPage } from './mainSignUpPage.js';

/* Main 내부 로그인 페이지 */
export function makeLoginPage(main) {
	deleteNodes('.main');
	/* 아이디 입력 */
	const idInput = makeElement('input', 'main__login--idInput', null);
	idInput.placeholder = "아이디를 입력해주세요.";
	main.appendChild(idInput);

	/* 비밀번호 입력 */
	const passwordInput = makeElement('input', 'main__login--passwordInput', null);
	passwordInput.type = 'password';
	passwordInput.placeholder = "비밀번호를 입력해주세요.";
	main.appendChild(passwordInput);

	/* 회원가입 버튼 */
	const signUpButton = makeElement('div', 'main__login--signUp', "회원가입");
	signUpButton.addEventListener('click', () => {
		history.pushState(null, null, '/sign_up');
		makeSignUpPage(main);
	});
	main.appendChild(signUpButton);

	/* 로그인 버튼 */
	const loginButton = makeElement('div', 'main__login--loginButton', "로그인");
	main.appendChild(loginButton);
}