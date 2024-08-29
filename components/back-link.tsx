import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const BackLink = () => (
  <Link className="stack my-2 font-bold print:hidden" href="/">
    <ArrowLeft /> Back
  </Link>
);
