'use client';

import { Printer } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

interface IProps extends ButtonProps {}

export const PrintButton: FC<IProps> = (props) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button variant="ghost" className="stack font-black print:hidden" onClick={handlePrint}>
      <Printer /> Print
    </Button>
  );
};
