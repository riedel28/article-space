export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
}

export interface BuildEnv {
    mode?: BuildMode;
    port?: number | string;
    supabaseUrl?: string;
    supabaseAnonKey?: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    supabaseUrl: string;
    supabaseAnonKey: string;
    project: 'storybook' | 'frontend' | 'jest';
}
