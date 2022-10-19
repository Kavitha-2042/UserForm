import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User{
    _id?:string,
    username : string,
    email : string,
    password:string
}

interface InitialState {
    user:User | null,
    auth : boolean
}

const initialState:InitialState = {
    user:null,
    auth : false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        initialize:(state:InitialState, action:PayloadAction<InitialState>) =>{
            state.user = action.payload.user
            state.auth = action.payload.auth
        }
    }
})

export const {initialize} = userSlice.actions
export default userSlice.reducer

// import { createSlice } from "@reduxjs/toolkit";

// export interface User{
//     _id:string,
//     username:string,
//     email:string,
//     password:string
// }

// interface InitialState{
//     user:User|null
// }

// const initialState:InitialState = {
   
// }

// const userSlice = createSlice({
//     name:"user"
// })