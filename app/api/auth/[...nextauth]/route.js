import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import  hash  from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credencials) {
                const API_URL = 'https://talita-backend-dev-production.up.railway.app/api/'
                
            
                const response = await fetch(API_URL + 'credentials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credencials)
                })

                const  userFound = await response.json()
                if (! userFound) {
                    throw new Error('No user found, Invalid credencials')
                }

                const passwrodMatch = await hash.compare(credencials.password,  userFound.hashedPassword)

                if (!passwrodMatch) {
                    throw new Error('Invalid credencials')
                }

            

                
                return userFound 
            }
        })
    ],
    pages: {
        signIn: "/login",
    }, 
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
        
            
            if (user) return token.user = user
            
            return token;
        },
        async session({
            session, token
        }) {
            
            session.user = token
        
            return session
        }
    }

})

export { handler as GET, handler as POST } 