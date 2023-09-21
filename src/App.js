import './App.css';
import Gallery from './Gallery';
import Header from './components/Header';
import LogOff from './components/auth/LogOff';
function App(props) {
  return (
    <div className="App">
      <Header />
    <Gallery />
    <LogOff authUser={props.authUser} signOutError={props.signOutError} userSignOut={props.userSignOut}/>
    </div>
  );
}

export default App;
