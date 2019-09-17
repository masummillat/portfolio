import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SingleArticle = ({article}) => {
  const {title, description, publicationTime,articleUrl, clap, coverPhoto, owner} = article;
  return(
    <Card
      style={{ width: '60%',
        margin: 'auto',
        borderRadius: '15px',
        overflow: 'hidden',
        marginBottom: '30px',
      }}
      cover={
        <img
          style={{height: '200px'}}
          alt="example"
          src={coverPhoto}
        />
      }
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Link to={owner.profileUrl}><Avatar src={owner.profilePic} /></Link>}
        title={<Link to={articleUrl}><h2 style={{ fontWeight: '600', margin:'0'}}>{title}</h2></Link>}
        description={
          <p
            style={{ fontWeight: '600', width: '500px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
                }}
          >{description}</p>}
      />
      <p style={{padding: '20px 0px 0px', margin:'0'}}>{publicationTime}</p>
    </Card>
  );
};

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired
}
export default SingleArticle