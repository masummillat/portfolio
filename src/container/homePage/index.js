import React, { useEffect } from 'react';
import Articles from '../../components/contents/Articles';
const HomePage = () => {


    return (
      <div style={{backgroundColor:'white', width:'66%', margin:'auto'}}>
        <div style={{width:'1000px', margin:'auto'}}>
          <Articles/>
        </div>
      </div>

    )
}

export default HomePage