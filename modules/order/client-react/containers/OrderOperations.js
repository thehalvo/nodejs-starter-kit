import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';

// Query
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ORDERS_QUERY from '../graphql/OrdersQuery.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';

// Mutation
import ADD_TO_CART from '../graphql/AddToCart.graphql';
import DELETE_CART_ITEM from '../graphql/DeleteCartItem.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withCurrentUser = Component =>
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  })(Component);

export const withOrders = Component =>
  graphql(ORDERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, orders, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.orders.totalCount;
            const newEdges = fetchMoreResult.orders.edges;
            const pageInfo = fetchMoreResult.orders.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.orders.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              orders: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, orders, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withGetCart = Component =>
  graphql(GET_CART_QUERY, {
    options: ({ currentUser }) => {
      return {
        variables: { userId: currentUser && currentUser.id }
      };
    },
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  })(Component);

// Mutation
export const withAddToCart = Component =>
  graphql(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: async input => {
        await mutate({
          variables: {
            input
          }
        });
      }
    })
  })(Component);

export const withDeleteCartItem = Component =>
  graphql(DELETE_CART_ITEM, {
    props: ({ mutate }) => ({
      deleteOrderDetail: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteOrderDetail: {
              id: id,
              __typename: 'OrderDetail'
            }
          }
        });
      }
    })
  })(Component);
