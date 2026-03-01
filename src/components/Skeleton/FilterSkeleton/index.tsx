import {
  areaButtonSkeleton,
  contactTargetButtonSkeleton,
  matchTypeButtonSkeleton,
  skeletonContainer,
} from './FilterSkeleton.css';

const FilterSkeleton = () => {
  return (
    <div className={skeletonContainer}>
      <div className={matchTypeButtonSkeleton} />
      <div className={contactTargetButtonSkeleton} />
      <div className={areaButtonSkeleton} />
    </div>
  );
};

export default FilterSkeleton;
