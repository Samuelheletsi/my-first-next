import React, { Suspense } from 'react';
import { client } from "@/sanity/lib/client";
import { PlAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StartupTypeCard } from '@/components/StartupCard';
import StartupCard from '@/components/StartupCard';

export const experimental_ppr = true;
const md = markdownIt();

// Add proper TypeScript interface
interface StartupPost {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  image: string;
  pitch?: string;
  category: string;
  author?: {
    _id: string;
    name: string;
    username: string;
    author_image?: string;
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  let post: StartupPost | null = null;
  let editorPosts: StartupTypeCard[] = [];

  try {
    // Run both queries in parallel
    const [postResult, editorResult] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QUERY, { id }),
      client.fetch(PlAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks-new' }),
    ]);

    post = postResult;
    editorPosts = editorResult?.select ?? [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return notFound();
  }

  if (!post) return notFound();

  // Safe markdown rendering with error handling
  let parsedContent = '';
  try {
    parsedContent = post?.pitch ? md.render(post.pitch) : '';
  } catch (error) {
    console.error('Error parsing markdown:', error);
    parsedContent = '';
  }

  // Safe fallback for author image
  const authorImage = post?.author?.author_image || "/default-avatar.png";

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="subheading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <div className="relative w-full h-auto rounded-xl overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-xl"
            priority
            fallbackSrc="/default-startup-image.png"
          />
        </div>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id || ""}`}
              className="flex gap-2 items-center mb-3"
            >
              <div className="relative">
                <ImageWithFallback
                  src={authorImage}
                  alt={post?.author?.name || "avatar"}
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                  fallbackSrc="/default-avatar.png"
                />
              </div>
              <div>
                <p className="text-20-medium">{post?.author?.name || "Unknown"}</p>
                <p className="text-16-medium !text-black-300">
                  {post?.author?.username || ""}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              suppressHydrationWarning={true}
            />
          ) : (
            <p className="no-results">No details provided</p>
          )}
        </div>

        <hr className="divider" />
        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className='text-30-semibold'>Editor Picks</p>
            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
