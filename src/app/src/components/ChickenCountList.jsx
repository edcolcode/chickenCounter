import {useGetChickenCountsQuery} from '../store/slices/api/chickenCounterSliceApi';
import { PAGE_SIZE } from '../utils/constants';
import { 
  pageQueryParam, 
  pageSizeQueryParam,
  sortQueryParam,
  sortDescExtra,
  chickenCounts
} from '../utils/repo';
import { useDeleteChickenCountMutation } from '../store/slices/api/chickenCounterSliceApi';

import { useState } from 'react';
import {
  Box, Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
// import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { addAlert } from '../store/slices/alertsSlice';
import { recordDeletedError, recordDeletedSuccessfully } from '../utils/alerts';

const StyledBox = styled(Box)`
  min-height: 120px;
`;

const ChickenCountList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [deleteChickenCount] = useDeleteChickenCountMutation();
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
      sortable: false, 
      flex: 1 
    },
    {
      field: 'amount',
      headerName: 'Amount',
      editable: false,
      sortable: false, 
      flex: .5,
    },
    {
      field: 'delete',
      headerName: '',
      editable: false,
      sortable: false,
      renderCell: ({formattedValue}) => (
        <Button
          variant='contained'
          color='error'
          onClick={formattedValue.deleteCB}
        >
          Delete
        </Button>
      )
    },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let records = [];
  let numberOfRecords = 0;
  
  if (data && !isError) {
    records = data[chickenCounts].map(record => {
      const href = record["_links"]["self"]["href"];
      const id = href.substring(href.lastIndexOf('/') + 1, href.length);
      
      return {
        id,
        timestamp: DateTime.fromISO(record.timestamp).toLocaleString(DateTime.DATETIME_SHORT),
        amount: record.amount,
        delete: {
          deleteCB: () => deleteChickenCount({chickenCountId: id})
            .then((response) => {
              if (response.error) {
                return dispatch(addAlert(recordDeletedError));
              }

              return dispatch(addAlert(recordDeletedSuccessfully));
            })
          }
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