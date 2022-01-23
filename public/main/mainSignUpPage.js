import { makeElement } from '../makeHTMLElement.js';
import { deleteNodes } from '../deleteNodes.js';
import { makeLoginPage } from './mainLoginPage.js';

export function makeSignUpPage(main) {
	deleteNodes('.main');
	const signUpForm = makeElement('form', 'main__signUp--form', null);
	signUpForm.action = "sign_up";
	signUpForm.method = "post";
	main.appendChild(signUpForm);

	/* 아이디 입력 */
	const idInput = makeElement('input', 'main__signUp--idInput', null);
	idInput.placeholder = "아이디를 입력해주세요.";
	idInput.name = "uname";
	signUpForm.appendChild(idInput);

	/* 비밀번호 입력 */
	const passwordInput = makeElement('input', 'main__signUp--passwordInput', null);
	passwordInput.type = 'password';
	passwordInput.placeholder = "비밀번호를 입력해주세요.";
	passwordInput.name = "pw";
	signUpForm.appendChild(passwordInput);

	/* 지역 입력 */
	const locationInput = makeElement('input', 'main__signUp--locationInput', null);
	locationInput.placeholder = "지역을 입력해주세요.";
	locationInput.name = "location";
	signUpForm.appendChild(locationInput);

	/* 취소 버튼 */
	const cancelButton = makeElement('div', 'main__signUp--cancelButton', "취소"); 
	signUpForm.appendChild(cancelButton);

	/* 회원가입 버튼 */
	const signUpButton = makeElement('button', 'main--signUp--signUpButton', "회원가입");
	signUpButton.type = "submit";
	signUpForm.appendChild(signUpButton);
}