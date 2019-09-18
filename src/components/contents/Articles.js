import React from 'react';
import SingleArticle from './SingleArticle';

const Articles = () => {
  const articles = [
    {
      title:'Fighting depression and anxiety',
      description:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      publicationTime:'Jun 3 · 5 min read',
      articleUrl:'/fighting-depration-and-anxiety',
      clap:55,
      coverPhoto:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      owner:{
        profileUrl:'/@masummillat',
        profilePic:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    },
    {
      title:'Fighting depression and anxiety',
      description:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      publicationTime:'Jun 3 · 5 min read',
      articleUrl:'/fighting-depration-and-anxiety',
      clap:55,
      coverPhoto:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      owner:{
        profileUrl:'/@masummillat',
        profilePic:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    },
    {
      title:'Fighting depression and anxiety',
      description:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      publicationTime:'Jun 3 · 5 min read',
      articleUrl:'/fighting-depration-and-anxiety',
      clap:55,
      coverPhoto:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      owner:{
        profileUrl:'/@masummillat',
        profilePic:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    },
    {
      title:'Fighting depression and anxiety',
      description:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      publicationTime:'Jun 3 · 5 min read',
      articleUrl:'/fighting-depration-and-anxiety',
      clap:55,
      coverPhoto:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      owner:{
        profileUrl:'/@masummillat',
        profilePic:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    },
    {
      title:'Fighting depression and anxiety',
      description:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      publicationTime:'Jun 3 · 5 min read',
      articleUrl:'/fighting-depration-and-anxiety',
      clap:55,
      coverPhoto:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      owner:{
        profileUrl:'/@masummillat',
        profilePic:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    },

  ]

  return(
    <div className="articles-wrapper">
      {
        articles.map((article,i)=><SingleArticle key={i} article={article}/>)
      }

    </div>
  );
};

export default Articles