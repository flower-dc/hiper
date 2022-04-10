
type fn = (...arg:any[]) => any

export const throttle = <T extends fn>(fn: T, delay: number): ((...arg: Parameters<T>) => ReturnType<T>) => {
    let status = false;
    let res:any;
    return (...arg: any[]) => {
        if(!status) {
            status = true
            res = fn(...arg)
            setTimeout(() => {
                status = false
            }, delay)
        }
        return res
    }
}