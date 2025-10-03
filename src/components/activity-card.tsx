import Link from "next/link";
import Image from "next/image";
import type { Activity, ProfileId } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ActivityCardProps {
  activity: Activity;
  profileId: ProfileId;
}

export function ActivityCard({ activity, profileId }: ActivityCardProps) {
  const href = `${activity.href}?profile=${profileId}`;
  
  const cardContent = (
    <Card className="flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:border-primary">
      <CardHeader>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={activity.imageHint}
          />
        </div>
        <div className="flex items-center gap-2">
           <activity.Icon className="h-6 w-6 text-primary" />
           <CardTitle className="font-headline text-xl">{activity.title}</CardTitle>
        </div>
        <CardDescription>{activity.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Can add more details here in the future */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <span>Começar Atividade</span>
        </Button>
      </CardFooter>
    </Card>
  );

  // Use a link for cards with a valid href, otherwise just display the card.
  return activity.href !== "#" ? (
    <Link href={href} className="flex">
      {cardContent}
    </Link>
  ) : (
    <div className="flex relative">
      {cardContent}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center rounded-lg">
          <Badge variant="secondary" className="text-sm">Em Breve</Badge>
      </div>
    </div>
  );
}
