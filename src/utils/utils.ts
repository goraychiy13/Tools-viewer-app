function getNounFormByCount(count: number, noun: string): string {
    return count > 1 ? noun + 's' : noun;
}
export function getSiteCaption(count: number): string {
    return count ? count + ' ' + getNounFormByCount(count, 'site') : count.toString();
}