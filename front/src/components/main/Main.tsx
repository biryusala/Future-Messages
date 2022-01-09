import './Main.scss';
import {useDispatch} from "react-redux";
import {FC} from "react";
import Header from "./header";
import {Route, Routes} from "react-router-dom";
import Footer from "./footer";

interface MainProps {

}

const Main: FC<MainProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <div className={"mainPage"}>
      <Header/>
      <main className={"mainPage-content"}>
        <Routes>
          <Route path={'/123'} element={<h1>kek</h1>}/>
          <Route path={'/1234'} element={<h1>kekich</h1>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default Main;