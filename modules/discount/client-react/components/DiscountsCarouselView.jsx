import React from 'react';
import PropTypes from 'prop-types';

import ListingCarousel from '@gqlapp/listing-client-react/components/ListingCarousel';

const DiscountsCarouselView = props => {
  const { title, ids = [], currentUser, currentUserLoading, history, cartLoading, onDelete, getCart, style } = props;

  return (
    <ListingCarousel
      ids={ids}
      currentUser={currentUser}
      currentUserLoading={currentUserLoading}
      history={history}
      cartLoading={cartLoading}
      onDelete={onDelete}
      getCart={getCart}
      filter={{ isActive: true }}
      title={title}
      style={style}
    />
  );
};

DiscountsCarouselView.propTypes = {
  ids: PropTypes.array,
  title: PropTypes.string,
  currentUser: PropTypes.object,
  currentUserLoading: PropTypes.bool,
  history: PropTypes.object,
  cartLoading: PropTypes.bool,
  onDelete: PropTypes.func,
  getCart: PropTypes.object,
  style: PropTypes.object
};

export default DiscountsCarouselView;
