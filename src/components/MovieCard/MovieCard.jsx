import React, { Fragment } from 'react';
import { Avatar, Card, Rate, Typography } from 'antd';
const { Paragraph } = Typography;
const { Meta } = Card;

const MovieCard = ({ baseUrl, title, overview, poster_path, release_date, vote_average, vote_count }) => {
 return (
  <Card style={{ height: '100%' }}>
    <Meta
      avatar={
        <Avatar
          src={`${baseUrl}/w92${poster_path}`}
          shape="square"
          size={100}
        />
      }
      title={title}
      description={
        <Fragment>
          <Paragraph
            ellipsis={
              {
                rows: 2,
                tooltip: true
              }
            }
          >
          {overview}
        </Paragraph>
        <Rate count={5} value={vote_average/2} disabled />
        {`${vote_count}    reviews`}
        </Fragment>}
     />
  </Card>
 );
};

export default MovieCard;