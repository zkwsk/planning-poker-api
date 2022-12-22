import store from './store';
import {v4 as uuid} from 'uuid';
import {Resolvers, Session, User} from '../resolvers-types';
import {
  SESSION_UPDATED,
  USER_ADDED_TO_SESSION,
  VOTE_UPDATED,
} from './constants';
import {PubSub, withFilter} from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers: Resolvers = {
  Query: {
    user: (_, {id}) => {
      return (store.users?.find(user => user?.id === id) as User) || null;
    },
    session: (_, {id}) =>
      store.sessions?.find(session => session?.id === id) || null,
  },
  Mutation: {
    createUser: (_, {username}) => {
      const userExists = store.users?.find(user => user?.name === username);

      if (userExists) {
        return userExists;
      }

      const newUser: User = {
        id: uuid(),
        name: username,
      };

      store.users?.push(newUser);
      return newUser;
    },
    createSession: (_, {hostUserId}) => {
      const currentUser =
        store.users?.find(user => user?.id === hostUserId) || null;

      if (!currentUser) {
        return null;
      }

      const session = {
        id: uuid(),
        hostUserId,
        participants: [currentUser] || null,
      } as Session;

      console.log({SESSION_UPDATED, session});
      pubsub.publish(SESSION_UPDATED, {
        sessionUpdated: session,
      });

      store.sessions?.push(session);
      return session;
    },
    updateVote: (_, {userId, vote}) => {
      const currentUser =
        store.users?.find(user => user?.id === userId) || null;

      if (!currentUser) {
        return null;
      }

      currentUser.vote = vote;

      const userSessions = store.sessions?.filter(session =>
        session?.participants?.some(user => user?.id === userId)
      ) as Session[];

      userSessions.forEach(session => {
        console.log({VOTE_UPDATED, session});
        pubsub.publish(VOTE_UPDATED, {
          sessionUpdated: session,
        });
      });

      return currentUser;
    },
    addUserToSession: (_, {userId, sessionId}) => {
      const currentUser =
        store.users?.find(user => user?.id === userId) || null;

      if (!currentUser) {
        return null;
      }

      const session =
        (store.sessions?.find(
          session => session?.id === sessionId
        ) as Session) || null;

      if (!session) {
        return null;
      }

      session.participants?.push(currentUser);
      console.log({USER_ADDED_TO_SESSION, session});

      pubsub.publish(USER_ADDED_TO_SESSION, {
        sessionUpdated: session,
      });

      return session;
    },
  },
  Subscription: {
    sessionUpdated: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator([
            SESSION_UPDATED,
            VOTE_UPDATED,
            USER_ADDED_TO_SESSION,
          ]),
        (payload, {id}) => payload?.sessionUpdated?.id === id || false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any,
    },
  },
};

export default resolvers;
