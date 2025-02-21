import { termWrapper } from './JoinCheckboxContainer.css';

interface PolicyProps {
  content: string[];
}

const Policy = ({ content }: PolicyProps) => {
  return (
    <div className={termWrapper}>
      {content.map((text, idx) => (
        <div
          key={idx}
          style={{
            whiteSpace: 'pre-line',
            marginBottom: '1rem',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default Policy;
