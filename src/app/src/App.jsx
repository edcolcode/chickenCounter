import './App.css';
import themes from './themes';
import navigation from './utils/navigation'
import store from './store/store';

import Header from './components/Header';
import Alerts from './components/Alerts';
import Footer from './components/Footer';

import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import AddChickenCountPage from './pages/AddChickenCountPage';
import ProtectedPage from './pages/ProtectedPage';
import NotFoundPage from './pages/NotFoundPage';

import {ThemeProvider} from '@mui/material/styles';
import {Box, CssBaseline} from '@mui/material';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {LocalizationProvider} from '@mui/x-date-pickers';


function App() {
  return (
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={themes.light}>
					<CssBaseline/>
					<LocalizationProvider dateAdapter={AdapterLuxon}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								minHeight: '100vh'
							}}
						>
							{/* Header */}
							<Header/>
							{/* Content */}
							<Box
								component="main"
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexGrow: '1'
								}}
							>
								<Routes>
									<Route 
										path={navigation.root} 
										element={
											<ProtectedPage>
												<ListPage/>
											</ProtectedPage>
											}
									/>
									<Route path={navigation.login} element={<LoginPage/>}/>
									<Route 
										path={navigation.addChickenCount} 
										element={
											<ProtectedPage>
												<AddChickenCountPage/>
											</ProtectedPage>
										}
									/>
									<Route
										path="*"
										element={
											<NotFoundPage/>
										}
									/>
								</Routes>
							</Box>
							{/* Footer */}
							<Footer />
						</Box>
					</LocalizationProvider>
				</ThemeProvider>
			</BrowserRouter>
			<Alerts/>
		</Provider>
  );
}

export default App;
