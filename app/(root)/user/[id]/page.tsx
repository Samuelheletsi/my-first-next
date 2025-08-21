import React, { Suspense } from "react";
import Image from "next/image";
import { auth } from "@/app/auth";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";

export const experimental_ppr = true;

interface PageProps {
  params: {
    id: string;
  };
}

// Sanity Author type
interface Author {
  _id: string;
  name: string;
  username: string;
  bio?: string;
  image?: string;
}

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  // Run both auth + fetch in parallel
  const [session, user] = await Promise.all([
    auth(),
    client.fetch<Author | null>(AUTHOR_BY_ID_QUERY, { id }),
  ]);

  if (!user) return notFound();

  const profileImage = user.image || "/default-avatar.png";

  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h3>
        </div>

        <Image 
          src={profileImage} 
          alt={user.name}
          width={220}
          height={220}
          className="profile_image"
        />

        <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
        {user.bio && <p className="mt-1 text-center text-14-normal">{user.bio}</p>}

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} startups
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>  
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Page;
