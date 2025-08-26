'use client';

import { commonStatusLayout, commonStatusText } from '../common-status.css';

export default function DesktopPostDetailError() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={commonStatusLayout}>
        <p className={commonStatusText}>
          공고 정보를 불러오지 못했습니다. <br /> 잠시 후 다시 시도해주세요.
        </p>
      </div>
    </div>
  );
}
