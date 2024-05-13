'use client';
import AdminEditForm from '@/components/admin-edit-form';
import ItemEditedComponent from '@/components/edited-item';
import GlobalPercentageForm from '@/components/global-percentage-form';
import useSearchEdit from '@/hooks/search-edit';
import { Item } from '@/types/items';
import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchInput = () => {
  
  const { searchTerm, handleChange, searchResults } = useSearchEdit();
  const [itemSelected, setItemSelected] = useState<Item | null>(null);
  const handleItemClick = (item: Item) => {
    setItemSelected(item);
  };

  return (
    <div className='flex gap-1'>
      <div className='flex flex-col w-[75%]'>
        <div className="flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className='bg-transparent border border-gray-400 p-2 rounded-xl grow'
        />
          <GlobalPercentageForm/>
        </div>
        <br />
        <section className='grid grid-cols-4 gap-4 overflow-y-auto h-[620px] m-auto'>
          {searchResults.map((result) => (
            <ItemEditedComponent key={result.id} item={result} onClick={() => handleItemClick(result)} />
          ))}
        </section>
      </div>
      <div className='w-[25%]'>
             {itemSelected &&  <AdminEditForm itemProp={itemSelected} />}
      </div>
    </div>
  );
};

export default SearchInput;

