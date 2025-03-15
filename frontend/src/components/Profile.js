import React, { useEffect, useState } from "react";
import { getUserProfile } from "./api"; // Import API function
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const profileData = await getUserProfile(token);
      if (profileData) {
        setUser(profileData);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src={user.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        className="profile-pic"
      />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default Profile;
