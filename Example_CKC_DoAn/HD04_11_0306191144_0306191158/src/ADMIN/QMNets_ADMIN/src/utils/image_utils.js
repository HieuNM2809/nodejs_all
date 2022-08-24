import axios from "axios";

export const toMediaArr = (data) => {
    return data.reduce((pre, next) => ([...pre, {
        public_id: next.response.public_id,
        url: next.response.url
    }]), []);
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