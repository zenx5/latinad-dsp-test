const CustomStorage = {
    getItem: (key: string) => {
        return new Promise((resolve) => {
            resolve( sessionStorage.getItem(key) )
        })
    },
    setItem:(key: string, value: any) => {
        return new Promise((resolve) => {
            sessionStorage.setItem(key, value)
            resolve(value)
        })
    },
    removeItem: (key: string) => {
        return new Promise((resolve) => {
            sessionStorage.removeItem(key)
            resolve(true)
        })
    }
}

export default CustomStorage