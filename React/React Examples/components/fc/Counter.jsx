import React, { useEffect, useState } from "react";

const Counter = ({ message }) => {   // ⬅ receive message prop
  const [departmentName, setDepartmentName] = useState("Finance");
  const [videoLikes, setVideoLikes] = useState(95);
  const [videoCompliment, setVideoCompliment] = useState("");

  useEffect(() => {
    console.log("Component rendered");
  }, []);

  useEffect(() => {
    console.log("Video Likes Updated");
  }, [videoLikes]);

  return (
    <React.Fragment>
      <h3>Department Name: {departmentName}</h3>
      <p>Likes: {videoLikes}</p>

      <button
        onClick={() => setVideoLikes(videoLikes + 1)}
        className="btn btn-sm btn-primary"
      >
        Like
      </button>

      <button
        onClick={() => setVideoLikes(videoLikes > 0 ? videoLikes - 1 : 0)}
        className="btn btn-sm btn-danger"
      >
        Dislike
      </button>

      {videoLikes < 100 ? (
        <p>People are liking this video</p>
      ) : (
        <p>People are loving this video ❤️</p>
      )}

      <form>
        <label htmlFor="video-compliment">Video Compliment</label>
        <input
          type="text"
          name="video-compliment"
          value={videoCompliment}
          onChange={(e) => setVideoCompliment(e.target.value)}
        />
      </form>

      {/* pass down the prop directly */}
      <ChildComponent message={message} />
    </React.Fragment>
  );
};

const ChildComponent = ({ message }) => {
  return (
    <React.Fragment>
      <h3>Hi from child component</h3>
      <p>{message}</p>
    </React.Fragment>
  );
};

export default Counter;
