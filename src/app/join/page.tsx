'use client';

export default function JoinPage() {
  const email = sessionStorage.getItem('email');

  return <div>{email}</div>;
}
