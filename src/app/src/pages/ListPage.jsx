import PageContainer from '../components/PageContainer';
import ChickenCountList from '../components/ChickenCountList';

const ListPage = () => (
  <PageContainer 
    name={"Latest records"}
    containerSX={{
      height: '75vh',
      mb: 6 // Fixes the issue with the data grid when it is too tall. Value is related with the footer height.
    }}  
  >
    <ChickenCountList/>
  </PageContainer>
);

export default ListPage;