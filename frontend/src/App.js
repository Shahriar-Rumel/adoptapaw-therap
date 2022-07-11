import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './App.css';
import './animation.css';
import './buttonanimation.css';
import Nav from './Components/Nav/Nav';
import Adoptionpage from './Pages/Adoptionpage';
import Homepage from './Pages/Homepage';
import Onboarding from './Pages/Onboarding';
import AdoptionAnimalProfile from './Pages/AdoptionAnimalProfile';
import AdoptionRequestPage from './Pages/AdoptionRequestPage';
import AdoptionRequestConfirmationPage from './Pages/AdoptionRequestConfirmationPage';
import RegistrationPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import MissingAnimalPage from './Pages/MissingAnimalPage';
import DonationPage from './Pages/DonationPage';
import MissingAnimalProfilePage from './Pages/MissingAnimalProfilePage';
import MissingAnimalDataPage from './Pages/MissingAnimalDataPage';
import CreateAdoptionPost from './Pages/CreateAdoptionPost';
import UserProfilepage from './Pages/UserProfilePage';
import UserAdoptionPostsPage from './Pages/UserAdoptionPostsPage';
import UserAdoptionRequestsPage from './Pages/UserAdoptionRequestsPage';
import UserAdoptionRequestDetailsPage from './Pages/UserAdoptionRequestDetailsPage';

function App() {
  return (
    <>
      <Router>
        {/* <ScrollToTop> */}
        <Nav />
        <Routes>
          <Route
            path="/missing/cat/information"
            element={<MissingAnimalDataPage />}
            exact
          />
          <Route
            path="/missing/cat"
            element={<MissingAnimalProfilePage />}
            exact
          />
          <Route path="/ongoingdonations" element={<DonationPage />} exact />
          <Route path="/missing" element={<MissingAnimalPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/registration" element={<RegistrationPage />} exact />
          <Route
            path="/adoption/request/success"
            element={<AdoptionRequestConfirmationPage />}
            exact
          />
          <Route
            path="/adoption/:id/createpost"
            element={<CreateAdoptionPost />}
            exact
          />
          <Route
            path="/adoption/:id/request"
            element={<AdoptionRequestPage />}
            exact
          />
          <Route
            path="/adoption/:id"
            element={<AdoptionAnimalProfile />}
            exact
          />
          <Route
            path="/user/profile/:id/adoptionrequests/details"
            element={<UserAdoptionRequestDetailsPage />}
            exact
          />
          <Route
            path="/user/profile/:id/adoptionrequests"
            element={<UserAdoptionRequestsPage />}
            exact
          />
          <Route
            path="/user/profile/:id/adoptionposts"
            element={<UserAdoptionPostsPage />}
            exact
          />
          <Route path="/user/profile/:id" element={<UserProfilepage />} exact />
          <Route path="/adoption" element={<Adoptionpage />} exact />
          <Route path="/home" element={<Homepage />} exact />
          <Route path="/" element={<Onboarding />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <Footer /> */}
        {/* </ScrollToTop> */}
      </Router>
    </>
  );
}

export default App;
