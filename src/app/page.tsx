import { submitGetRequest } from '@/lib/backlogApiClient';
import { typeDescription } from '@/utils/helper';
import { format } from 'date-fns-tz';
import Activity from './component/activity/Activity';

export default async function Home() {

  const backlogActivityList: BacklogActivity[] = await submitGetRequest('/api/v2/space/activities')

  const activityList: ActivityData[] = backlogActivityList.map(activity => ({
    id: activity.id,
    projectName: activity.project.name,
    type: typeDescription(activity.type),
    contentSummary: activity.content.summary || '',
    createdUserName: activity.createdUser.name,
    created: format(new Date(activity.created), 'yyyy/MM/dd HH:mm:ss'),
  }));

  return <Activity activityList={activityList} />
}
