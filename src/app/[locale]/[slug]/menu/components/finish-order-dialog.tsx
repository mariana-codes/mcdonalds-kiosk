"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidNif } from "@/helpers/nif";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  nif: z
    .string()
    .trim()
    .min(1, {
      message: "NIF obrigatório",
    })
    .refine((value) => isValidNif(value), { message: "NIF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ onOpenChange, open }: FinishOrderDialogProps) => {
  const { products } = useContext(CartContext);
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations("FinishOrderDialog");
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nif: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerNif: data.nif,
          customerName: data.name,
          products,
          slug,
        });

        onOpenChange(false);
        toast.success(t("toast-sucess-message"));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("title")}</DrawerTitle>
          <DrawerDescription>{t("description")}</DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name-label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("name-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nif-label")}</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder={t("nif-placeholder")}
                        format="###.###.###"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  {t("submit-button")}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    {t("cancel-button")}
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
