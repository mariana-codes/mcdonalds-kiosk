"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
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
import { isValidNif, removeNifPunctuation } from "@/helpers/nif";
import { usePathname, useRouter } from "@/i18n/navigation";

const formSchema = z.object({
  nif: z
    .string()
    .trim()
    .min(1, {
      message: "NIF obrigatório",
    })
    .refine((value) => isValidNif(value), { message: "NIF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const NifForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: FormSchema) => {
    router.replace(`${pathname}?nif=${removeNifPunctuation(data.nif)}`);
  };
  const handleCancel = () => router.back();

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Introduza o seu NIF abaixo para visualizar os seus pedidos
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem className="px-4">
                    <FormLabel>O seu NIF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Introduza o seu NIF"
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
                  className="w-full rounded-full"
                >
                  Confirmar
                </Button>
                <DrawerClose asChild>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Cancelar
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

export default NifForm;
