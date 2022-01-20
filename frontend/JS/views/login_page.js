export let login_html = 
`<div class="login">
<div class="login_header">
    <span class="login_header_title">로그인</span>
</div>
<div class="login_content">
    <span class="login_sub_text">아주 다방 서비스 이용을 위해 로그인해주세요.</span>
    <form action="/login" method="post" class="login_form">
        <label for="username">아이디</label>
        <input type="text" name="username" id="username" autocomplete="username" required placeholder="아이디 입력">
        <label for="current-password">비밀번호</label>
        <input type="password" name="password" id="current-password" autocomplete="current-password" required placeholder="비밀번호 입력">
        <button type="submit" class="login_btn">로그인</button>
    </form>
    <div class="login_content_register">
        <button class="login_content_register_btn">회원가입</button>
    </div>
</div>
</div>
`