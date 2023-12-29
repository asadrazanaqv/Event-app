"use client"


import { IEvent } from '@/lib/database/models/event.model'
import { SignOutButton, SignedIn, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import CheckOut from './CheckOut';


const CheckOutButton = ({ event }: { event: IEvent }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date()

  return (
    <div className='flex items-center gap-3'>
        {/* Cannot buy pass event  */}
        {hasEventFinished ? (
            <p className='p-2 text-red-500'>Sorry, Tickets are no longer available!</p>
        ):(
            <>
            <SignOutButton>
                <Button asChild className='button rounded-full' size='lg'>
                    <Link href="/sign-in">
                        Get Tickets
                    </Link>
                </Button>
            </SignOutButton>

            <SignedIn>
                <CheckOut 
                    event={event}
                    userId={userId}
                />
            </SignedIn>

            </>
        )}
    </div>
  )
}

export default CheckOutButton