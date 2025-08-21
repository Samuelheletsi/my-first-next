import React from 'react';
import {STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import StartupCard, { startupCardType } from "@/components/StartupCard"

const UserStartups = async({id}: {id: string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, params: {id})
  return (
    <div> 
         { startups.length > 0 ? startups.map((startup: startupCardType) =>(
             <StartupCard key={startup._id} post={starup} />
         )):(
            <p className="no-result">No posts yet</p>
         )}
    </div>
  )
}

export default UserStartups