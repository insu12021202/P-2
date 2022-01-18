export default function pushUrl(value) {
    let url = location.origin + `/${value}`;
    let state = {data : value};
    history.pushState(state, null, url);
}