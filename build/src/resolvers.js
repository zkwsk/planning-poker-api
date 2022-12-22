"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const resolvers = {
    Query: {
        user: (_, { id }) => {
            var _a;
            return ((_a = store_1.default.users) === null || _a === void 0 ? void 0 : _a.find(user => (user === null || user === void 0 ? void 0 : user.id) === id)) || null;
        },
        session: (_, { id }) => { var _a; return ((_a = store_1.default.sessions) === null || _a === void 0 ? void 0 : _a.find(session => (session === null || session === void 0 ? void 0 : session.id) === id)) || null; },
    },
    Mutation: {
        createUser: (_, { username }) => {
            var _a, _b;
            const userExists = (_a = store_1.default.users) === null || _a === void 0 ? void 0 : _a.find(user => (user === null || user === void 0 ? void 0 : user.name) === username);
            if (userExists) {
                return userExists;
            }
            const newUser = {
                id: (0, uuid_1.v4)(),
                name: username,
            };
            (_b = store_1.default.users) === null || _b === void 0 ? void 0 : _b.push(newUser);
            return newUser;
        },
        createSession: (_, { hostUserId }) => {
            var _a, _b;
            const currentUser = ((_a = store_1.default.users) === null || _a === void 0 ? void 0 : _a.find(user => (user === null || user === void 0 ? void 0 : user.id) === hostUserId)) || null;
            if (!currentUser) {
                return null;
            }
            const session = {
                id: (0, uuid_1.v4)(),
                hostUserId,
                participants: [currentUser] || null,
            };
            console.log({ SESSION_UPDATED: constants_1.SESSION_UPDATED, session });
            pubsub.publish(constants_1.SESSION_UPDATED, {
                sessionUpdated: session,
            });
            (_b = store_1.default.sessions) === null || _b === void 0 ? void 0 : _b.push(session);
            return session;
        },
        updateVote: (_, { userId, vote }) => {
            var _a, _b;
            const currentUser = ((_a = store_1.default.users) === null || _a === void 0 ? void 0 : _a.find(user => (user === null || user === void 0 ? void 0 : user.id) === userId)) || null;
            if (!currentUser) {
                return null;
            }
            currentUser.vote = vote;
            const userSessions = (_b = store_1.default.sessions) === null || _b === void 0 ? void 0 : _b.filter(session => { var _a; return (_a = session === null || session === void 0 ? void 0 : session.participants) === null || _a === void 0 ? void 0 : _a.some(user => (user === null || user === void 0 ? void 0 : user.id) === userId); });
            userSessions.forEach(session => {
                console.log({ VOTE_UPDATED: constants_1.VOTE_UPDATED, session });
                pubsub.publish(constants_1.VOTE_UPDATED, {
                    sessionUpdated: session,
                });
            });
            return currentUser;
        },
        addUserToSession: (_, { userId, sessionId }) => {
            var _a, _b, _c;
            const currentUser = ((_a = store_1.default.users) === null || _a === void 0 ? void 0 : _a.find(user => (user === null || user === void 0 ? void 0 : user.id) === userId)) || null;
            if (!currentUser) {
                return null;
            }
            const session = ((_b = store_1.default.sessions) === null || _b === void 0 ? void 0 : _b.find(session => (session === null || session === void 0 ? void 0 : session.id) === sessionId)) || null;
            if (!session) {
                return null;
            }
            (_c = session.participants) === null || _c === void 0 ? void 0 : _c.push(currentUser);
            console.log({ USER_ADDED_TO_SESSION: constants_1.USER_ADDED_TO_SESSION, session });
            pubsub.publish(constants_1.USER_ADDED_TO_SESSION, {
                sessionUpdated: session,
            });
            return session;
        },
    },
    Subscription: {
        sessionUpdated: {
            subscribe: (0, graphql_subscriptions_1.withFilter)(() => pubsub.asyncIterator([
                constants_1.SESSION_UPDATED,
                constants_1.VOTE_UPDATED,
                constants_1.USER_ADDED_TO_SESSION,
            ]), (payload, { id }) => { var _a; return ((_a = payload === null || payload === void 0 ? void 0 : payload.sessionUpdated) === null || _a === void 0 ? void 0 : _a.id) === id || false; }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ),
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map