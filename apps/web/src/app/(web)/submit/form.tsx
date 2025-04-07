"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { posthog } from "posthog-js";
import type { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { submitTool } from "~/actions/submit";
import { Checkbox } from "~/components/common/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/common/form";
import { Hint } from "~/components/common/hint";
import { ArrowRightIcon } from "~/components/common/icons/arrowrighticon";
import { FeatureNudge } from "~/components/web/feature-nudge";
import { Button } from "~/components/web/ui/button";
import { Input } from "~/components/web/ui/input";
import { useSession } from "~/lib/auth-client";
import { type SubmitToolSchema, submitToolSchema } from "~/server/schemas";
import { cx } from "~/utils/cva";

export const SubmitForm = ({
  className,
  title,
  description,
  ...props
}: HTMLAttributes<HTMLFormElement> & {
  title: string;
  description: string;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<SubmitToolSchema>({
    resolver: zodResolver(submitToolSchema),
    values: {
      name: "",
      website: "",
      submitterEmail: session?.user.email || "",
      newsletterOptIn: true,
      linkedIn: "",
    },
  });

  const { error, execute, isPending } = useServerAction(submitTool, {
    onSuccess: ({ data }) => {
      form.reset();
      posthog.capture("submit_tool", { slug: data.slug });

      if (data.publishedAt && data.publishedAt <= new Date()) {
        toast.success("Submitted successfully.");
        router.push(`/`);
      } else {
        toast.success(`${data.name} has been submitted.`);
        router.push(`/`);
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => execute(data))}
        className={cx(
          "w-full max-w-[929px] mx-auto rounded-[16px] p-6 lg:p-[37px_40px] bg-[#1b1b1b]",
          "flex flex-col gap-6", // Added flex layout with gap
          className
        )}
        {...props}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>

        <div className="space-y-6">
          {" "}
          {/* Changed from space-y-20 to space-y-6 */}
          {!session?.user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {/* Responsive grid */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Agent Name:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        size="lg"
                        placeholder="John Doe"
                        className="bg-[#1b1b1b] w-full" // Added w-full
                        data-1p-ignore
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="submitterEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Contact Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        size="lg"
                        placeholder="john@doe.com"
                        className="bg-[#1b1b1b] w-full" // Added w-full
                        data-1p-ignore
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="space-y-6">
            {" "}
            {/* Added space between fields */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Website URL:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      size="lg"
                      placeholder="https://posthog.com"
                      className="bg-[#1b1b1b] w-full" // Added w-full
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>LinkedIn:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      size="lg"
                      placeholder="https://linkedin.com/confillow"
                      className="bg-[#1b1b1b] w-full" // Added w-full
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="newsletterOptIn"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I'd like to receive free email updates
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-2">
          {" "}
          {/* Reduced margin-top */}
          <Button
            variant="primary"
            isPending={isPending}
            disabled={isPending}
            className="w-full flex justify-center items-center py-2 bg-white rounded-[4px]"
          >
            <span className="flex items-center justify-center gap-2 w-full">
              Submit
              <ArrowRightIcon className="w-4 h-4" />
            </span>
          </Button>
        </div>

        {error && <Hint>{error.message}</Hint>}
      </form>
    </Form>
  );
};
