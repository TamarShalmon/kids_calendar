import './App.css';
import Week from './Week';
import days from '../days';
import Events from './Events';
import events from '../events';

function App() {

  return (
    <div className="container">
      <h2>Hello user, L'ets plan your week!</h2>
      <Week days={days} />
      <div>
        <h3>Events board</h3>
      <Events events={events} />
      </div>
    </div>
  );
}

export default App;
