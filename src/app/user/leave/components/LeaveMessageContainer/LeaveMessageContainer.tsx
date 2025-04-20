import { Fragment } from 'react';

import { leaveMessageContainer, listItem, listSubText } from './LeaveMessageContainer.css';

const LEAVE_MESSAGES = [
  {
    text: '회원가입 시 입력한 정보가 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다',
    subText: '*부적합 정보, 이용 제한 및 징계에 관한 기록은 일정 기간 보관합니다',
  },
  {
    text: '회원 탈퇴 시 작성하신 게시물 등은 삭제되지 않으므로 탈퇴 전 삭제해 주세요',
    subText: '',
  },
  {
    text: '메일 발송에서 수신까지의 시간차로 인해 회원탈퇴 이후 약 하루동안 그라밋 메일을 수신할 수 있습니다',
    subText: '',
  },
  { text: '같은 소셜 아이디로 재가입 시 신규 회원으로 가입됩니다', subText: '' },
];

const LeaveMessageContainer = () => {
  return (
    <ul className={leaveMessageContainer}>
      {LEAVE_MESSAGES.map((message) => (
        <Fragment key={message.text}>
          <li className={listItem}>{message.text}</li>
          {message.subText && <li className={listSubText}>{message.subText}</li>}
        </Fragment>
      ))}
    </ul>
  );
};

export default LeaveMessageContainer;
