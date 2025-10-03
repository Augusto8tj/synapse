"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, FlaskConical, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateInventionAction } from "./actions";
import { InventionLabOutput } from "@/ai/flows/invention-lab-flow";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  idea: z
    .string()
    .min(10, {
      message: "Sua ideia precisa ter pelo menos 10 letras.",
    })
    .max(300, { message: "Sua ideia pode ter no máximo 300 letras." }),
});

export default function LabInventionsPage() {
  const [invention, setInvention] = useState<InventionLabOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInvention(null);

    const result = await generateInventionAction(values);

    if (result.success && result.data) {
      setInvention(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Oh não! Algo deu errado.",
        description:
          result.error ||
          "Não conseguimos processar sua invenção. Tente descrever sua ideia de outra forma.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <FlaskConical className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
            Laboratório de Invenções
          </CardTitle>
          <CardDescription className="text-lg">
            Qual ideia genial vamos construir hoje? Descreva sua invenção e deixe a ciência maluca começar!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="idea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Ideia da Invenção
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Um chapéu que me deixa invisível, mas só quando eu canto ópera..."
                        className="min-h-[120px] resize-none text-base p-4 rounded-lg shadow-inner bg-background/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Calculando as probabilidades...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Criar Invenção!
                  </>
                )}
              </Button>
            </form>
          </Form>

          {isLoading && (
            <div className="mt-10 flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span>O gerador de ideias está a todo vapor!</span>
            </div>
          )}

          {invention && (
            <div className="mt-10 space-y-8">
               <Card className="aspect-video w-full max-w-lg mx-auto overflow-hidden flex items-center justify-center bg-muted/50">
                {invention.image && (
                    <Image
                      src={invention.image}
                      alt={`Imagem da invenção: ${invention.name}`}
                      width={512}
                      height={512}
                      className="object-contain transition-opacity duration-500 opacity-0 animate-in fade-in"
                      onLoadingComplete={(image) => image.style.opacity = '1'}
                    />
                  )}
              </Card>

              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold text-primary">{invention.name}</h2>
              </div>
             
              <Card>
                <CardHeader>
                  <CardTitle>Como Funciona?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{invention.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Receita Secreta (Materiais)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {invention.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Beaker className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">{material}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
