import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import AddDiscountView from '../components/AddDiscountView.web';
import { withAddDiscount } from './DiscountOperations';

// const removeEmpty = obj => {
//   Object.keys(obj).forEach(key => {
//     if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
//     // recurse
//     else if (obj[key] == null) delete obj[key]; // delete
//   });
// };

const removeEmpty = obj => {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      newObj[key] = removeEmpty(obj[key]); // recurse
    } else if (obj[key] != null) {
      newObj[key] = obj[key]; // copy value
    }
  });

  return newObj;
};

const AddDiscount = props => {
  const { addDiscount, history, match, navigation } = props;

  const handleSubmit = async values => {
    console.log(values);
    let modalId = 0;
    let modalName = '';
    if (match) {
      modalId = Number(match.params.id);
      modalName = match.params.modalName;
    } else if (navigation) {
      modalId = Number(navigation.state.params.id);
      modalName = navigation.state.params.modalName;
    }
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      delete values.id;
      await addDiscount(removeEmpty({ modalId, modalName, ...values }));
      Message.destroy();
      Message.success('Discount added.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <AddDiscountView {...props} onSubmit={handleSubmit} />;
};

AddDiscount.propTypes = {
  addDiscount: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(withAddDiscount, withAddDiscount, translate('discount'))(AddDiscount);
