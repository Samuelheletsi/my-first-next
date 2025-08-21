import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton }  from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    description,
    title,
    category,
    image
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex-center gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views ?? 0}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={author?._id ? `/user/${author._id}` : "#"}>
            <p className="text-16-medium line-clamp-1">
              {author?.name || "Unknown Author"}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title || "Untitled"}</h3>
          </Link>
        </div>

        <Link href={author?._id ? `/user/${author._id}` : "#"}>
          <Image
            src={author?.author_image || "/default-avatar.jpg"}
            alt={author?.name || "avatar"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc">{description || "No description provided."}</p>
        <img
          src={image || "/placeholder-image.jpg"}
          alt={title || "startup image"}
          className="startup-card-img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={category ? `/?query=${category.toLowerCase()}` : "#"}>
          <p className="text-16-medium">{category || "Uncategorized"}</p>
        </Link>
        <Button className="startup-card-btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
     {[0, 1, 2, 3, 4, 5].map((index:number)=> (
        <li key={cn('skeleton', index)}>
             <Skeleton className="start-card_skeleton" />
        </li>
     ))}
  </>
)

export default StartupCard;
