"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "~/components/web/categories/category-card";
import { EmptyList } from "~/components/web/empty-list";
import { Grid } from "~/components/web/ui/grid";
import type { CategoryMany } from "~/server/web/categories/payloads";
import { cx } from "~/utils/cva";
import { Input } from "../ui/input";
import { ArrowUpRightIcon, SearchIcon } from "lucide-react";
import { Button } from "~/components/web/ui/button";
import { InternalLink } from "../internalLink";


type CategoryListProps = ComponentProps<typeof Grid> & {
  categories: CategoryMany[];
};

const CategoryList = ({
  categories,
  className,
  ...props
}: CategoryListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex -mt-6 space-x-4">
        <Button suffix={<ArrowUpRightIcon />} asChild>
          <InternalLink
            href={`/agents-list`}
            // rel={category.isFeatured ? "noopener noreferrer" : undefined}
            eventName="click_website"
            // eventProps={{ url: category.website }}
          >
            {/* Find agents */} Explore Agents
          </InternalLink>
        </Button>

        <Button suffix={<ArrowUpRightIcon />} asChild>
          <InternalLink
            href={`/agents-list`}
            // rel={category.isFeatured ? "noopener noreferrer" : undefined}
            eventName="click_website"
            // eventProps={{ url: category.website }}
          >
            {/* Find agents */} Join Community
          </InternalLink>
        </Button>
      </div>
      
      

      {/* Categories Search element */}
      {/* <div className="relative grow min-w-0">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
          <SearchIcon />
        </div>

        <Input
          size="lg"
          type="search"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full truncate px-10"
        />
      </div> */}
      

      <Grid className={cx("gap-2", className)} {...props}>
        {filteredCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}

        {!filteredCategories.length && (
          <EmptyList>
            {searchQuery
              ? "No matching categories found."
              : "No categories found."}
          </EmptyList>
        )}
      </Grid>
    </div>
  );
};

const CategoryListSkeleton = () => {
  return (
    <Grid className="md:gap-8">
      {[...Array(24)].map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </Grid>
  );
};

export { CategoryList, CategoryListSkeleton };
