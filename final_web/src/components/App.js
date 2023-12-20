import NavigationBar from './NavigationBar';
import Votes from './Votes';
import VotesDetails from './VotesDetails';
import Candidates from './Candidates';
import CandidatesDetails from './CandidatesDetails';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './Login';
import LogoBar from './LogoBar';
import Register from './Register';
import CreateCandidate from './CreateCandidate';
import CreateVote from './CreateVote';


function App() {
  
  return (
    <div className="App">

      <div className="content">
        <BrowserRouter>
          <Switch>
          
            <Route exact path="/">
              <Redirect to="/votes" />
            </Route>

            <Route exact path="/login">
              <LogoBar />
              <Login />
            </Route>

            <Route exact path="/register">
              <LogoBar />
              <Register />
            </Route>

            <Route exact path="/votes">
              <NavigationBar />
              <Votes />
            </Route>

            <Route exact path="/votes/:vote_id">
              <NavigationBar />
              <VotesDetails />
            </Route>

            <Route exact path="/create_votes">
              <NavigationBar />
              <CreateVote />
            </Route>

            <Route exact path="/candidates">
              <NavigationBar />
              <Candidates />
            </Route>

            <Route exact path="/candidates/:candidate_id">
              <NavigationBar />
              <CandidatesDetails />
            </Route>

            <Route exact path="/create_candidates">
              <NavigationBar />
              <CreateCandidate />
            </Route>
          
          </Switch>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
