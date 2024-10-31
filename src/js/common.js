export const _isUser = () => {
    return sessionStorage.getItem('user_id');
}


export const _comma = (v) => {
    return v.toLocaleString('ko-KR')
}

export const _dateFormatYmd = (v) => {
    const date = new Date(v);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
}

export const _dateFormatYmdDot = (v) => {
    const date = new Date(v);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}.${month}.${day}`;
    return dateStr;
}

export const _base64toFile = (base_data, filename) => {

    var arr = base_data.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
