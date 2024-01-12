'use client'
import React from 'react'
import { useSession } from 'next-auth/client'

function Page() {
    const { data: session, status } = useSession()
    return (
        <code>
            <pre>
                {JSON.stringify(session,null,2)}
            </pre>
        </code>
    )
}

export default Page