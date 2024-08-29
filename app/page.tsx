import { UsernameForm } from '@/app/[username]/ui/username-form';
import { IdCard } from 'lucide-react';

interface IProps {
  searchParams: { error?: string };
}

const HomePage = ({ searchParams }: IProps) => (
  <main className="flex min-h-screen flex-col items-center pt-[15vh]">
    <div>
      <IdCard className="text-primary opacity-60" size={32} />
    </div>
    <h1 className="text-2xl">Github Resume Generator</h1>
    <p className="mb-4 opacity-65">Enter your GitHub username to obtain your resume</p>
    <UsernameForm error={searchParams.error} />
  </main>
);

export default HomePage;
