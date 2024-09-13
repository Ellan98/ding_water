import {createPinia } from "pinia"
import  useAppStore from "./modules/app"
import  useAuthStore from "./modules/auth"
import  useChatStore from "./modules/chat"



const pinia = createPinia ()
export {useAuthStore,useChatStore,useAppStore}
export default pinia