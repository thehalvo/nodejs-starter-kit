import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCategories } from './CategoryOpertations';
import CategoriesView from '../components/CategoriesView.web';

const Categories = props => {
  // console.log('props', props);
  return <CategoriesView {...props} />;
};

export default compose(withCategories, translate('category'))(Categories);
