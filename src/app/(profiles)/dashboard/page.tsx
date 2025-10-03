import { profiles, activities } from "@/lib/data";
import type { ProfileId } from "@/lib/types";
import { ActivityCard } from "@/components/activity-card";
import { Suspense } from "react";

function DashboardContent({ profileId }: { profileId: ProfileId }) {
  const profile = profiles[profileId];
  const availableActivities = activities.filter((activity) =>
    activity.profiles.includes(profileId)
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
          Olá, {profile.name.split(" ")[1]}!
        </h1>
        <p className="text-lg text-muted-foreground">
          O que vamos descobrir hoje?
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {availableActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} profileId={profileId} />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { profile?: string };
}) {
  const profileId = (searchParams?.profile as ProfileId) || "engenheiro";

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardContent profileId={profileId} />
    </Suspense>
  );
}
