import { NextResponse } from "next/server";
import { hash } from "bcrypt";


export async function POST(request) {
    
    const { nombre, email, password, login } = await request.json(); 



    const hashedPassword = await hash(password, 10);
    if (!password || password.length < 1){
        return NextResponse.json({ message: "Password must be at least 6 characters", status: 400 });
    }

    




    const findUser = await fetch(`https://talita-backend-dev-production.up.railway.app/api/user?email=${email}&fullname=${nombre}&hashedPassword=${hashedPassword}&login=${login}`);
    const user = await findUser.json();

    if (user.message === "User already exists"){
        return NextResponse.json({ message: "User already exists", status: 400 });
    }



    return NextResponse.json({
        message: email,
        nombre: nombre,
    });


    /*const createUser = await fetch(`https://talita-backend-dev-production.up.railway.app/api/user?email=${email}`, {
        method: "GET",
    });



    const newUser = await createUser.json();
    
    if (newUser.message){
        return NextResponse.json({ message: newUser.message, status: 400 });
    }

    
  
    return NextResponse.json({ message: "Hello World" }); */
}