import {createPinia } from "pinia"
import  useAuthStore from "./modules/auth"
import  useChatStore from "./modules/chat"



const pinia = createPinia ()
export {useAuthStore,useChatStore}
export default pinia