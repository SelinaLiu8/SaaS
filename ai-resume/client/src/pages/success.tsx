import { useRouter } from 'next/router';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment was successful. Your session ID is {session_id}.</p>
    </div>
  );
}
