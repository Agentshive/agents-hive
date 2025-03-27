import type { ComponentProps } from "react";
import { Box } from "~/components/common/box";
import { inputVariants } from "~/components/web/ui/input";
import { type VariantProps, cx } from "~/utils/cva";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export type SelectProps = Omit<ComponentProps<"select">, "size"> &
  VariantProps<typeof inputVariants>;

export const Select = ({ className, size, ...props }: SelectProps) => {
  return (
    <Box hover focus>
      <select
        className={cx(
          "field-sizing-content",
          inputVariants({ size, className })
        )}
        {...props}
      />
    </Box>
  );
};

export type Option = { label: string; value: string };

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label: string;
}

export const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  label,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (value: string) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newSelection);
  };

  return (
    <div className="relative w-35">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-white bg-black border border-gray-600 rounded-md shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-gray-700 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 cursor-pointer text-white hover:bg-gray-700 text-xs"
              onClick={() => toggleSelection(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                readOnly
                className="mr-2 bg-gray-700 border-gray-500"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
