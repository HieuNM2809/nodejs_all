import React from 'react';
import './searchform.scss';
import { Search, GroupAddOutlined, Clear } from '@material-ui/icons';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import NewGroup from '../NewGroup/NewGroup';

const SearchForm = (props) => {
  const onSubmit = props.onSubmit;
  const finder = props.finder;

  const handleSearchTermChange = debounce((event) => {
    const value = event.target.value;
    if (!onSubmit) return;

    var formValues = {
      finder: finder,
      full_name: value.includes('@') ? undefined : value,
      email: value.includes('@') ? value : undefined,
      type: value.includes('@') ? 'email' : 'name',
    };

    onSubmit(formValues);
  }, 300);

  return (
    <>
      <form>
        <div className='chat__menu--top'>
          <div className='chat__menu--searchBar pl-3'>
            <Search className='chat__menu--searchIcon' />
            <input
              type='text'
              placeholder='Search for friend'
              className='chat__menu--searchInput'
              onChange={handleSearchTermChange}
            />
            {/* <Clear className='chat__menu--clearIcon' /> */}
          </div>
          <Popup
            contentStyle={{ width: '500px' }}
            modal
            trigger={<GroupAddOutlined className='chat__menu--buttonAdd' />}
          >
            {(close) => <NewGroup close={close} />}
          </Popup>
        </div>
      </form>
    </>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
  onSubmit: null,
};

export default SearchForm;
