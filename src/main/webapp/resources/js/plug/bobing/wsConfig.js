/**
 * 取得im服务根地址
 * @returns {string}
 */
function wsUri(){
    return "ws://" + location.host + "/msgWebSocket";
}

function httpRoot(){
    return "http://" + location.host;
}

