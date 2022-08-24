import { Tag } from "antd"
export const status = ['Chưa kích hoạt', 'Đã Kích hoạt', 'Đã khóa'];

export const statusElement = (value) => {
    if (value === 'I')
        return <Tag>{status[0]}</Tag>
    if (value === 'A')
        return <Tag color="#87d068">{status[1]}</Tag>
    if (value === 'B')
        return <Tag color="#f50">{status[2]}</Tag>
    if (value)
        return <Tag color="#f50">{status[2]}</Tag>


}

