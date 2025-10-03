'use client';

import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Loader2,
  Sparkles,
  GraduationCap,
  Mic,
  Square,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateAnswerAction } from './actions';

const formSchema = z.object({
  question: z
    .string()
    .min(10, {
      message: 'Sua pergunta precisa ter pelo menos 10 letras.',
    })
    .max(500, { message: 'Sua pergunta pode ter no máximo 500 letras.' }),
});

export default function TutorPage() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  useEffect(() => {
    // SpeechRecognition is a browser-only API
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'pt-BR';

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          form.setValue('question', finalTranscript + interimTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({
            variant: 'destructive',
            title: 'Erro no microfone',
            description: 'Não conseguimos acessar seu microfone.',
          });
          setIsRecording(false);
        };
      }
    }
  }, [toast, form]);

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        form.setValue('question', '');
        recognitionRef.current.start();
        setIsRecording(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Navegador não suportado',
          description: 'Seu navegador não suporta o reconhecimento de voz.',
        });
      }
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnswer(null);

    const result = await generateAnswerAction(values);

    if (result.success && result.data) {
      setAnswer(result.data.answer);
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh não! Algo deu errado.',
        description:
          result.error ||
          'Não conseguimos processar sua pergunta. Tente novamente.',
      });
    }

    setIsLoading(false);
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
            Tem alguma dúvida da escola? Pergunte por texto ou por voz!
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
                    <FormLabel className="sr-only">Sua Pergunta</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Ex: Por que o céu é azul?"
                          className="min-h-[120px] resize-none text-base p-4 rounded-lg shadow-inner bg-background/80 pr-12"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleToggleRecording}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        >
                          {isRecording ? (
                            <Square className="h-5 w-5 text-red-500" />
                          ) : (
                            <Mic className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {isRecording ? 'Parar gravação' : 'Gravar pergunta'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading || isRecording}
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
              <div className="flex items-center justify-center mb-4 gap-4">
                <h3 className="font-headline text-2xl">
                  Resposta do Professor!
                </h3>
                {answer && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSpeak(answer)}
                    disabled={!answer}
                  >
                    {isSpeaking ? <Square className="h-5 w-5 animate-pulse"/> : <Volume2 className="h-5 w-5" />}
                    <span className="sr-only">Ouvir resposta</span>
                  </Button>
                )}
              </div>

              <Card className="w-full mx-auto overflow-hidden flex items-center justify-center bg-muted/50 p-6 min-h-[100px]">
                {isLoading && (
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <span>Buscando nos livros...</span>
                  </div>
                )}
                {answer && (
                  <p className="text-foreground text-base leading-relaxed">{answer}</p>
                )}
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
