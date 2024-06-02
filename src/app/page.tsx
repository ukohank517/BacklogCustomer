import { submitGetRequest } from '@/lib/backlogApiClient';
import { typeDescription } from '@/utils/helper';
import Activity from './component/activity/Activity';

export default async function Home() {

  const backlogActivityList: BacklogActivity[] = await submitGetRequest('/api/v2/space/activities')

  const activityList: ActivityData[] = backlogActivityList.map(activity => ({
    id: activity.id,
    projectName: activity.project.name,
    type: typeDescription(activity.type),
    contentSummary: activity.content.summary || '',
    createdUserName: activity.createdUser.name,
    created: new Date(activity.created),
  }));

  return <Activity activityList={activityList} />
}
