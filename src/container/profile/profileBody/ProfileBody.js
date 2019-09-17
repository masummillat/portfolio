import React from 'react';
import { Tabs } from 'antd';
import Articles from '../../../components/contents/Articles';

const { TabPane } = Tabs;


const ProfileBody = ()=> {
  function callback(key) {
    console.log(key);
  }
  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="profile">
          <Articles/>
        </TabPane>
        <TabPane tab="Clap" key="clap">
          Clap
        </TabPane>
        <TabPane tab="Highlights" key="highlights">
          Highlights
        </TabPane>
        <TabPane tab="Response" key="response">
          Response
        </TabPane>
      </Tabs>
    </div>
  );
}
export default ProfileBody;