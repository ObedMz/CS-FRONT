'use client'

import { ResponseMessage } from "@/types";
import { Item } from "@/types/items";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ItemComponent from "../inventory-item-comp";
import updateItem from "@/helpers/update-item";

export default function AdminEditForm({itemProp } : {   itemProp : Item }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [percentage, setPercentage] = useState<number>(itemProp.addedPercentage || 0);
    const [message, setMessage ] = useState<ResponseMessage | null>(null);

    useEffect(() => {
        setPercentage(itemProp.addedPercentage || 0);
    },[itemProp.addedPercentage]);

  const onSubmit = async (data: any) => {
    const response = await updateItem(itemProp.id , (data.addedPercentage == '' ? null : data.addedPercentage), data.hidden);
    setMessage(response);
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
                checked={(itemProp.hidden == null ? false : itemProp.hidden)}
                defaultChecked={(itemProp.hidden == null ? false : itemProp.hidden)}
              />
            </div>
            <div className='text-lg flex gap-2 font-bold items-center'>
              Percentage:
              <input
                type="number"
                step={0.01}
                className="bg-transparent border border-white rounded-lg w-[80px]"
                {...register("addedPercentage", { pattern: /^\d*\.?\d*$/ })}
                value={percentage}
                onChange={(e) => setPercentage((e.target.value.length > 0 ? parseFloat(e.target.value) : 0))}
              />
              {/* Show error if input is not a valid number */}
              {errors.addedPercentage && <span className="text-red-500">Invalid number</span>}
            </div>
            <br />
            <div className='text-lg flex gap-2 font-bold items-center'>
              Price Modified: {(itemProp.price + (itemProp.price * percentage / 100)).toFixed(2)}
            </div>
            <button type="submit" className='bg-blue-500 text-white font-bold p-2 rounded-lg mb-3' onClick={ handleSubmit(onSubmit)}>Save</button>
            { message && (message === ResponseMessage.SUCCESS ? (
              <div className="text-green-500">Success</div>
            ) : <div className='text-red-500'>Error</div>) }
            <ItemComponent item={itemProp} />
          </form>
        </>
    )
}