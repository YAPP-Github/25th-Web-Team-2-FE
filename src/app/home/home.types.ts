import { GENDER } from './home.constants';

export type Area =
  | '전국'
  | '서울'
  | '경기'
  | '인천'
  | '강원'
  | '대전'
  | '세종'
  | '충남'
  | '충북'
  | '부산'
  | '울산'
  | '경남'
  | '경북'
  | '대구'
  | '광주'
  | '전남'
  | '전북'
  | '제주';

export type SeoulArea =
  | '전체'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중랑구';

export interface Region {
  id: number;
  name: Area;
  count: number;
}

export interface SeoulRegion {
  id: number;
  name: SeoulArea;
  count: number;
}

export type GenderValue = (typeof GENDER)[number]['value'];
