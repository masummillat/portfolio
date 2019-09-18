import React from 'react';
import './newstory.css';
import MyEditor from "./Editor";

const NewStory = ()=> {

  return(
    <div className="new-story-wrapper">
      <MyEditor/>
    </div>
  );
};

export default NewStory;