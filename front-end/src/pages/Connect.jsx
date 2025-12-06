// Connect.jsx
import Navibar2 from "../components/layout/Navibar2";
import Footer from "../components/layout/Footer";
import Style from "./Connect.module.css";
import api from "../services/api";
import { useState, useEffect } from "react";

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
      const { data } = await api.get(`/activities/${user._id}`);
      setUserActivities(data.activities);
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
        const { data } = await api.get("/users"); // Replace with your server's route
        setusers(data);
        console.log("Users fetched:", data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFollowedUsers = async () => {
      try {
        const { data } = await api.get("/followedUsers");
        setFollowedUsers(data.followedUsers);
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
      const { data } = await api.post("/follow", {
        followedUserId: userIdToFollow,
      });
      console.log("Successfully Followed:", data);
      setFollowedUsers([...followedUsers, userIdToFollow]); // Add this line
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (userIdToUnfollow) => {
    try {
      const { data } = await api.post("/unfollow", {
        unfollowedUserId: userIdToUnfollow,
      });
      console.log("Successfully Unfollowed:", data);
      setFollowedUsers(followedUsers.filter((id) => id !== userIdToUnfollow)); // Add this line
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllActivities = async (userId) => {
    try {
      const { data } = await api.delete(`/activities/${userId}`);
      console.log("Successfully deleted all activities:", data);
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
                            <h2>{currentusers.name}&apos;s Activities</h2>
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
