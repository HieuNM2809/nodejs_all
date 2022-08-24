import axios from "axios";

export const toMediaArr = (data) => {
    return data.reduce((pre, next) => ([...pre, {
        public_id: next.response.public_id,
        url: next.response.url
    }]), []);
};

export const checkImage = (file, onlyImage = false) => {
    if (!file) return 'Vui lòng chọn file.';

    if (file.size < 1024 * 5)
        return 'File của bạn có kích thước quá nhỏ (nhỏ hơn 5kb).';
    if (file.size > 1240 * 1240 * 15)
        return 'File của bạn có kích thước quá lớn (lớn hơn 15mb).';

    if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        !file.type.includes(onlyImage ? 'image/' : 'video/')
    )
        return 'File của bạn không hợp lệ.';
};

export const download = async (url) => {
    axios({
        url,
        method: "GET",
        responseType: "blob" // important
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `image.png`
        );
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    });
};