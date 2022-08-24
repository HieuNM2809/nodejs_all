import { Pagination, Table } from 'antd';
import React from 'react';

const DataTable = ({ column, locale, data, onPageChange, filter }) => {
    const limit = filter?.limit || 5;
    const total = data?.data?.count || 0;

    return (
        <>
            <Table
                loading={data?.loading}
                pagination={false}
                locale={locale}
                columns={column}
                dataSource={data?.data?.rows}
                rowKey="id"
            />
            <Pagination
                onChange={onPageChange}
                current={filter?.page}
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                total={total}
                pageSize={limit}
            />
        </>
    );
};

DataTable.propTypes = {};

export default DataTable;
