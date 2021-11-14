const truncate = (string, n) => string?.length > n ? string.substr(0, n - 1) + "..." : string

export default truncate