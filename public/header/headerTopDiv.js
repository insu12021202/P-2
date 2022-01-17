import {makeElement} from '../makeHTMLElement.js';

/* Header 내부 요소 생성 함수 */
export function makeHeaderDiv(header) {
	/* Header 중앙 로고 */
	const headerLogo = makeElement('div', 'header--logo', "아주대 직방");
	header.appendChild(headerLogo);

	/* Header 좌측 메뉴 버튼 */
	const headerMenuButton = makeElement('div', 'header--menu', null);
	header.appendChild(headerMenuButton);

	/* Header 우측 로그인 버튼 */
	const headerLoginButton = makeElement('div', 'header--login', "Log In");
	header.appendChild(headerLoginButton);
}