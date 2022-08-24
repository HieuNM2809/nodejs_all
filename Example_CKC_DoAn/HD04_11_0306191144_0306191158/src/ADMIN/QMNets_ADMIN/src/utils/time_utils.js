export const timeAgo = (dateString, simple = true) => {
    const date = new Date(dateString);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const seconds = Math.round((today - date) / 1000);
    const suffix = simple ? '' : 'trước';

    if (seconds < 20) {
        return 'Vừa mới đây';
    } else if (seconds < 60) {
        return `Khoảng 1 phút ${suffix}`;
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút ${suffix}`;
    }
    const hours = Math.round(minutes / 60);
    if (hours < 24) {
        return `${hours} giờ ${suffix}`;
    }

    const yesterday = new Date(today - DAY_IN_MS);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    if (isYesterday) {
        return 'Hôm qua';
    }

    const daysDiff = Math.round((today - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 30) {
        return `${daysDiff} ngày ${suffix}`;
    }

    const monthsDiff =
        today.getMonth() -
        date.getMonth() +
        12 * (today.getFullYear() - date.getFullYear());
    if (monthsDiff < 12) {
        return `${monthsDiff} tháng ${suffix}`;
    }

    const yearsDiff = today.getYear() - date.getYear();

    return `${yearsDiff} năm ${suffix}`;
};

export const dateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const seconds = Math.round((today - date) / 1000);
    const hoursAgo = Math.round(seconds / 60 / 60);
    const day = [
        'Chủ Nhật',
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hoursAgo < 24) {
        return `${formatTime(hours)}:${formatTime(minutes)}`;
    }

    const daysDiff = Math.round((today - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
        return `${day[date.getUTCDay()]} ${formatTime(hours)}:${formatTime(
            minutes
        )}`;
    }
    const fullTime =
        [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
        ' ' +
        [formatTime(hours), formatTime(minutes)].join(':');
    return fullTime;
};

export const formatTime = (time) => {
    const timeformat = time < 10 ? `0${time}` : time;
    return timeformat;
};
