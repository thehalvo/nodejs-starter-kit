/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button } from '@gqlapp/look-client-react';
import {Spin as Loader} from 'antd';
const UsersView = ({  loadingQuizzes, quizzes, t }) => {
  // const [errors, setErrors] = useState([]);

  // const handleDeleteUser = async id => {
  //   const result = await deleteUser(id);
  //   if (result && result.errors) {
  //     setErrors(result.errors);
  //   } else {
  //     setErrors([]);
  //   }
  // };

  // const renderOrderByArrow = name => {
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'desc') {
  //       return <span className="badge badge-primary">&#8595;</span>;
  //     } else {
  //       return <span className="badge badge-primary">&#8593;</span>;
  //     }
  //   } else {
  //     return <span className="badge badge-secondary">&#8645;</span>;
  //   }
  // };

  // const handleOrderBy = (e, name) => {
  //   e.preventDefault();

  //   let order = 'asc';
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'asc') {
  //       order = 'desc';
  //     } else if (orderBy.order === 'desc') {
  //       return onOrderBy({
  //         column: '',
  //         order: ''
  //       });
  //     }
  //   }

  //   return onOrderBy({ column: name, order });
  // };

  const columns = [
    {
      title: (
        <>
        <h5>Id</h5>
        {/* <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a> */}
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <>
        {record.id}
        {/* <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link> */}
        </>
      )
    },
    {
      title: (
        <>
        <h5>Title</h5>
        {/* <a onClick={e => handleOrderBy(e, 'description')} href="#">
          {t('users.column.email')} {renderOrderByArrow('email')}
        </a> */}
        </>
      ),
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: (
        <>
        <h5>User</h5>
        {/* <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('users.column.active')} {renderOrderByArrow('isActive')}
        </a> */}
        </>
      ),
      dataIndex: 'record.user.username',
      key: 'username',
      render: (text, record) => (
      <h5>
        {console.log('record', record)}
        {record.user && record.user.username}
        </h5>
      )
    },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'role')} href="#">
    //       {t('users.column.role')} {renderOrderByArrow('role')}
    //     </a>
    //   ),
    //   dataIndex: 'role',
    //   key: 'role'
    // },
    // {
    //   title: t('users.column.actions'),
    //   key: 'actions',
    //   render: (text, record) => (
    //     <Button color="primary" size="sm" onClick={() => handleDeleteUser(record.id)}>
    //       {t('users.btn.delete')}
    //     </Button>
    //   )
    // }
  ];

  return (
    <>
      {loadingQuizzes && !quizzes ? (
        <div className="text-center" align='center'><Loader /></div>
      ) : (
        <>
          {/* {errors &&
            errors.map(error => (
              <div className="alert alert-danger" role="alert" key={error.field}>
                {error.message}
              </div>
            ))} */}
          {/* for horizontal table responsive on smaller screens */}
          <div style={{ overflowX: 'auto' }}>
            <Table dataSource={quizzes} columns={columns} />
          </div>
        </>
      )}
    </>
  );
};

UsersView.propTypes = {
  loadingQuizzes: PropTypes.bool.isRequired,
  quizzes: PropTypes.array,
  // orderBy: PropTypes.object,
  // onOrderBy: PropTypes.func.isRequired,
  // deleteUser: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('quiz')(UsersView);
