export default function isOutdated(date) {
   return (Date.now() - date) > (10 * 60 * 1000)
}
