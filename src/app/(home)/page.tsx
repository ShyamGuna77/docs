import Link from 'next/link';
import { Feedback } from '../../components/feedback';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Feedback />
    </main>
  );
}
