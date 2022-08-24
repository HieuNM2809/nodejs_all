import styled from "styled-components";

export const DataTableWrapper = styled.div`
.pagination{
    text-align: center;
    margin: 1rem 0;
    margin-bottom: 2rem;
}
.ag-sort-none-icon{
    visibility: hidden !important;
}


.ag-theme-alpine .ag-header-cell, .ag-theme-alpine .ag-header-group-cell {
    padding-left: 3px;
    padding-right: 3px !important;
}

.ag-root-wrapper{
    border-radius:5px;
}
.ag-theme-alpine .ag-paging-panel {
    border-top: 1px solid;
    border-top-color: #babfc7;
    border-top-color: var(--ag-border-color, #babfc7);
    color: #181d1f;
    color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}

.cell-horizontal-border{
    border: thin solid rgba(0,0,0,0.1);
}

.ag-theme-alpine .ag-cell, .ag-theme-alpine .ag-full-width-row .ag-cell-wrapper.ag-row-group {
    border: 1px solid transparent;
    line-height: min(var(--ag-line-height, 20px), 20px);
    padding-left: 5px;
    padding-right: 5px;
    -webkit-font-smoothing: subpixel-antialiased;
}

// margin-top: 8px;

    .ag-has-focus{

        .ag-cell-focus:not(.ag-cell-range-selected){
            border-right: thin solid #2196f3 !important;
        } 
    }

    .ag-header-cell{
        background: #F1F3F6;
        border-right: thin solid rgba(0,0,0,0.1);
        font-size: 14px !important;
        font-weight: normal !important;
    }

    .ag-cell{
        border-right: thin solid rgba(0,0,0,0.1) !important;
    }

    .ag-icon{
        font-family: "agGridAlpine" !important;
        font-size: 14px !important;
        font-weight: bold !important;
        
    }
    
    .ag-header-icon{
        img{
            width:18px;
            height:18px;
            font-weight: normal !important;
        }
    }
   
    .ag-pinned-right-header{
        background: #F1F3F6;
        .ag-header-row::after{
            width:0!important;
        }

        .ag-header-row{
            .ag-header-cell{
                border-right: none !important;
            }
        }

       
    }

    .ant-image{
        display: block;
        img{
            margin: 0 auto;
        }
    }

    .ag-unselectable >span >span{
        font-size: 14px;
        font-weight: normal !important;
    }

    
    .ag-theme-alpine .ag-paging-number{
        font-weight: normal !important;
    }

   
   

`;