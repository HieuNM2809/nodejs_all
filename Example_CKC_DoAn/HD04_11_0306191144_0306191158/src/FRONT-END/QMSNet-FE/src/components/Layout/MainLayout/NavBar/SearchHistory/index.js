import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail, setUserSettings } from '../../../../../redux/user/action';
import { SearchHistoryWrapper } from './SearchHistory.style';
const SearchHistory = ({ position, user }) => {
  const auth = useSelector(state => state.auth);
  const { userDetail } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const searchHistoryJSON = auth?.user?.userSettings?.SEARCH_HISTORY || null;
  const searchHistory = JSON.parse(searchHistoryJSON);

  const handleDeleteHistory = (e) => {

    const indexOf = searchHistory.findIndex((h) => h._id === user._id);
    searchHistory.splice(indexOf, 1);
    dispatch(setUserSettings({
      SEARCH_HISTORY: JSON.stringify(searchHistory)
    }))
    e.stopPropagation();

  }

  return (
    <SearchHistoryWrapper onClick={() => {
      if (!userDetail || userDetail?._id !== user._id) {

        const indexOf = searchHistory.findIndex((h) => h._id === user._id);
        if (indexOf !== -1) {
          searchHistory.splice(indexOf, 1);
        }
        searchHistory.unshift(user);
        dispatch(setUserSettings({
          SEARCH_HISTORY: JSON.stringify(searchHistory)
        }))
      }
      dispatch(setUserDetail(user));
    }}>
      <div className="prefix-icon">

        <ClockCircleOutlined />
      </div>
      <div className="content">
        {user.username}

      </div>
      <div className="suffix-icon">
        <CloseOutlined onClick={handleDeleteHistory} />
      </div>
    </SearchHistoryWrapper>

  )
}

export default SearchHistory