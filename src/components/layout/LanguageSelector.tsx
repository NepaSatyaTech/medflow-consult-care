
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as 'en' | 'ne' | 'hi')}
      >
        <SelectTrigger className="w-[110px] bg-white bg-opacity-90 text-sm">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ne">नेपाली</SelectItem>
          <SelectItem value="hi">हिंदी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
