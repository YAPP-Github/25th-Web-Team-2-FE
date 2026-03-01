import { listBottomSheetLayout, listItem } from './ListBottomSheet.css';

import { colors } from '@/styles/colors';

export interface ListBottomSheetItem {
  text: string;
  onClick: () => void;
  condition?: boolean;
  variant?: 'default' | 'danger';
}

interface ListBottomSheetProps {
  items: ListBottomSheetItem[];
}

const ListBottomSheet = ({ items }: ListBottomSheetProps) => {
  return (
    <section className={listBottomSheetLayout}>
      {items
        .filter((item) => item.condition !== false)
        .map((item) => (
          <button
            key={item.text}
            className={listItem}
            onClick={item.onClick}
            style={{
              color: item.variant === 'danger' ? colors.textAlert : colors.text06,
            }}
          >
            {item.text}
          </button>
        ))}
    </section>
  );
};

export default ListBottomSheet;
