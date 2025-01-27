import { exampleBox, exampleText } from './example.css';

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
    </div>
  );
}

export default ExamplePage;
