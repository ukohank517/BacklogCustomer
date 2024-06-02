'use client';
import { Box, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { ActivityListTable } from './parts/ActivityListTable';

const initialFavoriteData = [
  {
    id: 3,
    projectName: 'プロジェクト 3',
    type: 'タイプ C',
    contentSummary: '概要 3',
    createdUserName: 'ユーザー名 3',
    created: '2024-06-02'
  },
  {
    id: 4,
    projectName: 'プロジェクト 4',
    type: 'タイプ D',
    contentSummary: '概要 4',
    createdUserName: 'ユーザー名 4',
    created: '2024-06-02'
  },
];

export default function Activity({activities}: {activities: BacklogActivity[]}) {
  const initialSearchData = activities.map(activity => ({
    id: activity.id,
    projectName: activity.project.name,
    type: activity.type,
    contentSummary: activity.content.summary,
    createdUserName: activity.createdUser.name,
    created: activity.created
  }));

  const [searchData, setSearchData] = useState(initialSearchData);
  const [favoriteData, setFavoriteData] = useState(initialFavoriteData);

  const handleCheckboxChange = (item, isFavorite) => {
    if (isFavorite) {
      setFavoriteData(prev => prev.filter(fav => fav.id !== item.id));
      setSearchData(prev => [...prev, item]);
    } else {
      setSearchData(prev => prev.filter(search => search.id !== item.id));
      setFavoriteData(prev => [...prev, item]);
    }
  };

  return (
    <>
      <Box mb={4}>
        <Input placeholder="検索キーワード入力" />
      </Box>
      <ActivityListTable
        title='お気に入りのリスト'
        data={favoriteData}
        allChecked={true}
        onCheckboxChange={(item, isChecked) => handleCheckboxChange(item, true)}
      />
      <ActivityListTable
        title='検索結果'
        data={searchData}
        allChecked={false}
        onCheckboxChange={(item, isChecked) => handleCheckboxChange(item, false)}
      />
    </>
  )

}