// Async delay
export default function asyncDelay(t = 1) {
    return new Promise(resolve => setTimeout(resolve, t))
}
