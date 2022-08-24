import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Pagination } from 'antd';
import React, { forwardRef, useEffect, useMemo } from 'react';
import { copyToClipboard } from '../../utils/word_utils';
import customLoading from './customLoading';
import { DataTableWrapper } from './DataTable.style';



const DataTable = forwardRef((props, ref) => {
    const { colDef, data, loading, disabledLoading = false, onPageChange } = props;

    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            unSortIcon: true,
            sortable: true,

        }),
        []
    );

    useEffect(() => {
        if (ref.current?.api) {
            if (loading) {
                return ref.current.api.showLoadingOverlay();
            } else {
                return ref.current.api.hideOverlay();
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const loadingCellRenderer = useMemo(() => {
        return customLoading;
    }, []);


    const paginationElement = <Pagination className='pagination' onChange={(page) => {
        onPageChange(page)
    }} showSizeChanger={false} pageSize={data?.pagination?.limit || 20} current={data?.pagination?.page || 1} total={data?.total} />



    return (

        <DataTableWrapper>
            <div className={`ag-theme-alpine ${props.className}`} style={{ height: props.heights || '70vh', width: '100%', ...props.style }}>
                <AgGridReact
                    ref={ref}
                    rowStyle={{
                        background: 'white',
                        fontSize: '14px',
                    }}
                    loadingOverlayComponent={loadingCellRenderer}
                    defaultColDef={defaultColDef}
                    columnDefs={colDef}
                    rowData={data?.rows}
                    onCellDoubleClicked={(v) => {
                        copyToClipboard(v?.value)

                    }}
                    getRowStyle={(params) => {
                        if (params?.data?.deleted) {

                            return { background: 'rgba(255, 255, 159,.6)' }
                        } else {

                            return { background: 'white' }
                        }
                    }}
                    suppressLoadingOverlay={disabledLoading}
                    animateRows={true}
                    pagination={false}
                    suppressRowVirtualisation={true}
                ></AgGridReact>
                {paginationElement}
            </div>

        </DataTableWrapper>
    );
});

export default DataTable;