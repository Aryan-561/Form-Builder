import { createHmac, randomBytes} from "node:crypto"
import * as JWT from 'jsonwebtoken'
import {db, eq} from "@repo/database"
import {usersTable} from "@repo/database/models/user"

import { createUserWithEmailAndPasswordInput, generateUserTokenPayload, GenerateUserTokenPayloadType, type CreateUserWithEmailAndPasswordInputType } from "./model";
import { env } from "../env";

export class UserService{

    private async getUserByEmail(email:string){

       const result =  await db.select().from(usersTable).where(eq(usersTable.email, email))

       if(!result || result.length === 0) return null
       
       return result[0]

    }

    private async generateUserToken(payload:GenerateUserTokenPayloadType){
        const {userId} =  await generateUserTokenPayload.parseAsync(payload)

        const token = JWT.sign({userId}, env.JWT_SECRET, {expiresIn: '1h'})

        return {token}

    }

    public async createUserWithEmailAndPassword(payload:CreateUserWithEmailAndPasswordInputType)
    {
        
        const {fullName,email,password} = await createUserWithEmailAndPasswordInput.parseAsync(payload);

        const existingUser = await this.getUserByEmail(email)

        if(existingUser) throw new Error("User with this email already exists")

        const salt = randomBytes(16).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex')

        const userInsertResult =await db.insert(usersTable).values({fullName, email, salt, password: hash}).returning({
            id: usersTable.id,
        })

        

        if(!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id){
            throw new Error("Failed to create the user!")
        }
        console.log("user created with id", userInsertResult[0].id)
        const userId = userInsertResult[0].id
        console.log("user created with id")

        const {token} = await this.generateUserToken({userId})

        return{
            id: userId,
            token
        }


    }

}