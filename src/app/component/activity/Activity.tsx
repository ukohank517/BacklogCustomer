'use client';
import { Box, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ActivityListTable } from './parts/ActivityListTable';
import { sortedActivities } from '@/utils/helper';

export default function Activity({activityList}: {activityList: ActivityData[]}) {
  const [isLocalStorageInitialized, setIsLocalStorageInitialized] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<ActivityData[]>([]);
  const [favoriteData, setFavoriteData] = useState<ActivityData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // initialize favoriteData from localStorage
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const initialFavoriteData = JSON.parse(localStorage.getItem('favorites')||'[]');
      setFavoriteData(initialFavoriteData);

      // remove favoriteData from activities
      const initialSearchData = activityList.filter(activity =>
        !initialFavoriteData.some((fav: ActivityData) => fav.id === activity.id)
      );
      setSearchData(initialSearchData);
    }else{
      alert('localStorageが使えません。環境設定を確認してください。');
    }

    // finish initializing
    setIsLocalStorageInitialized(true);
  }, []);

  // update favoriteData to localStorage
  useEffect(() => {
    if(isLocalStorageInitialized && isLocalStorageAvailable()){
      localStorage.setItem('favorites', JSON.stringify(favoriteData));
    }
  }, [favoriteData, isLocalStorageInitialized]);

  const handleCheckboxChange = (item: ActivityData, isFavorite: boolean) => {

    if (isFavorite) {
      // check, just move the item to favoriteData
      const updatedFavoriteData = [...favoriteData, item];
      const updatedSearchData = searchData.filter(search => search.id !== item.id);

      setFavoriteData(sortedActivities(updatedFavoriteData));
      setSearchData(sortedActivities(updatedSearchData));
    } else {
      // uncheck, move the item to searchData if it matches the searchKeyword
      const updatedFavoriteData = favoriteData.filter(fav => fav.id !== item.id);
      const updatedSearchData = [...searchData, item].filter(search => includeSearchKeyword(search, searchKeyword));

      setFavoriteData(sortedActivities(updatedFavoriteData));
      setSearchData(sortedActivities(updatedSearchData));
    }
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      // filter by keyword
      const filteredActivities = activityList.filter(activity => includeSearchKeyword(activity, searchKeyword));
      // remove favoriteData from filteredActivities
      const updatedSearchData = filteredActivities.filter(activity =>
        !favoriteData.some((fav: ActivityData) => fav.id === activity.id)
      );

      setSearchData(sortedActivities(updatedSearchData));
    }
  };

  return (
    <>
      <Box mb={4}>
        <Input
          placeholder="検索キーワード入力"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
      <ActivityListTable
        title='お気に入りのリスト'
        data={favoriteData}
        allChecked={true}
        onCheckboxChange={handleCheckboxChange}
      />
      <ActivityListTable
        title='検索結果'
        data={searchData}
        allChecked={false}
        onCheckboxChange={handleCheckboxChange}
      />
    </>
  )
}

const isLocalStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const includeSearchKeyword = (activity: ActivityData, keyword: string) => {
  return activity.projectName.includes(keyword) ||
    activity.type.includes(keyword) ||
    activity.contentSummary.includes(keyword) ||
    activity.createdUserName.includes(keyword);
}