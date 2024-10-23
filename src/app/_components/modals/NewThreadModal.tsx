"use client";

import { useRef, useState } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newThreadSchema } from "../../utils/validationSchemas/newThreadSchema";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import ArrowRightSvg from "~/assets/ArrowRightSvg";
import ArrowLeftSvg from "~/assets/ArrowLeftSvg";
import PlusSvg from "~/assets/PlusSvg";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Visibility } from "~/app/models/Visibility";
import { createThreadAction } from "~/server/db/actions/createThreadAction";
import LoadingSpinner from "~/assets/LoadingSpinner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function NewThreadModal() {
  const queryClient = useQueryClient(); // Initialize useQueryClient
  const [page, setPage] = useState(0);
  const totalPages = 3;

  const modalRef = useRef<HTMLDialogElement>(null);

  const form = useForm<z.infer<typeof newThreadSchema>>({
    resolver: zodResolver(newThreadSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      image: "",
      banner: "",
      visibility: Visibility.PUBLIC,
    },
  });

  async function onSubmit() {
    modalRef.current?.close();

    toast(
      <div className="flex items-center gap-1">
        <LoadingSpinner size={18} /> Creating thread...
      </div>,
    );
    // TODO: Delete this delay
    await createThreadAction(form.getValues())
      .then(async () => {
        toast.success("Thread created successfully!");
        await queryClient.invalidateQueries({ queryKey: ["threads"] }); // Invalidate the queries related to threads
        handleClearInputs();
      })
      .catch(() => {
        toast.error("An error occurred while creating the thread");
      });
  }

  const handleClearInputs = () => {
    form.reset();
    setPage(0);
  };

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <dialog ref={modalRef} id="my_modal_3" className="modal" data-dialog>
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

                    <FormField
                      control={form.control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Thread Visibility</FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value ?? Visibility.PUBLIC}
                              onValueChange={field.onChange}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Public" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Public
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Private" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Private
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
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

                  {/* Page 3 */}
                  <div className="w-full flex-shrink-0 items-center">
                    <div className="card card-compact w-96 shadow-xl">
                      <figure>
                        <Image
                          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                          alt="Shoes"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{form.getValues().name}</h2>
                        <p>{form.getValues().description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, step) => (
                    <div
                      key={step}
                      className={`h-3 w-3 rounded-full ${
                        page === step ? "bg-primary" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {page > 0 && (
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
                  {page < totalPages - 1 ? (
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
