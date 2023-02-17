import useChickenCountList from '../utils/hooks/useChickenCounttList';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ChickenCountList = () => {
  const {
    PAGE_SIZE,
    gridColumns,
    isError,
    isLoading,
    isDeleteLoading,
    currentPage,
    records,
    numberOfRecords,
    handlePageChange
  } = useChickenCountList();

  return (
    <Box 
      sx={{
        height: 1,
        minHeight: '120px'
      }}>
      <DataGrid
        pagination
        rows={records}
        columns={gridColumns}
        loading={isLoading || isDeleteLoading}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[PAGE_SIZE]}
        pageSize={PAGE_SIZE}
        error={isError ? isError : null}
        page={currentPage}
        paginationMode="server"
        rowCount={numberOfRecords}
      />
    </Box>
  );
};

export default ChickenCountList;