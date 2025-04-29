const logs: string[] = [];

export function addLog(message: string) {
    const timestamp = new Date().toLocaleString();
    logs.push(`[${timestamp}] ${message}`);
}

export function getLogs() {
    return logs;
}
