export const sortedActivities = (activities: ActivityData[]): ActivityData[] => {
  return activities.sort((a:ActivityData, b:ActivityData) => a.created.valueOf() - b.created.valueOf());
}

export const typeDescription = (type: number): string => {
  switch (type) {
    case 1:
      return '課題の追加'
    case 2:
      return '課題の更新'
    case 3:
      return '課題にコメント'
    case 4:
      return '課題の削除'
    case 5:
      return 'Wikiを追加'
    case 6:
      return 'Wikiを更新'
    case 7:
      return 'Wikiを削除'
    case 8:
      return '共有ファイルを追加'
    case 9:
      return '共有ファイルを更新'
    case 10:
      return '共有ファイルを削除'
    case 11:
      return 'Subversionコミット'
    case 12:
      return 'GITプッシュ'
    case 13:
      return 'GITリポジトリ作成'
    case 14:
      return '課題をまとめて更新'
    case 15:
      return 'ユーザーがプロジェクトに参加'
    case 16:
      return 'ユーザーがプロジェクトから脱退'
    case 17:
      return 'コメントにお知らせを追加'
    case 18:
      return 'プルリクエストの追加'
    case 19:
      return 'プルリクエストの更新'
    case 20:
      return 'プルリクエストにコメント'
    case 21:
      return 'プルリクエストの削除'
    case 22:
      return 'マイルストーンの追加'
    case 23:
      return 'マイルストーンの更新'
    case 24:
      return 'マイルストーンの削除'
    case 25:
      return 'グループがプロジェクトに参加'
    case 26:
      return 'グループがプロジェクトから脱退'
    default:
      return 'その他'
  }
}