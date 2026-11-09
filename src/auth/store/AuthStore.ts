import type { User } from '@/interfaces/UserResponse'
import { create } from 'zustand'
import { LoginActions } from '../actions/LoginActions'
import { CheckAuthAction } from '../actions/CheckAuthAction';
import { RegisterAction } from '../actions/RegisterAction';

type AuthStatus = 'authenticated'| 'not-authenticated' | 'checking';

type AuthState = {
//propetis
user : User| null,
token : string | null,
authStatus : AuthStatus,
//getters
isAdmin : () => boolean,
//actiones
login: (email: string, password:string) => Promise<boolean>;
logout : () => void;
checkAuthStatus : () => Promise<boolean>;
register: (email:string, password: string, fullName:string) =>Promise<boolean>;
}
 

export const useAuthStore = create<AuthState>()((set, get) => ({
user : null,
token : null,
authStatus : 'checking',

isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
},

login: async(email: string, password:string) => {
    console.log({email, password})
try {
    const data = await LoginActions(email, password);
    localStorage.setItem('token', data.token);
    set ({user:data.user, token: data.token, authStatus: 'authenticated'})
    return true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    localStorage.removeItem('token');
    set ({user:null, token: null, authStatus: 'not-authenticated'})
    return false;
}

},
logout : () => {
    localStorage.removeItem('token');
    set ({user:null, token: null, authStatus: 'not-authenticated'});
},

checkAuthStatus : async() =>{
    try {
    const {user, token} = await CheckAuthAction();
    set ({user:user, token: token, authStatus: 'authenticated' })
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    set ({user:undefined, token: undefined, authStatus: 'not-authenticated'})
    return false;
        
    }
},
register : async(email:string, password: string, fullName:string) => {
    try {
        const data = await RegisterAction(email, password,fullName);
        console.log(data)
        // set({user:data.user, token: data.token, authStatus : 'not-authenticated' })
        // localStorage.setItem('token', data.token)
        return true;
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // set({user:undefined, token: undefined, authStatus : 'not-authenticated' })
        // localStorage.removeItem('token')
        return false;
        
    }
}


  
}))

