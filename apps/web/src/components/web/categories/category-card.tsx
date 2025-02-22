import plur from "plur";
import type { ComponentProps } from "react";
import { Link } from "~/components/common/link";
import { Skeleton } from "~/components/common/skeleton";
import {
  CardSimple,
  CardSimpleCaption,
  CardSimpleDivider,
  CardSimpleTitle,
} from "~/components/web/ui/card-simple";
import type { CategoryMany } from "~/server/web/categories/payloads";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Favicon } from "../ui/favicon";
import { H4 } from "~/components/common/heading";
import { Button } from "~/components/web/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { ExternalLink } from "~/components/web/external-link";

type CategoryCardProps = ComponentProps<typeof CardSimple> & {
  category: CategoryMany;
};

const CategoryCard = ({ category, ...props }: CategoryCardProps) => {
  return (
    // <CardSimple asChild {...props}>
    //   <Link href={`/categories/${category.slug}`}>
    //     <CardSimpleTitle>{category.name}</CardSimpleTitle>

    //     <CardSimpleDivider />

    //     <CardSimpleCaption>
    //       {`${category._count.tools} ${plur("AI agent", category._count.tools)}`}
    //     </CardSimpleCaption>
    //   </Link>
    // </CardSimple>
    <Card asChild {...props}>
      <Link href={`/categories/${category.slug}`}>
        <CardHeader>
          <Favicon
            src={`/categories/${category.slug}.webp`}
            title={category.name}
          />
          <H4 as="h3" className="truncate">
            {category.name}
          </H4>
        </CardHeader>

        {category && (
          <CardDescription>
            {`${category._count.tools} ${plur(
              "AI agent",
              category._count.tools
            )}`}
          </CardDescription>
        )}
        <CardDescription>{category.description}</CardDescription>
      </Link>
    </Card>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <CardSimple>
      <CardSimpleTitle className="w-1/3">
        <Skeleton>&nbsp;</Skeleton>
      </CardSimpleTitle>

      <Skeleton className="h-0.5 flex-1" />

      <CardSimpleCaption className="w-1/4">
        <Skeleton>&nbsp;</Skeleton>
      </CardSimpleCaption>
    </CardSimple>
  );
};

export { CategoryCard, CategoryCardSkeleton };
