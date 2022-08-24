import { message as notify } from 'antd'

export function copyToClipboard(message) {
    var textArea = document.createElement("textarea");
    textArea.value = message;
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();


    try {
        var successful = document.execCommand('copy');
        notify.success('Sao chép thành công.')

    } catch (err) {
    }

    document.body.removeChild(textArea);
}