"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = useCallback(
    debounce((searchValue: string) => {
      if (!searchValue?.trim()) {
        return;
      }
      router.push(`?search=${searchValue}`);
    }, 300),
    []
  );

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        value={value}
        placeholder="Search Boards"
        className="focus-visible:shadow-md focus-visible:outline-none focus-visible:ring-blue-500 focus:border-transparent pl-10 w-full max-w-96"
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
