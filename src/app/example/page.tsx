import { exampleBox, exampleText } from './example.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

function ExamplePage() {
  return (
    <div>
      {/* 기본 스타일 */}
      <div className={`${exampleBox()} ${exampleText}`}>Base Style</div>

      {/* 동적 스타일 */}
      <div className={exampleBox({ backgroundColor: 'secondary', size: 'small' })}>
        Secondary Small
      </div>
      <div className={exampleBox({ backgroundColor: 'gray', size: 'large' })}>gray Large</div>
      <Icon icon="Airplane" width={40} height={40} color={colors.primaryMint} />
    </div>
  );
}

export default ExamplePage;
