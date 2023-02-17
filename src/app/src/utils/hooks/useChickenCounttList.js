import { 
  pageQueryParam, 
  pageSizeQueryParam,
  sortQueryParam,
  sortDescExtra,
  chickenCounts
} from '../repo';
import { PAGE_SIZE } from '../constants';
import { addAlert } from '../../store/slices/alertsSlice';
import { 
  useDeleteChickenCountMutation, 
  useGetChickenCountsQuery 
} from "../../store/slices/api/chickenCounterSliceApi";
import { recordDeletedError, recordDeletedSuccessfully } from '../alerts';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from 'luxon';
import { Button } from '@mui/material';


export default function useChickenCountList() {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const {data, isLoading, isError} = useGetChickenCountsQuery({
    [pageQueryParam]: currentPage,
    [pageSizeQueryParam]: PAGE_SIZE,
    [sortQueryParam]: `timestamp${sortDescExtra}`
  });
  const [deleteChickenCount, {isLoading: isDeleteLoading}] = useDeleteChickenCountMutation();

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

  return {
    PAGE_SIZE,
    gridColumns,

    currentPage,
    records,
    numberOfRecords,

    isError,
    isLoading,
    isDeleteLoading,

    handlePageChange
  };
};