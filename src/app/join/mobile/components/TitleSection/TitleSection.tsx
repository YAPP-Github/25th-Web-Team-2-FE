import { titleContainerLayout, titleWrapper, titleText, descriptionText } from './TitleSection.css';

interface TitleSectionProps {
  title: string;
  description: string;
  emailBadge?: React.ReactNode;
}

const TitleSection = ({ title, description, emailBadge }: TitleSectionProps) => {
  return (
    <section className={titleContainerLayout}>
      <div className={titleWrapper}>
        <h2 className={titleText}>{title}</h2>
        <h3 className={descriptionText}>{description}</h3>
      </div>
      {emailBadge}
    </section>
  );
};

export default TitleSection;
