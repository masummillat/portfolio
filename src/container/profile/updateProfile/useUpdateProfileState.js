import React, { useState } from "react";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default initialState => {

  const [profileState, setProfileState] = useState(initialState);

  return{
    profileState,
    handleOk: () => {
      setProfileState({
        ...profileState,
        visible: true
      })
    },
    handleCancel: () => {
      setProfileState({
        ...profileState,
        visible: false
      })
    },
    handleChange :info => {
      if (info.file.status === 'uploading') {
        setProfileState({
          ...profileState,
          loading: true
        })
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          setProfileState({
            ...profileState,
            imageUrl,
            loading: false,
          }),
        );
      }
    },

  }
}

