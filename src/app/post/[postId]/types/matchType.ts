import { MATCH_TYPE } from '../constants/matchType';

export type MatchType = (typeof MATCH_TYPE)[keyof typeof MATCH_TYPE];
