import React, { Suspense } from 'react';
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import ViewClient from './ViewClient';

const View = async ({ id }: { id: string }) => {
  let views = 0;
  
  try {
    const result = await client
      .withConfig({ useCdn: false })
      .fetch<{ views?: number }>(STARTUP_VIEWS_QUERY, { id });
    views = result?.views || 0;
  } catch (error) {
    console.error('Error fetching view count:', error);
    views = 0;
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {views}</span>
      </p>

      <Suspense fallback={null}>
        <ViewClient id={id} />
      </Suspense>
    </div>
  );
};

export default View;
