"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, GraduationCap } from "lucide-react";
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

const formSchema = z.object({
  question: z
    .string()
    .min(10, {
      message: "Sua pergunta precisa ter pelo menos 10 letras.",
    })
    .max(500, { message: "Sua pergunta pode ter no máximo 500 letras." }),
});

export default function TutorPage() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnswer(null);

    // Placeholder for AI action
    setTimeout(() => {
        setAnswer(`Esta é uma resposta para a pergunta: "${values.question}". A integração com a IA para responder a essa pergunta será implementada em breve!`);
        setIsLoading(false);
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
            Professor Sabe Tudo
          </CardTitle>
          <CardDescription className="text-lg">
            Tem alguma dúvida da escola? É só perguntar!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Sua Pergunta
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Por que o céu é azul?"
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
                    Pensando na resposta...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Perguntar
                  </>
                )}
              </Button>
            </form>
          </Form>

          {(isLoading || answer) && (
            <div className="mt-10">
              <h3 className="font-headline text-2xl text-center mb-4">
                Resposta do Professor!
              </h3>
              <Card className="w-full mx-auto overflow-hidden flex items-center justify-center bg-muted/50 p-6">
                {isLoading && (
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <span>Buscando nos livros...</span>
                  </div>
                )}
                {answer && (
                    <p className="text-foreground">{answer}</p>
                )}
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
