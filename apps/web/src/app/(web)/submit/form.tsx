"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
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
      repository: "",
      submitterName: session?.user.name || "",
      submitterEmail: session?.user.email || "",
      submitterNote: "",
      newsletterOptIn: true,
      category: "",
      features: "",
    },
  });

  const { error, execute, isPending } = useServerAction(submitTool, {
    onSuccess: ({ data }) => {
      form.reset();

      // Capture event
      posthog.capture("submit_tool", { slug: data.slug });

      if (data.publishedAt && data.publishedAt <= new Date()) {
        if (data.isFeatured) {
          toast.info(`${data.name} has already been published.`);
        } else {
          toast.custom((t) => <FeatureNudge tool={data} t={t} />, {
            duration: Number.POSITIVE_INFINITY,
          });
        }
        router.push(`/tools/${data.slug}`);
      } else {
        toast.success(`${data.name} has been submitted.`);
        router.push(`/submit/${data.slug}`);
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => execute(data))}
        // className={cx("grid w-full gap-5 sm:grid-cols-2", className)}

        // className={cx("grid w-full gap-5 sm:grid-cols-2 bg-[#1b1b1b]", className)}
        className={cx(
          "grid w-full max-w-2xl gap-2 bg-[#1b1b1b] p-6 mx-60 space-y-0",
          className
        )}
        noValidate
        {...props}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-0">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="space-y-2"></div>
        {!session?.user && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="submitterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Agent Name:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="John Doe"
                      className="bg-[#1b1b1b]"
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
                      className="bg-[#1b1b1b]"
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

        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Name:</FormLabel>
              <FormControl>
                <Input type="text" size="lg" placeholder="PostHog" data-1p-ignore {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel isRequired>Website URL:</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  size="lg"
                  placeholder="https://posthog.com"
                  className="bg-[#1b1b1b]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Pricing Model:</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="">Free - No Payment Required</option>
                  <option value="AI Agent Builders">Paid - Payment Required</option>

                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Category:</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="AI Agent Builders">AI Agent Builders</option>
                  <option value="Coding">Coding</option>
                  <option value="Personal Assistant">Personal Assistant</option>
                  <option value="finance">Productivity</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="repository"
          render={({ field }) => (
            <FormItem >
              <FormLabel isRequired>Repository URL:</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  size="lg"
                  placeholder="https://github.com/confillow"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="repository"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel isRequired>LinkedIn:</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  size="lg"
                  placeholder="https://linkedin.com/confillow"
                  className="bg-[#1b1b1b]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 
<FormField
          control={form.control}
          name="repository"
          render={({ field }) => (
            <FormItem >
              <FormLabel isRequired>Twitter/X:</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  size="lg"
                  placeholder="https://x.com/confillow"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         */}

        {/* <FormField
          control={form.control}
          name="submitterNote"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Suggest an alternative:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  size="lg"
                  placeholder="Which well-known tool is this an alternative to?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Category:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  size="lg"
                  placeholder="category"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Additional Resource:</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  size="lg"
                  placeholder="https://confillow.com/feed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="newsletterOptIn"
          render={({ field }) => (
            <FormItem className="flex-row items-center col-span-full">
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

        <div className="col-span-full mt-4">
          <Button
            variant="primary"
            isPending={isPending}
            disabled={isPending}
            className="w-full flex justify-center items-center py-2 bg-white rounded-[4px]"
          >
            <span className="flex items-center justify-center gap-2 w-full">
              Submit
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>

        {error && <Hint className="col-span-full">{error.message}</Hint>}
      </form>
    </Form>
  );
};
