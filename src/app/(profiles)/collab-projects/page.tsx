'use client';

import { useState } from 'react';
import { Loader2, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateCollabIdeasAction } from './actions';

export default function CollabProjectsPage() {
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleGenerateIdeas() {
    setIsLoading(true);
    setIdeas(null);

    const result = await generateCollabIdeasAction();

    if (result.success && result.ideas) {
      setIdeas(result.ideas);
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh não! Algo deu errado.',
        description:
          result.error ||
          'Não conseguimos pensar em nenhuma ideia agora. Tente novamente!',
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Users className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
            Gerador de Ideias Colaborativas
          </CardTitle>
          <CardDescription className="text-lg">
            Unindo o Engenheiro Criativo e o Narrador Imaginativo para criar
            projetos incríveis juntos!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button
              onClick={handleGenerateIdeas}
              disabled={isLoading}
              className="w-full max-w-sm text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Misturando Habilidades...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-6 w-6" />
                  Buscar Projetos!
                </>
              )}
            </Button>
          </div>

          {(isLoading || ideas) && (
            <div className="mt-10">
              <h3 className="font-headline text-2xl text-center mb-4">
                Ideias para vocês!
              </h3>
              {isLoading && (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <span>A máquina de criatividade está funcionando...</span>
                </div>
              )}
              {ideas && (
                <div className="space-y-4">
                  {ideas.map((idea, index) => (
                    <Card key={index} className="bg-background/50">
                      <CardContent className="p-4">
                        <p className="text-muted-foreground text-center text-lg">
                          {idea}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
