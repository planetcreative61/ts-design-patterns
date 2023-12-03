interface ILogger {
    log(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    error(message: string): void;
}

class DevelopmentLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
    warn(message: string): void {
        console.warn(message);
    }
    debug(message: string): void {
        console.debug(message);
    }
    error(message: string): void {
        console.error(message);
    }
}

class ProductionLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
    warn(message: string): void {
        throw new Error("Method not implemented.");
    }
    debug(message: string): void {
        throw new Error("Method not implemented.");
    }
    error(message: string): void {
        console.error(message);
    }
}

export class LoggerFactory {
    public static createLogger(): ILogger {
        if (process.env.NODE_ENV === "production") {
            return new ProductionLogger();
        } else {
            return new DevelopmentLogger();
        }
    }
}