import {useGetChickenCountsQuery} from '../store/slices/api/chickenCounterSliceApi';
import { PAGE_SIZE } from '../utils/constants';

import { useState } from 'react';
import {
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
// import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { 
  pageQueryParam, 
  pageSizeQueryParam,
  sortQueryParam,
  sortDescExtra,
  chickenCounts
} from '../utils/repo';

const StyledBox = styled(Box)`
  min-height: 120px;
`;

const ChickenCountList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {data, isLoading, isError} = useGetChickenCountsQuery({
    [pageQueryParam]: currentPage,
    [pageSizeQueryParam]: PAGE_SIZE,
    [sortQueryParam]: `timestamp${sortDescExtra}`
  });

  const gridColumns = [
    {
      field: 'timestamp',
      headerName: 'Date',
      editable: false,
      flex: 1 
    },
    {
      field: 'amount',
      headerName: 'Amount',
      editable: false,
      flex: .5
    },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let records = [];
  let numberOfRecords = 0;
  
  if (data && !isError) {
    records = data[chickenCounts].map(record => {
      return {
        id: record["_links"]["self"]["href"],
        timestamp: DateTime.fromISO(record.timestamp).toLocaleString(DateTime.DATETIME_SHORT),
        amount: record.amount,
      }
    });
    
    numberOfRecords = data.page.totalElements;
  }

  return (
    <StyledBox sx={{height: 1}}>
      <DataGrid
        pagination
        rows={records}
        columns={gridColumns}
        loading={isLoading}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[PAGE_SIZE]}
        pageSize={PAGE_SIZE}
        error={isError ? isError : null}
        page={currentPage}
        paginationMode="server"
        rowCount={numberOfRecords}
      />
    </StyledBox>
  );
};

export default ChickenCountList;