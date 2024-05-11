'use client'

import getSearchItems from "@/helpers/search-items";
import { Item } from "@/types/items";
import { useEffect, useState } from "react";

export default function useSearchEdit() {
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
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

    return {
        searchResults,
        searchTerm,
        setSearchResults: () => {},
        setSearchTerm: () => {},
        setTypingTimeout: () => {},
        typingTimeout,
        handleChange,
        handleSearch,
    };
}