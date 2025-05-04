// Connect.jsx
import Navibar2 from "../component/Navibar2";
import Footer from "../component/Footer";
import Style from "./Connect.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Connect() {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setusers] = useState([]); // Add this line
  const [followedUsers, setFollowedUsers] = useState([]); // Add this line
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // Add this line
  const [currentusers, setCurrentusers] = useState(null); // Add this line
  const [userActivities, setUserActivities] = useState([]); // Add this line

  const openModal = async (user) => {
    setCurrentusers(user);
    try {
      const response = await axios.get(`/activities/${user._id}`);
      setUserActivities(response.data.activities);
    } catch (error) {
      console.error(error);
    }
    setModalIsOpen(true);
  };

  const handleSearch = () => {
    // Filter users based on searchTerm
    const filteredusers = users.filter((users) =>
      users.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update users state with filtered users
    setusers(filteredusers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users"); // Replace with your server's route
        setusers(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFollowedUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const response = await axios.get("/followedUsers", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });
        setFollowedUsers(response.data.followedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchFollowedUsers();
  }, []);

  // Add these lines in your Connect.jsx file
  const handleFollow = async (userIdToFollow) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        "/follow",
        {
          followedUserId: userIdToFollow,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      console.log("Successfully Followed:", response.data);
      setFollowedUsers([...followedUsers, userIdToFollow]); // Add this line
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (userIdToUnfollow) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        "/unfollow",
        {
          unfollowedUserId: userIdToUnfollow,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      console.log("Successfully Unfollowed:", response.data);
      setFollowedUsers(followedUsers.filter((id) => id !== userIdToUnfollow)); // Add this line
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllActivities = async (userId) => {
    try {
      const response = await axios.delete(`/activities/${userId}`);
      console.log("Successfully deleted all activities:", response.data);
      setUserActivities([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navibar2 />
      <div className={Style.Connect_page}>
        <div className={Style.Connect_page_div}>
          <h1 className={Style.maintitle_text}>Find Friends and Connect</h1>

          <div className={Style.search_bar}>
            <div className={Style.search_section}>
              <input
                className={Style.search_box}
                type="search"
                placeholder="Find Friends"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={Style.search_button} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className={Style.connect_section}>
            <div className={Style.connect_section_style}>
              <h3 className={Style.topic_text}>Find Players and Connect</h3>

              <div className={Style.users_section_wrap}>
                {users.map((users) => (
                  <div className={Style.users_box} key={users._id}>
                    <div className={Style.users_box_bar}>
                      <p className={Style.users_name}>{users.name}</p>
                      <button
                        className={Style.seeact_button}
                        onClick={() => openModal(users)}
                      >
                        See Activity
                      </button>
                      {followedUsers.includes(users._id) ? (
                        <button
                          className={Style.unfollow_button}
                          onClick={() => handleUnfollow(users._id)}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          className={Style.follow_button}
                          onClick={() => handleFollow(users._id)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {modalIsOpen && (
                <div className={Style.a_modal}>
                  <div className={Style.a_modal_content}>
                    <button1
                      className={Style.a_modal_button}
                      onClick={() => setModalIsOpen(false)}
                    >
                      X
                    </button1>
                    {currentusers && (
                      <div>
                        <div className={Style.a_modal_stylediv}>
                          <div className={Style.a_modal_title}>
                            <h2>{currentusers.name}'s Activities</h2>
                          </div>
                          {userActivities.map((activity, index) => (
                            <div className={Style.a_modal_para} key={index}>
                              <p>{activity}</p>
                            </div>
                          ))}
                          {/* 
<button
    onClick={() =>
        handleDeleteAllActivities(currentusers._id)
    }
>
    Delete All Activities
</button> 
*/}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Connect;
