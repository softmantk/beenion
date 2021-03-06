import reduceToUser from './reduceToUser'
import { UserEvent } from '../../types'

describe('reduceToUser projection', () => {
  it('should create an user object', () => {
    const userEvents = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as UserEvent[]

    const user = reduceToUser(userEvents)

    expect(user).toEqual({
      userId: 'test-user-uuid',
      mergedUserIds: [],
      rankEvents: []
    })
  })

  it('should update rankevents', () => {
    const userEvents: UserEvent[] = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as UserEvent[]

    const user = reduceToUser(userEvents)

    expect(user.rankEvents.length).toEqual(6)
  })

  it('should cancel uservote', () => {
    const userEvents: UserEvent[] = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        articleId: 'test-article-id',
        journalId: 'test-journal-id',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserVoteWithdrawn',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as UserEvent[]

    const user = reduceToUser(userEvents)

    expect(user.rankEvents).toEqual([
      {
        category: 'ArticleVotes',
        eventType: 'ArticleUpvotedWithGold',
        articleId: 'test-article-id',
        journalId: 'test-journal-id'
      }
    ])
  })
})
