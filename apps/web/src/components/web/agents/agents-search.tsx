"use client";

import { LoaderIcon, SearchIcon } from "lucide-react";
import { Stack } from "~/components/common/stack";
import { Input } from "~/components/web/ui/input";
import { MultiSelect, Select } from "~/components/web/ui/select";
import { useToolFilters } from "~/contexts/tool-filter-context";
import { useServerAction } from "zsa-react";
import { findFilterOptions } from "~/server/web/tools/actions";
import { useEffect, useState } from "react";

export type ToolSearchProps = {
  placeholder?: string;
};

export const ToolSearch = ({ placeholder }: ToolSearchProps) => {
  const { filters, isLoading, getFilterValues, updateFilters } =
    useToolFilters();
  const { execute, isPending, data } = useServerAction(findFilterOptions);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data?.category) {
      setCategories(
        data.category.map((item: { name: string; slug: string }) => ({
          label: item.name,
          value: item.slug,
        }))
      );
    }
  }, [data?.category]);

  const sortOptions = [
    { value: "publishedAt.desc", label: "Latest" },
    { value: "category.asc", label: "Category (A to Z)" },
    { value: "category.desc", label: "Category (Z to A)" },
    { value: "features.desc", label: "Features (Z to A)" },
    { value: "features.asc", label: "Features (A to Z)" },
  ];
  const price = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
  ];
  const ratings = [
    { label: "4 to 5 Ratings", value: "4-5" },
    { label: "3 to 4 Ratings", value: "3-4" },
    { label: "2 to 3 Ratings", value: "2-3" },
    { label: "1 to 2 Ratings", value: "1-2" },
  ];

  const selectedCategory = getFilterValues("category") || [];
  const selectedPrice = getFilterValues("price") || [];
  const selectedRatings = getFilterValues("ratings") || [];

  const onCategorySelect = (selectedItems: string[]) => {
    updateFilters({
      category: selectedItems,
    });
  };
  const onPriceSelect = (selectedItems: string[]) => {
    // updateFilters({
    //   category: selectedItems,
    // });
  };
  const onRatingsSelect = (selectedItems: string[]) => {
    // updateFilters({
    //   category: selectedItems,
    // });
  };

  return (
    <Stack size="lg" direction="column" className="w-full">
      <Stack className="w-full gap-2">
        <div className="relative grow min-w-0">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <SearchIcon />
            )}
          </div>

          <Input
            size="lg"
            value={filters.q || ""}
            onChange={(e) => updateFilters({ q: e.target.value })}
            placeholder={
              isLoading ? "Loading..." : placeholder || "Search agents..."
            }
            className="w-50   truncate px-10"
          />
        </div>
        <div className="min-w-28">
          <MultiSelect
            options={ratings}
            selectedValues={selectedRatings}
            onChange={onRatingsSelect}
            label="Ratings"
          />
        </div>

        <div className="min-w-28">
          <MultiSelect
            options={price}
            selectedValues={selectedPrice}
            onChange={onPriceSelect}
            label="Price"
          />
        </div>
        <div className="min-w-20">
          <MultiSelect
            options={categories}
            selectedValues={selectedCategory}
            onChange={onCategorySelect}
            label="Categories"
          />
        </div>

        {/* <div className="min-w-36">
  <MultiSelect
    options={sortOptions}
    selectedValues={[filters.sort]} 
    onChange={(selected) => updateFilters({ sort: selected[0] || "" })}
    label="Order by"
  />
</div> */}

        <Select
          size="lg"
          className="min-w-36 text-white"
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
        >
          <option value="">Order by</option>
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-white text-xs"
            >
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};
