import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.scss';
import CustomSpinner from "./components/UI/customSpinner";
import useReduxStatePropertie from "./hooks/useReduxStatePropertie";
import Main from "./components/main";

export const App = () => {
  const isAuthorized = useReduxStatePropertie('isAuthorized');
  const isLoaderNecessary = useReduxStatePropertie('isLoaderNecessary');

  return (
    <BrowserRouter>
      {
        isLoaderNecessary ?
          <CustomSpinner color={'primary'}/>
          :
          <Main/>
      }
    </BrowserRouter>
  )
};
