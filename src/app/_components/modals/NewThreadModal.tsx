"use client";

import { useState } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newThreadSchema } from "../../utils/validationSchemas/newThreadSchema";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { createThreadAction } from "~/server/db/actions/createThreadAction";
import ArrowRightSvg from "~/assets/ArrowRightSvg";
import ArrowLeftSvg from "~/assets/ArrowLeftSvg";
import PlusSvg from "~/assets/PlusSvg";
import { toast } from "sonner";

export default function NewThreadModal() {
  const [page, setPage] = useState(0);

  const form = useForm<z.infer<typeof newThreadSchema>>({
    resolver: zodResolver(newThreadSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      image: "",
      banner: "",
    },
  });

  async function onSubmit() {
    toast.info("Creating thread...");
    // await createThreadAction(form.getValues());
    // toast.success("Thread created successfully");
  }

  const handleNext = async () => {
    if (form.formState.isValid) {
      setPage(1);
    } else {
      await form.trigger(["name", "description"]);
    }
  };

  const handleClearInputs = () => {
    form.reset();
    setPage(0);
  };

  const handlePrevious = () => {
    setPage(0);
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClearInputs}
          >
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Tell us more about your thread</h3>
        <p className="text-muted-background text-sm text-gray-500">
          A name and description will help people understand what this thread is
          for.
        </p>
        <div className="mt-5">
          <Form {...form}>
            <form className="space-y-7">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${page * 100}%)` }}
                >
                  {/* Page 1 */}
                  <div className="w-full flex-shrink-0">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Thread name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Page 2 */}
                  <div className="w-full flex-shrink-0">
                    <FormField
                      control={form.control}
                      name="banner"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Thread Banner</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Thread Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {[0, 1].map((step) => (
                    <div
                      key={step}
                      className={`h-3 w-3 rounded-full ${
                        page === step ? "bg-primary" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {page === 1 && (
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                    >
                      <div className="flex items-center gap-1">
                        <ArrowLeftSvg color="black" size={18} /> Previous
                      </div>
                    </Button>
                  )}
                  {page === 0 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!form.formState.isValid}
                    >
                      <div className="flex items-center gap-1">
                        Next <ArrowRightSvg color="white" size={18} />
                      </div>
                    </Button>
                  ) : (
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                      <div className="flex items-center gap-1">
                        Create <PlusSvg color="white" size={18} />
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </dialog>
  );
}
