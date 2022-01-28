
function setInnerHTML()  {
    const element = document.getElementById('posts-container');
    element.innerHTML = '<form action="/board/write" method="post"><table class = "table-container" border="1"><tr><td>작성자</td><td><input type="text" name="name" id="name" required/></td></tr><tr><td>제목</td><td><input type="text" name="title" id="title" required/></td></tr><tr><td>내용</td><td><textarea name="content" id="content" cols="30" rows="10" required></textarea></td></tr><tr><td colspan="2"><button type="submit">글쓰기</button></td></tr></table></form>';
    console.log(element)
  }

function setInnerHTML01() {

}