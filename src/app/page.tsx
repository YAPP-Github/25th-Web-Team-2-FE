import styles from './page.module.css';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enable'
    ? process.env.NEXT_PUBLIC_MOCK_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const getData = async () => {
  const response = await fetch(`${BASE_URL}/api/test`);
  return await response.json();
};

export default async function Home() {
  const res = await getData();

  return (
    <div className={styles.page}>
      <span>{res.id}</span>
    </div>
  );
}
