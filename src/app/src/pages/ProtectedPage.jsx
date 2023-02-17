import useProtectedPage from "../utils/hooks/useProtectedPage";

const ProtectedPage = ({children}) => {
  useProtectedPage();

  return (
    children
  );
};

export default ProtectedPage;