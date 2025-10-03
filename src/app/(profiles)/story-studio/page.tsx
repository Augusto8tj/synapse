"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
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
import { generateStoryImageAction } from "./actions";

const formSchema = z.object({
  storyDescription: z
    .string()
    .min(10, {
      message: "Sua história precisa ter pelo menos 10 letras.",
    })
    .max(500, { message: "Sua história pode ter no máximo 500 letras." }),
});

export default function StoryStudioPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedImage(null);

    const result = await generateStoryImageAction(values);

    if (result.success && result.image) {
      setGeneratedImage(result.image);
    } else {
      toast({
        variant: "destructive",
        title: "Oh não! Algo deu errado.",
        description:
          result.error ||
          "Não conseguimos criar sua imagem. Tente descrever sua ideia de outra forma.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Wand2 className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
            Estúdio do Contador de Histórias
          </CardTitle>
          <CardDescription className="text-lg">
            Descreva uma cena da sua imaginação e veja a mágica acontecer!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="storyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Descrição da História
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Um dragão amigável e um coelho corajoso tomando chá na lua..."
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
                    Criando sua arte...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Gerar Imagem Mágica
                  </>
                )}
              </Button>
            </form>
          </Form>

          {(isLoading || generatedImage) && (
            <div className="mt-10">
              <h3 className="font-headline text-2xl text-center mb-4">
                Sua Criação!
              </h3>
              <Card className="aspect-square w-full max-w-lg mx-auto overflow-hidden flex items-center justify-center bg-muted/50">
                {isLoading && (
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <span>O pincel mágico está trabalhando...</span>
                  </div>
                )}
                {generatedImage && (
                  <Image
                    src={generatedImage}
                    alt="Imagem gerada pela IA a partir da descrição da história"
                    width={512}
                    height={512}
                    className="object-contain transition-opacity duration-500 opacity-0 animate-in fade-in"
                    onLoadingComplete={(image) => image.style.opacity = '1'}
                  />
                )}
              </Card>
            </div>
          )}
        </CardContent>
        {generatedImage && (
          <CardFooter className="flex-col gap-4 mt-4">
              <p className="text-sm text-muted-foreground">O que faremos agora?</p>
              <div className="flex gap-4">
                <Button variant="outline">Gerar Trilha Sonora</Button>
                <Button variant="outline">Criar Animação</Button>
              </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
