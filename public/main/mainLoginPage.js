import { makeElement } from "../makeHTMLElement.js";
import { deleteNodes } from '../deleteNodes.js';
import { makeSignUpPage } from './mainSignUpPage.js';

/* Main 내부 로그인 페이지 */
export function makeLoginPage(main) {
	deleteNodes('.main');
	const loginForm = makeElement('form', 'main__login--form', null);
	loginForm.action = "login";
	loginForm.method = "post";
	main.appendChild(loginForm);
	/* 아이디 입력 */
	const idInput = makeElement('input', 'main__login--idInput', null);
	idInput.placeholder = "아이디를 입력해주세요.";
	loginForm.appendChild(idInput);

	/* 비밀번호 입력 */
	const passwordInput = makeElement('input', 'main__login--passwordInput', null);
	passwordInput.type = 'password';
	passwordInput.placeholder = "비밀번호를 입력해주세요.";
	loginForm.appendChild(passwordInput);

	/* 회원가입 버튼 */
	const signUpButton = makeElement('div', 'main__login--signUp', "회원가입");
	signUpButton.addEventListener('click', () => {
		history.pushState(null, null, '/sign_up');
		makeSignUpPage(main);
	});
	loginForm.appendChild(signUpButton);

	/* 로그인 버튼 */
	const loginButton = makeElement('button', 'main__login--loginButton', "로그인");
	loginButton.type = "submit";
	loginForm.appendChild(loginButton);
}