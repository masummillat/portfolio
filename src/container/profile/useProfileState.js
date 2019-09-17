import React, { useState } from "react";

export default initialState => {

    const [visible, setShoModal] = useState(initialState);

    return{
        visible,
        handleOk: () => {
            setShoModal(true)
        },
        handleCancel: () => {
            console.log(visible)
            setShoModal(false)
        }

    }
}