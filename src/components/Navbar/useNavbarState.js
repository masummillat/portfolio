import React, { useState } from 'react';

export default initialState => {

    const [navbarState, setNavbarState] = useState(initialState);

    return{
        navbarState,
        onClose: () =>{
            setNavbarState({
                ...navbarState,
                visible: false
            });
        },
        showDrawer : () => {
            setNavbarState({
                ...navbarState,
                visible: true
            });
        }
    }
}