"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { posthog } from "posthog-js";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { subscribeToNewsletter } from "~/actions/subscribe";
import { Box } from "~/components/common/box";
import { Form, FormControl, FormField } from "~/components/common/form";
import { Hint } from "~/components/common/hint";
import { Button } from "~/components/web/ui/button";
import { Input } from "~/components/web/ui/input";
import { type NewsletterSchema, newsletterSchema } from "~/server/schemas";
import { cx } from "~/utils/cva";
import { ArrowRight, X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { PopImage } from "~/components/common/icons/popupimg";

type ButtonProps = ComponentProps<typeof Button>;
type InputProps = ComponentProps<typeof Input>;

type NewsletterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: ReactNode; // Added children prop
  medium?: string;
  placeholder?: string;
  size?: InputProps["size"];
  buttonProps?: ButtonProps;
};

export const NewsletterModal = ({
  isVisible,
  onClose,
  children,
  medium = "subscribe_form",
  placeholder = "Enter your email",
  size = "md",
  buttonProps = { size: "sm", children: "Explore Agents" },
}: NewsletterModalProps) => {
  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { captcha: "", value: "", utm_medium: medium },
  });

  const { data, error, isPending, execute } = useServerAction(
    subscribeToNewsletter,
    {
      onSuccess: () => {
        posthog.capture("subscribe_newsletter", {
          email: form.getValues("value"),
        });
        form.reset();
      },
      onError: () => form.reset(),
    }
  );

  if (!isVisible) return null;

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-70 backdrop-blur-lg flex justify-center items-center z-50"
      onClick={handleWrapperClick}
    >
      <div className="flex flex-col md:flex-row bg-[#1b1b1b] rounded-lg p-2 mt-20 max-w-2xl md:max-w-4xl mx-200 shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image section */}
        <div className="hidden md:flex items-center justify-center w-1/2 p-4 mt-[-100px] mb-[-100px]">
          <PopImage className="max-w-full" />
        </div>

        <div className="hidden md:block w-px bg-gray-500 mx-6 my-4"></div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-4 mt-4 space-y-4 bg-[#1b1b1b] rounded-lg">
          <h2 className="text-2xl font-bold text-white">Subscribe to our</h2>
          <h2 className="text-2xl font-bold text-white">Newsletter!</h2>
          <p className="text-sm text-gray-400">Get our updates</p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => execute(data))}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-400"
                >
                  Contact Email:<span className="text-red-500">*</span>
                </label>
                <Box focusWithin className="">
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    )}
                  />
                </Box>
              </div>

              <Box focusWithin>
                <div className="flex w-full overflow-clip rounded-lg">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                
                        <Input
                          type="email"
                          placeholder={placeholder}
                          required
                          size={size}
                          className="flex-1 min-w-0 bg-[#1b1b1b] border-0 outline-0 ring-0! rounded-lg"
                          data-1p-ignore
                          {...field}
                        />
                      
                    )}
                  />
                </div>
              </Box>

              {(error || form.formState.errors.value) && (
                <Hint className="-mt-1 text-red-500">
                  {(error || form.formState.errors.value)?.message}
                </Hint>
              )}

              {data && <p className="text-sm text-green-600">{data}</p>}

              <Button
                isPending={isPending}
                disabled={isPending}
                className={cx(
                  "shrink-0 px-4 py-2 text-black bg-white w-full flex items-center justify-between"
                )}
                {...buttonProps}
              >
                <span className="flex items-center justify-center gap-2 w-full">
                  Explore Agents
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
