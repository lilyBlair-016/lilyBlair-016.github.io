import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/profile.css';

export default function ProfilePage() {
  const { isLoggedIn, userData } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in">
        <h2>You are not logged in</h2>
        <p>
          Please <Link to="/login">login</Link> to view your profile.
        </p>
      </div>
    );
  }

  const fullName = userData
    ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
    : 'Guest User';

  const maskedPassword = userData?.password
    ? '•'.repeat(Math.min(userData.password.length, 12))
    : '—';

  return (
    <div className="profile-page-center">
      <div className="profile-container">
        <div className="profile-overview">
          <div className="profile-picture-container">
            <img
              src="/images/Owner_Pic.jpg"
              alt={fullName}
              className="profile-picture"
            />
          </div>
          <div className="profile-name-email">
            <h2 className="profile-name">{fullName}</h2>
          </div>
          <button type="button" className="edit-button" aria-label="Edit profile">
            Edit Profile
          </button>
        </div>

        <div className="personal-info-section">
          <div className="info-column">
            <div className="info-field">
              <p className="info-label">First Name</p>
              <p className="info-value">{userData?.firstName || '—'}</p>
            </div>
            <div className="info-field">
              <p className="info-label">Email</p>
              <p className="info-value">{userData?.email || '—'}</p>
            </div>
            <div className="info-field">
              <p className="info-label">Mobile Number</p>
              <p className="info-value">{userData?.mobile || '—'}</p>
            </div>
          </div>
          <div className="info-column">
            <div className="info-field">
              <p className="info-label">Last Name</p>
              <p className="info-value">{userData?.lastName || '—'}</p>
            </div>
            <div className="info-field">
              <p className="info-label">Password</p>
              <p className="info-value">{maskedPassword}</p>
            </div>
            <div className="info-field">
              <p className="info-label">Home Address</p>
              <p className="info-value">{userData?.address || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
