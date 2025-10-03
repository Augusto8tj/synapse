"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profiles } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

export function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "synapse-hero");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background/50 backdrop-blur-sm">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="container relative px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Synapse: Mentes Criativas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Um playground de descobertas onde a curiosidade é a sua única
                guia. Desafie-se, crie e explore paixões sem limites.
              </p>
            </div>
          </div>
        </section>

        <section
          id="onboarding"
          className="container py-12 md:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Quem está pronto para explorar?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Escolha seu perfil para começar uma jornada de aprendizado
              personalizada.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
            {Object.values(profiles).map((profile) => (
              <Link
                href={`/dashboard?profile=${profile.id}`}
                key={profile.id}
                className="group"
              >
                <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-primary/20 group-hover:shadow-2xl animate-pulse-slow group-hover:animate-none">
                  <CardHeader className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <Avatar className="h-20 w-20 sm:h-16 sm:w-16 transition-all">
                      <AvatarImage
                        src={profile.avatar}
                        alt={profile.name}
                        data-ai-hint={profile.avatarHint}
                      />
                      <AvatarFallback>{profile.initials}</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                      <CardTitle className="font-headline text-xl sm:text-2xl">
                        {profile.name}
                      </CardTitle>
                      <CardDescription>{`Idade: ${profile.age} anos`}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {profile.description}
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 px-0 text-primary font-bold"
                    >
                      Começar a exploração
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Synapse. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
