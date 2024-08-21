import {ref} from "vue"

export default function useLoading(initValue = false) {
	let loading  = ref(initValue)
	const setLoading = (value) =>{
		loading.value = value;
	}
	const toggleLoading = () => {
		loading.value = !loading.value
	}
	
	return {
		loading,
		setLoading,
		toggleLoading
	}
}