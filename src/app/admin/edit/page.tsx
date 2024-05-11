'use client';
import ItemEditedComponent from '@/components/edited-item';
import ItemComponent from '@/components/inventory-item-comp';
import getSearchItems from '@/helpers/search-items';
import updateItem from '@/helpers/update-item';
import { ResponseMessage } from '@/types';
import { Item } from '@/types/items';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SearchInput = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [itemSelected, setItemSelected] = useState<Item | null>(null);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [message, setMessage ] = useState<ResponseMessage | null>(null);

  const handleSearch = async (value: string) => {
    try {
       const response = await getSearchItems(value);
       setSearchResults(response);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      handleSearch(value);
    }, 500);

    setTypingTimeout(newTypingTimeout);
  };

  const handleItemClick = (item: Item) => {
    setItemSelected(item);
    setPercentage(item.addedPercentage || 0);
  };

  const onSubmit = async (data: any) => {
    if(!itemSelected) return
    const response = await updateItem(itemSelected.id , (data.addedPercentage == '' ? null : data.addedPercentage), data.hidden);
    setMessage(response);
  };

  return (
    <div className='flex gap-1'>
      <div className='flex flex-col w-[75%]'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className='bg-transparent border border-gray-400 p-2 rounded-xl'
        />
        <br />
        <section className='grid grid-cols-4 gap-4 overflow-y-auto h-[620px] m-auto'>
          {searchResults.map((result) => (
            <ItemEditedComponent key={result.id} item={result} onClick={() => handleItemClick(result)} />
          ))}
        </section>
      </div>
      <div className='w-[25%]'>
        <div className='text-2xl font-bold'>Edit</div>
        {itemSelected && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-lg flex gap-2 font-bold items-center'>
              Hide:
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-blue-600 focus:ring-red-500"
                {...register("hidden")}
                checked={(itemSelected.hidden == null ? false : itemSelected.hidden)}
                defaultChecked={(itemSelected.hidden == null ? false : itemSelected.hidden)}
              />
            </div>
            <div className='text-lg flex gap-2 font-bold items-center'>
              Percentage:
              <input
                type="number"
                step={0.01}
                className="bg-transparent border border-white rounded-lg w-[80px]"
                {...register("addedPercentage", { pattern: /^\d*\.?\d*$/ })}
                value={percentage || ''}
                defaultValue={itemSelected.addedPercentage || 0}
                onChange={(e) => setPercentage((e.target.value.length > 0 ? parseFloat(e.target.value) : 0))}
              />
              {/* Show error if input is not a valid number */}
              {errors.addedPercentage && <span className="text-red-500">Invalid number</span>}
            </div>
            <br />
            <div className='text-lg flex gap-2 font-bold items-center'>
              Price Modified: {(itemSelected.price + (itemSelected.price * percentage / 100)).toFixed(2)}
            </div>
            <button type="submit" className='bg-blue-500 text-white font-bold p-2 rounded-lg mb-3' onClick={ handleSubmit(onSubmit)}>Save</button>
            { message && (message === ResponseMessage.SUCCESS ? (
              <div className="text-green-500">Success</div>
            ) : <div className='text-red-500'>Error</div>) }
            <ItemComponent item={itemSelected} />
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchInput;

