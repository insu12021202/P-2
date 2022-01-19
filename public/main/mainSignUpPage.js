import { makeElement } from '../makeHTMLElement.js';
import { deleteNodes } from '../deleteNodes.js';

export function makeSignUpPage(main) {
	deleteNodes('.main');
	/* 아이디 입력 */
	const idInput = makeElement('input', 'main__signUp--idInput', null);
	idInput.placeholder = "아이디를 입력해주세요.";
	main.appendChild(idInput);

	/* 비밀번호 입력 */
	const passwordInput = makeElement('input', 'main__signUp--passwordInput', null);
	passwordInput.type = 'password';
	passwordInput.placeholder = "비밀번호를 입력해주세요.";
	main.appendChild(passwordInput);

	/* 지역 입력 */
	const locationInput = makeElement('input', 'main__signUp--locationInput', null);
	locationInput.placeholder = "지역을 입력해주세요.";
	main.appendChild(locationInput);

	/* 취소 버튼 */
	const cancelButton = makeElement('div', 'main__signUp--cancelButton', "취소"); 
	main.appendChild(cancelButton);

	/* 회원가입 버튼 */
	const signUpButton = makeElement('div', 'main--signUp--signUpButton', "회원가입");
	main.appendChild(signUpButton);
}