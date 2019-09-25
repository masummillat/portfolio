import React, {useEffect} from 'react';
import { Card } from 'antd';

const Article = ({article}) => {

  useEffect(()=>{
  //get request for the article
  },[])
  return(
    <div>
      <Card>
        asdfasdfasdfasdfsa
        {article}
      </Card>

    </div>
  );
};

export default Article;