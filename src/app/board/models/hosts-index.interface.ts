import { Host } from './host.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HostsIndex extends Record<Host['hostname'], Host> { }
