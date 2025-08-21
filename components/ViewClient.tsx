'use client';

import { useEffect } from 'react';

const ViewClient = ({ id }: { id: string }) => {
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await fetch(`/api/views/${id}`, { method: 'POST' });
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    incrementViews();
  }, [id]);

  return null;
};

export default ViewClient;
