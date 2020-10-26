import React from 'react';
import { Steps } from 'antd';
import { PropTypes } from 'prop-types';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import ListingFormComponent from './ListingFormComponent.web';

const { Step } = Steps;

const EditListingView = props => {
  const { t, listing, loading, onSubmit, currentUser } = props;
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: t('listing.steps.title1')
    },
    {
      title: t('listing.steps.title2')
    },
    {
      title: t('listing.steps.title3')
    }
  ];

  return (
    <PageLayout type="forms">
      <MetaTags title={t('listing.title')} description={`${settings.app.name} - ${t('listing.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <Steps current={step}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <br />
          <br />
          <div align="center">
            <ListingFormComponent
              step={step}
              setStep={setStep}
              cardTitle={t('listing.cardTitle')}
              t={t}
              listing={listing}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditListingView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default EditListingView;
