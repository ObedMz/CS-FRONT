'use client'

import { ResponseMessage } from "@/types";
import { Item } from "@/types/items";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ItemComponent from "../inventory-item-comp";
import updateItem from "@/helpers/update-item";
import { useRouter } from "next/navigation";


export default function AdminEditForm({itemProp } : {   itemProp : Item }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [percentage, setPercentage] = useState<number>(itemProp.addedPercentage || 0);
    const [checked , setChecked] = useState<boolean>(itemProp.hidden || false);
    const [customPrice, setCustomPrice] = useState<boolean>(itemProp.modified || false);
    const [Price, setPrice] = useState<number>(itemProp.custom_price || 0);
    const [message, setMessage ] = useState<ResponseMessage | null>(null);
    const router = useRouter();

    const isPositiveNumber = (value: string | null): boolean => {
      if (value === null || value === '') return true;
      return /^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0;
    };
  

    useEffect(() => {
        setPercentage(itemProp.addedPercentage || 0);
        setChecked(itemProp.hidden || false);
        setCustomPrice(itemProp.modified || false);
    },[itemProp.addedPercentage, itemProp.hidden, itemProp.modified]);

  const onSubmit = async (data: any) => {
    const response = await updateItem(itemProp.id , (customPrice ? "0" : percentage.toString()), checked, ((customPrice) ? Price : null));
    setMessage(response);
    window.location.reload();
    setTimeout(() => setMessage(null), 3000);

  };

    return (
        <>
          <h1 className='text-2xl font-bold'>Edit</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-lg flex gap-2 font-bold items-center'>
              Hide:
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-blue-600 focus:ring-red-500"
                {...register("hidden")}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <div className="flex items-center gap-2">
              Set custom Price: 
              <input type="checkbox" 
              {...register("modified")}
              className="form-checkbox h-5 w-5 text-blue-600 bg-blue-600 focus:ring-red-500" checked={((customPrice) ? customPrice : false)} onChange={(e) => setCustomPrice(e.target.checked)}/>
            </div>
            </div>
            <br />
            {!customPrice && (
              <>
              <div className='text-lg flex gap-2 font-bold items-center'>
              Percentage:
              <input
                className="bg-transparent border border-white rounded-lg w-[80px]"
                {...register("addedPercentage", {validate: isPositiveNumber})}
                value={percentage}
                onChange={(e) => setPercentage((e.target.value.length > 0 ? parseFloat(e.target.value) : 0))}
              />
              {/* Show error if input is not a valid number */}
              {errors.addedPercentage && <span className="text-red-500">Invalid number</span>}
            </div>
            
            <div className='text-lg flex gap-2 font-bold items-center text-orange-300'>
              With Percentage: ${(itemProp.price + (itemProp.price * percentage / 100)).toFixed(2)}
            </div>
              </>
            )}

            { customPrice && (
                <>
              <div className="flex gap-1 items-center">
              <label htmlFor="price" className="font-bold">Set Price: </label>
              <input 
              value={Price}
              type="text" {...register("price", {validate: isPositiveNumber})} 
              onChange={(e) => setPrice((e.target.value.length > 0 ? parseFloat(e.target.value) : 0))}
              className="w-[80px] bg-transparent border border-white rounded-lg p-2"/>
            </div>

                </>
          )

            }
            <br />
            {errors.price && <p className="text-sm text-red-500">Solo se permiten valores positivos y numéricos.</p>}
            <button type="submit" className='bg-blue-500 text-white font-bold p-2 rounded-lg mb-3' onClick={ handleSubmit(onSubmit)}>Save</button>
            { message && (message === ResponseMessage.SUCCESS ? (
              <div className="text-green-500">Success</div>
            ) : <div className='text-red-500'>Error</div>) }
            <ItemComponent item={itemProp} edit={true}/>
          </form>
        </>
    )
}