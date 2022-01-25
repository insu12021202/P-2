export default function pushUrl(path, value) {
    let url = location.origin + `/${path}`;
    let state = {data : value};
    history.pushState(state, null, url);
}